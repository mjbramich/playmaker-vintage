import Link from 'next/link';
import { format } from 'date-fns';
import { MoveRight } from 'lucide-react';

import prisma from '@/lib/prismadb';
import { validateSortInput } from '@/lib/utils';
import { ProductWithImage } from '@/types';
import ProductCard from '@/components/product-card';

interface Props {
	link?: {
		text: string;
		href: string;
	};
	params: { [key: string]: string };
	searchParams: { [key: string]: string };
}

const SortableProductList = async ({ link, params, searchParams }: Props) => {
	const page = Number(searchParams.page) || 1; // current page for pagination
	const pageSize = 8; // items for pagination

	// Need if someone tries to change search params, defaults to sort by name ascending
	const { sortField, sortValue } = validateSortInput(searchParams.sort);

	let products = [];
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
		<>
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
		</>
	);
};

export default SortableProductList;
