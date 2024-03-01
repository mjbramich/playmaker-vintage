'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, MoveRight } from 'lucide-react';

import { ProductWithImage } from '@/types';
import useCartStore from '@/stores/cart';
import useStore from '@/hooks/useStore';
import Price from '@/components/price';
import { Button } from '@/components/ui/button';

const Cart = () => {
	const params = useSearchParams();
	const [loading, setLoading] = useState(false);
	const { removeItem, removeAll } = useCartStore();
	const router = useRouter();

	useEffect(() => {
		if (params.has('success')) {
			toast.success('Order completed successfully');
			// after successfull order remove all items in cart
			removeAll();
		}

		if (params.has('canceled')) {
			toast.error('Order failed: Something went wrong with your order.');
		}
	}, [params, removeAll]);

	// Get items in store on mount to avoid hydration issues
	const products = useStore(useCartStore, (state) => state.items);
	const orderTotal = products?.reduce((total, item) => total + Number(item.price), 0) || 0;

	async function handleCheckout(
		e: React.FormEvent<HTMLButtonElement>,
		orderItems: ProductWithImage[]
	) {
		const orderItemIds = orderItems.map((item) => item.id);
		// Prevent default form submission
		e.preventDefault();
		try {
			setLoading(true);

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ orderItemIds })
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}

			const data = await response.json();
			// Go to stripe checkout session
			router.push(data.url);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	// On server, skip rendering to avoid hydration issues since the store is not on the server.
	if (!products) {
		return null;
	}

	// On mount render the cart
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0'>
				<h1 className='text-center text-3xl font-bold  text-playmaker sm:text-4xl'>Your cart</h1>

				{products.length ? (
					<form className='mt-12'>
						<section aria-labelledby='cart-heading'>
							<h2 id='cart-heading' className='sr-only'>
								Items in your shopping cart
							</h2>

							<ul className='divide-y divide-gray-200 border-y border-gray-200'>
								{products.map((product) => (
									<li key={product.id} className='flex py-6'>
										<div className='relative h-24 w-24 shrink-0 sm:h-32 sm:w-32'>
											<Image
												src={product.images[0].url}
												alt={product.name}
												className=' aspect-square rounded-md object-cover object-center'
												fill
											/>
										</div>

										<div className='ml-4 flex flex-1 flex-col sm:ml-6'>
											<div>
												<div className='flex justify-between'>
													<h4 className='text-sm sm:text-base'>
														<Link
															href={`/collections/${product.category}/product/${product.id}`}
															className='font-medium capitalize hover:text-muted-foreground'
														>
															{product.name}
														</Link>
													</h4>
													<Price value={product.price} />
												</div>
												<p className='mt-1 text-sm text-gray-500'>{product.size}</p>
											</div>

											<div className='mt-4 flex flex-1 items-end justify-between'>
												<p className='flex items-center space-x-2 text-sm text-gray-700'>
													{product ? (
														<>
															<CheckCircle2
																className='h-5 w-5 shrink-0 text-green-500'
																aria-hidden='true'
															/>
															<span> In stock</span>
														</>
													) : (
														<>
															<XCircle
																className='h-5 w-5 shrink-0 text-gray-300'
																aria-hidden='true'
															/>
															<span>Out of stock</span>
														</>
													)}
												</p>
												<div className='ml-4'>
													<button
														type='button'
														onClick={() => removeItem(product.id)}
														className='text-sm font-medium text-destructive hover:text-red-300'
													>
														<span>Remove</span>
													</button>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</section>

						{/* Order summary */}
						<section aria-labelledby='summary-heading' className='mt-10'>
							<h2 id='summary-heading' className='sr-only'>
								Order summary
							</h2>

							<div>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<p className='text-base font-medium text-gray-900'>Subtotal</p>
										<div className='ml-4 text-base font-medium text-gray-900'>
											<Price value={orderTotal} />
										</div>
									</div>
								</div>
								<p className='mt-1 text-sm text-gray-500'>
									Shipping and taxes will be calculated at checkout.
								</p>
							</div>

							<div className='mt-10'>
								<Button
									className='w-full px-4 py-3 text-base font-medium  '
									size='lg'
									disabled={products.length < 1 || loading}
									onClick={(e) => handleCheckout(e, products)}
									variant='playmaker'
								>
									Checkout
								</Button>
							</div>

							<div className='mt-6 text-center text-base text-muted-foreground'>
								<p>
									or{' '}
									<Link
										href='/collections/all'
										className='text-center text-sm font-medium uppercase text-primary transition-colors hover:text-muted-foreground'
									>
										Continue Shopping
										<MoveRight className='ml-2 inline' />
									</Link>
								</p>
							</div>
						</section>
					</form>
				) : (
					<div className='mt-4 flex flex-col items-center gap-4'>
						<p className=' text-center text-muted-foreground'>Your cart is currently empty</p>
						<Link
							href='/collections/all'
							className='text-center text-sm font-medium uppercase text-primary transition-colors hover:text-muted-foreground'
						>
							Continue Shopping
							<MoveRight className='ml-2 inline' />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
