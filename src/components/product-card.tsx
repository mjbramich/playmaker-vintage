import Image from 'next/image';
import Link from 'next/link';

import { ProductWithImage } from '@/types';
import Price from '@/components/price';

interface Props {
	productData: ProductWithImage;
}

const ProductCard = ({ productData }: Props) => (
	<li className='group relative cursor-pointer space-y-4  '>
		<div className='relative aspect-[4/5] rounded-xl '>
			<Image
				src={productData.images[0].url}
				alt={`${productData.name} image`}
				className='h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 '
				fill
			/>
		</div>

		<div className=' text-center'>
			<Link
				href={`/collections/${productData.collection}/products/${productData.id}`}
				className='absolute inset-0'
			/>
			<h3 className='text-lg font-medium text-gray-900'>{productData.name}</h3>
			<Price value={productData.price} />
		</div>
	</li>
);

export default ProductCard;
