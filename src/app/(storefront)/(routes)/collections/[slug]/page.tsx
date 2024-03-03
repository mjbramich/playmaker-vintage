import { format } from 'date-fns';

import prisma from '@/lib/prismadb';
import { ProductWithImage } from '@/types';
import { validateSortInput } from '@/lib/utils';
import SortableProductList from '@/components/sortable-product-list';

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
			}
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
			}
		});
	}

	// const formattedProducts: ProductWithImage[] = products.map((item) => ({
	// 	id: item.id,
	// 	name: item.name,
	// 	size: item.size,
	// 	price: currencyFormatter.format(Number(item.price)), // Need to convert Decimal to number first then format
	// 	collectionId: item.collectionId,
	// 	collection: item.collection.name,
	// 	featured: item.featured,
	// 	archived: item.archived,
	// 	createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	// 	updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
	// 	images: item.images
	// }));

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
		</>
	);
}
