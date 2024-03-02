import prisma from '@/lib/prismadb';

import ProductForm from '@/components/product/product-form';
import ProductHeading from '@/components/product/product-heading';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const product = await prisma.product.findUnique({
		where: {
			id: params.productId
		},
		include: {
			images: true
		}
	});

	const categories = await prisma.category.findMany();

	// type ProductWithImages = Prisma.ProductGetPayload<{
	// 	include: {
	// 		images: true;
	// 	};
	// }>;

	// interface FormattedProduct extends Omit<ProductWithImages, 'price'> {
	// 	price: string;
	// }

	// Format data before passing to client components, since only plain objects can be passed to client components from server. Example: Decimal type.
	const formattedProduct = product
		? {
				...product,
				price: String(product.price) // Need to convert Decimal to plain object eg. String | Number
			}
		: null;

	return (
		<div className='space-y-8'>
			<ProductHeading initialData={formattedProduct} />
			<ProductForm initialData={formattedProduct} categories={categories} />
		</div>
	);
};

export default ProductPage;
