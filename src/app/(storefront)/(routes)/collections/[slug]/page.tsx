import { format } from 'date-fns';

import prisma from '@/lib/prismadb';
import { ProductWithImage } from '@/types';
import { validateSortInput } from '@/lib/utils';
import SortableProductList from '@/components/sortable-product-list';
import PaginationBar from '@/components/pagination';

export default async function CollectionsPage({
	params,
	searchParams
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | undefined };
}) {
	// Need if someone tries to change search params, defaults to sort by name ascending
	const { sortField, sortValue } = validateSortInput(searchParams.sort);

	console.log(sortField, sortValue);

	const page = Number(searchParams.page) || 1; // current page for pagination
	const pageSize = 8; // items for pagination

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

	const allProducts = await prisma.product.count({
		where: {
			archived: false
		}
	});

	const collectionProducts = await prisma.product.count({
		where: {
			collection: {
				name: params.slug
			},
			archived: false
		}
	});

	const totalItems = params.slug === 'all' ? allProducts : collectionProducts;

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
			<h1 className='pt-16 text-center text-3xl font-light uppercase sm:pt-24 sm:text-5xl'>
				Shop {params.slug}
			</h1>
			<SortableProductList data={formattedProducts} />
			<PaginationBar currentPage={page} pageSize={pageSize} itemCount={totalItems} />
		</>
	);
}
