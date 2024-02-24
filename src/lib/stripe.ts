import Stripe from 'stripe';

// eslint-disable-next-line import/no-mutable-exports
let stripe: Stripe;

// Remember 'test' could also be a value for NODE_ENV
if (process.env.NODE_ENV === 'development') {
	if (!process.env.STRIPE_TEST_SECRET_KEY) {
		throw new Error('STRIPE_TEST_SECRET_KEY is missing. Please set the environment variable.');
	}

	stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
		apiVersion: '2023-10-16',
		typescript: true
	});
} else {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error('STRIPE__SECRET_KEY is missing. Please set the environment variable.');
	}

	stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: '2023-10-16',
		typescript: true
	});
}

export default stripe;
