import prisma from '@/lib/prismadb';
import { ProductWithImage } from '@/types';
import { format } from 'date-fns';
import { currencyFormatter } from '@/lib/utils';

import Billboard from '@/components/billboard';
import Hero from '@/components/hero';
import ProductList from '@/components/product-list';
import CollectionList from '@/components/category-list';

export default async function Home() {
	// Choose a certain billboard from backend and display
	const billboard = await prisma.billboard.findUnique({
		where: {
			id: '2aacc948-ea65-4ce2-ba93-30fa638e6ec0'
		}
	});

	const featuredProducts = await prisma.product.findMany({
		where: {
			featured: true
		},
		take: 4, // Limit the results to the first 4 items
		include: {
			images: true,
			category: true
		}
	});

	const categories = await prisma.category.findMany();

	const formattedProducts: ProductWithImage[] = featuredProducts.map((item) => ({
		...item,
		price: currencyFormatter.format(Number(item.price)), // Need to convert Decimal to number first then format
		categoryId: item.categoryId,
		category: item.category.name,
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
			<CollectionList data={categories} />
		</>
	);
}
