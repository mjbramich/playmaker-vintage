import Link from 'next/link';
import { format } from 'date-fns';
import { MoveRight } from 'lucide-react';

import prisma from '@/lib/prismadb';
import { ProductWithImage } from '@/types';
import ProductCard from '@/components/product-card';
import SortFilter from './sort-filter';
import { Separator } from './ui/separator';

interface Props {
	link?: {
		text: string;
		href: string;
	};
	params: { [key: string]: string };
	sortParams: { [key: string]: string };
}

const SortableProductList = async ({ link, params, sortParams }: Props) => {
	let products = [];
	const page = Number(params.page) || 1; // current page for pagination
	const pageSize = 8; // items for pagination
	const { sortField, sortValue } = sortParams;
	if (params.slug === 'all') {
		products = await prisma.product.findMany({
			where: {
				archived: false
			},
			include: {
				images: true,
				collection: true
			},
			orderBy: {
				[sortField]: sortValue
			},
			// Pagination
			take: pageSize,
			skip: (page - 1) * pageSize
		});
	} else {
		// get products only for that specific collection
		products = await prisma.product.findMany({
			where: {
				collection: {
					name: params.slug
				},
				archived: false
			},
			include: {
				images: true,
				collection: true
			},
			orderBy: {
				[sortField]: sortValue
			},
			// Pagination
			take: pageSize,
			skip: (page - 1) * pageSize
		});
	}

	const formattedProducts: ProductWithImage[] = products.map((item) => ({
		...item,
		price: item.price.toString(),
		collectionId: item.collection.id,
		collection: item.collection.name,
		createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
		updatedAt: format(new Date(item.updatedAt), 'MMMM do, yyyy')
	}));

	return (
		<div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-6 '>
			<div className='mb-6 flex items-center justify-between px-4 sm:px-6 lg:px-0'>
				<SortFilter />
				<p className='text-sm'>Products: {formattedProducts.length}</p>
			</div>

			<Separator />
			<ul className=' mt-6 grid grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 md:grid-cols-4 lg:grid-cols-4 lg:px-0 xl:gap-x-8'>
				{formattedProducts.map((product) => (
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
	);
};

export default SortableProductList;
