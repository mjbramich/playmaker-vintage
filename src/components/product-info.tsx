'use client';

import useCartStore from '@/stores/cart';
import { ProductWithImage } from '@/types';
import { Button } from '@/components/ui/button';
import Price from '@/components/price';

interface Props {
	product: ProductWithImage;
}

const ProductInfo = ({ product }: Props) => {
	const { addItem } = useCartStore();

	return (
		<div className='mx-auto mt-12 w-full md:mt-0'>
			<h1 className='text-3xl font-bold capitalize tracking-tight '>{product.name}</h1>

			<div className='space-y-6'>
				<h2 className='sr-only'>Product information</h2>
				<Price value={product.price} />
				<p className='text-xl font-semibold tracking-tight'>Size: {product.size}</p>
			</div>

			<form className='mt-6'>
				<div className=''>
					<Button className='w-full ' size='lg' onClick={() => addItem(product)}>
						Add to cart
					</Button>
				</div>
			</form>

			<div className='mt-6'>
				<h3 className='sr-only'>Description</h3>
				<div className='space-y-6 text-base text-muted-foreground'>Description:</div>
			</div>
		</div>
	);
};

export default ProductInfo;
