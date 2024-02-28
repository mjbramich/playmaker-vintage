import prisma from '@/lib/prismadb';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import { NextResponse } from 'next/server';

// Set up stripe CLI to listen to local webhook
// stripe listen --forward-to http://localhost:3000/api/webhooks

// Stripe CLI secret
const webhookSecretCLI = 'whsec_328e426ad393402870a1da222dbd560165d70e348c9d321f6b4a258a588e3a1f';

export async function POST(req: Request) {
	console.log('Running');

	// access the raw content of request
	const body = await req.text();
	console.log(body);

	// Get the signature sent by Stripe
	const sig = req.headers.get('stripe-signature')!;
	console.log('Signature', sig);

	// const webhookSecret = process.env.STRIPE_SECRET_KEY!;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, sig, webhookSecretCLI);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
	}

	// Cast event as session sent from Stripe
	const session = event.data.object as Stripe.Checkout.Session;

	/* Stripe Address
    interface Address {
        city: string | null;
        country: string | null;
        line1: string | null;
        line2: string | null;
        postal_code: string | null;
        state: string | null;
      }
      */
	const address = {
		...session.customer_details?.address
	};

	// Want address in certain order
	const addressLines = [
		`${address.line1},`,
		address.line2,
		address.city,
		address.state,
		address.postal_code,
		address.country
	];

	const filteredAddressLines = addressLines.filter((line) => line !== undefined);

	const addressString = filteredAddressLines.join('\n');

	const customerDetails = {
		name: session.customer_details?.name || '',
		email: session.customer_details?.email || '',
		address: addressString,
		phone: session.customer_details?.phone || ''
	};

	switch (event.type) {
		// Payment Successfull
		case 'checkout.session.completed':
			// Create order that will be shown in admin
			try {
				const order = await prisma.order.update({
					where: {
						id: session?.metadata?.orderId
					},
					data: {
						...customerDetails,
						isPaid: true // payment successfull
					},
					include: {
						orderItems: true
					}
				});

				// Update items in order to remove them from store
				const orderItems = order.orderItems.map((item) => item.id);

				const archivedProducts = await prisma.product.updateMany({
					where: {
						id: {
							in: orderItems
						}
					},
					data: {
						archived: true
					}
				});

				console.log(archivedProducts);

				console.log(order);
			} catch (error: any) {
				console.log(error);
			}

			break;
		// Future Events :
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new NextResponse(null, { status: 200 });
}
