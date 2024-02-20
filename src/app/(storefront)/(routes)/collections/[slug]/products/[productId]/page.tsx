import prisma from '@/lib/prismadb';
import { format } from 'date-fns';

import { currencyFormatter } from '@/lib/utils';
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
			category: true
		}
	});

	const relatedProducts = await prisma.product.findMany({
		where: {
			categoryId: product?.categoryId,
			// don't include current product
			id: {
				not: product?.id
			}
		},
		include: {
			images: true,
			category: true
		}
	});

	if (!product) {
		return null;
	}

	const formattedProduct: ProductWithImage = {
		...product,
		price: currencyFormatter.format(Number(product.price)),
		categoryId: product.category.id,
		category: product.category.name,
		createdAt: format(new Date(product.createdAt), 'MMMM do, yyyy'),
		updatedAt: format(new Date(product.updatedAt), 'MMMM do, yyyy')
	};

	const formattedProducts: ProductWithImage[] = relatedProducts.map((item) => ({
		...item,
		price: currencyFormatter.format(Number(item.price)), // Need to convert Decimal to number first then format
		categoryId: item.categoryId,
		category: item.category.name,
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
