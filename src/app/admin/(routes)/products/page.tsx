import prisma from '@/lib/prismadb';
import { format } from 'date-fns';

import { currencyFormatter } from '@/lib/utils';
import { ProductColumn } from '@/types';
import ProductsTable from '@/components/product/product-table';
import Products from '@/components/product/products';

const ProductsPage = async () => {
	const products = await prisma.product.findMany({
		include: {
			collection: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	// Format data before passing to client components, since only plain objects can be passed to client components from server. Example: Decimal type.

	const formattedProducts: ProductColumn[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		size: item.size,
		price: currencyFormatter.format(Number(item.price)), // Need to convert Decimal to number first then format
		collection: item.collection.name,
		featured: item.featured,
		archived: item.archived,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-8 '>
				<Products products={formattedProducts} />
				<ProductsTable data={formattedProducts} />
			</div>
		</div>
	);
};

export default ProductsPage;
