'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, XCircle, MoveRight } from 'lucide-react';

import useCartStore from '@/stores/cart';
import Price from '@/components/price';
import useStore from '@/hooks/useStore';
import { Button } from '@/components/ui/button';

const Cart = () => {
	const { removeItem } = useCartStore();

	// Get items in store on mount to avoid hydration issues
	const products = useStore(useCartStore, (state) => state.items);

	const orderTotal = products?.reduce((total, item) => total + Number(item.price), 0);

	if (!products) {
		return null;
	}

	// Since we are storing the cart items in our store in localStorage, we need to run this on inital mount on client.
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0'>
				<h1 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					Your cart
				</h1>

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
															className='font-medium text-gray-700 hover:text-gray-800'
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
											<Price value={orderTotal!} />
										</div>
									</div>
								</div>
								<p className='mt-1 text-sm text-gray-500'>
									Shipping and taxes will be calculated at checkout.
								</p>
							</div>

							<div className='mt-10'>
								<Button className='w-full px-4 py-3 text-base font-medium' size='lg'>
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
