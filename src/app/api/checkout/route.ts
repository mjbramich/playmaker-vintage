import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import stripe from '@lib/stripe';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
	try {
		// grab items in order from client
		const { orderItemIds } = await req.json();

		// Find all products from Order.
		// Need to handle this on the server so the price cant be manipulated on the client etc
		const items = await prisma.product.findMany({
			where: {
				id: {
					in: orderItemIds
				}
			},
			include: {
				images: true
			}
		});

		// format items for stripe session
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
			quantity: 1,
			price_data: {
				currency: 'aud',
				product_data: {
					name: item.name,
					images: [item.images[0].url]
				},
				unit_amount: item.price.toNumber() * 100
			} // convert to cents, since stripe uses cents
		}));

		const params: Stripe.Checkout.SessionCreateParams = {
			line_items,
			mode: 'payment',
			success_url: `${req.headers.get('origin')}/?success=true`,
			cancel_url: `${req.headers.get('origin')}/?canceled=true`,
			automatic_tax: { enabled: true },
			billing_address_collection: 'required',
			shipping_address_collection: {
				allowed_countries: ['AU']
			},
			// Copy shipping Id's from stripe dashboard and add here for shipping options
			shipping_options: [
				// !!! Shipping rates to live mode, when in prod
				{ shipping_rate: 'shr_1OnCzmGQDkutFIq5NEXJkp4m' },
				{ shipping_rate: 'shr_1OnDCXGQDkutFIq5IcJVFkWm' }
			]
		};
		// Create Checkout Session from body params.
		const session = await stripe.checkout.sessions.create(params);

		// TODO
		// Create new Order, so details can be shown in the admin page
		// Create success page when stripe checkout successfull ?

		// No need for setting CORS headers since we are handling redirection on client
		// return NextResponse.redirect(session.url);
		return NextResponse.json({ url: session.url }, { status: 200 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
