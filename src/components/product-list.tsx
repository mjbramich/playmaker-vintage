import Link from 'next/link';
import { MoveRight } from 'lucide-react';

import { ProductWithImage } from '@/types';
import ProductCard from '@/components/product-card';

interface Props {
	title?: string;
	data: ProductWithImage[];
	link?: {
		text: string;
		href: string;
	};
}

const ProductList = ({ data, title, link }: Props) => (
	<section className='bg-white'>
		<div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32'>
			{title && (
				<div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
					<h2 className='text-2xl font-bold tracking-tight text-gray-900'>{title}</h2>
				</div>
			)}

			<ul className=' mt-6 grid grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-0 xl:gap-x-8'>
				{data.map((product) => (
					<ProductCard key={product.id} productData={product} />
				))}
			</ul>
			{link && (
				<div className='mt-12 px-4 sm:px-8 lg:px-0 '>
					<Link
						href={link.href}
						className='text-sm font-medium text-primary transition-colors hover:text-muted-foreground'
					>
						{link.text}
						<MoveRight className='ml-2 inline' />
					</Link>
				</div>
			)}
		</div>
	</section>
);

export default ProductList;
