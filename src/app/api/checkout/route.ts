import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import stripe from '@lib/stripe';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
	try {
		// grab items in order from client
		const { orderItemIds } = await req.json();

		// Handle Archived Product in Order

		// Find all products from Order.
		// Need to handle this on the server so the price cant be manipulated on the client etc
		// create initial order, user still needs to pay
		const order = await prisma.order.create({
			data: {
				isPaid: false,
				orderItems: {
					// Connect existing products to the order record
					connect: orderItemIds.map((orderItem: string) => ({
						id: orderItem
					}))
				}
			}
		});

		const items = await prisma.product.findMany({
			where: {
				id: {
					in: orderItemIds
				}
			},
			include: {
				images: true // So we can show images on stripe checkout page
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
			// Set url query parameters, to display success or error on client
			success_url: `${req.headers.get('origin')}/cart?success=true`,
			cancel_url: `${req.headers.get('origin')}/cart?canceled=true`,
			automatic_tax: { enabled: true },
			billing_address_collection: 'required',
			shipping_address_collection: {
				allowed_countries: ['AU']
			},
			// Copy shipping Id's from stripe dashboard and add here for shipping options
			shipping_options: [
				// !!! Change Shipping rates to live mode, when in prod
				{
					shipping_rate:
						process.env.NODE_ENV === 'development'
							? process.env.STRIPE_TEST_SHIPPING_KEY_REGULAR
							: process.env.STRIPE__SHIPPING_KEY_REGULAR
				}, // Regular Shipping
				{
					shipping_rate:
						process.env.NODE_ENV === 'development'
							? process.env.STRIPE_TEST_SHIPPING_KEY_EXPRESS
							: process.env.STRIPE_SHIPPING_KEY_EXPRESS
				} // Express Shipping
			],
			phone_number_collection: {
				enabled: true
			},
			expand: ['customer'], // allows access to customer object
			metadata: {
				orderId: order.id // Set order id in session, to update order later when payment succeeds
			}
		};
		// Create Checkout Session from body params.
		const session = await stripe.checkout.sessions.create(params);

		// WebHook handles successfull payment of order.

		// TODO
		// Create success page when stripe checkout successfull ?

		// No need for setting CORS headers since we are handling redirection on client
		// return NextResponse.redirect(session.url);
		return NextResponse.json({ url: session.url }, { status: 200 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
