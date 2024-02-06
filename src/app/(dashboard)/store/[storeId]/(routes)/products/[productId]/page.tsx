import prisma from '@/lib/prismadb';

import ProductForm from '@/components/product/product-form';
import ProductHeading from '@/components/product/product-heading';

const ProductPage = async ({ params }: { params: { storeId: string; productId: string } }) => {
	const product = await prisma.product.findUnique({
		where: {
			id: params.productId
		},
		include: {
			images: true
		}
	});

	const categories = await prisma.category.findMany({
		where: {
			storeId: params.storeId
		}
	});

	return (
		<div className='space-y-8'>
			<ProductHeading initialData={product} />
			<ProductForm initialData={product} categories={categories} />
		</div>
	);
};

export default ProductPage;
