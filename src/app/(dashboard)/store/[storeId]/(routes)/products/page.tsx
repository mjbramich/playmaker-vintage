import ProductsTable from '@/components/product/product-table';
import Products from '@/components/product/products';
import prisma from '@/lib/prismadb';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
	const products = await prisma.product.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			category: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-8 '>
				<Products products={products} />
				<ProductsTable data={products} />
			</div>
		</div>
	);
};

export default ProductsPage;
