import prisma from '@/lib/prismadb';
import { format } from 'date-fns';

import { ProductWithImage } from '@/types';
import ProductInfo from '@/components/product-info';
import ProductGallery from '@/components/product-gallery';
import ProductList from '@/components/product-list';

export default async function ProductPage({
	params
}: {
	params: { productId: string; slug: string };
}) {
	// get product
	const product = await prisma.product.findUnique({
		where: {
			id: params.productId
		},
		include: {
			images: true,
			collection: true
		}
	});

	const relatedProducts = await prisma.product.findMany({
		where: {
			collectionId: product?.collectionId,
			// don't include current product
			id: {
				not: product?.id
			},
			archived: false
		},
		take: 4, // limit query to first 4 results
		include: {
			images: true,
			collection: true
		}
	});

	if (!product) {
		return null;
	}

	const formattedProduct: ProductWithImage = {
		...product,
		price: product.price.toString(),
		collectionId: product.collection.id,
		collection: product.collection.name,
		createdAt: format(new Date(product.createdAt), 'MMMM do, yyyy'),
		updatedAt: format(new Date(product.updatedAt), 'MMMM do, yyyy')
	};

	const formattedProducts: ProductWithImage[] = relatedProducts.map((item) => ({
		...item,
		price: product.price.toString(),

		// price: currencyFormatter.format(Number(item.price)), // Need to convert Decimal to number first then format
		collectionId: item.collectionId,
		collection: item.collection.name,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
		updatedAt: format(item.updatedAt, 'MMMM do, yyyy')
	}));

	return (
		<section className='bg-white lg:mx-auto lg:max-w-7xl '>
			<div className='grid px-4 pt-8 sm:px-6 sm:pt-16 md:grid-cols-2 md:gap-x-8   '>
				<ProductGallery productImages={formattedProduct.images} />
				<ProductInfo product={formattedProduct} />
			</div>
			<ProductList
				title='You May Also Like'
				data={formattedProducts}
				link={{
					text: `Back to ${params.slug}`,
					href: `/collections/${params.slug}`
				}}
			/>
		</section>
	);
}
