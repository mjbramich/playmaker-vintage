import prisma from '@/lib/prismadb';
import { ProductWithImage } from '@/types';
import { format } from 'date-fns';

import Billboard from '@/components/billboard';
import Hero from '@/components/hero';
import ProductList from '@/components/product-list';
import CollectionList from '@/components/collection-list';

export default async function Home() {
	// Choose a certain billboard from backend and display
	const billboard = await prisma.billboard.findFirst({
		where: {
			label: 'Playmaker Vintage'
		}
	});

	const featuredProducts = await prisma.product.findMany({
		where: {
			featured: true,
			archived: false
		},
		take: 4, // Limit the results to the first 4 items
		include: {
			images: true,
			collection: true
		}
	});

	const collections = await prisma.collection.findMany({
		include: {
			billboard: true
		}
	});

	const formattedProducts: ProductWithImage[] = featuredProducts.map((item) => ({
		...item,
		price: item.price.toString(),
		collectionId: item.collectionId,
		collection: item.collection.name,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
		updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
	}));

	return (
		<>
			<Hero />
			<ProductList
				title='Featured Products'
				data={formattedProducts}
				link={{ text: 'View All Products', href: '/collections/all' }}
			/>
			<Billboard data={billboard} />
			<CollectionList data={collections} />
		</>
	);
}
