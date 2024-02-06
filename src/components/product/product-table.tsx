import { format } from 'date-fns';
import { Prisma } from '@prisma/client';

import { ProductColumn } from '@/types';
import { columns } from '@/components/product/product-columns';
import { DataTable } from '../ui/data-table';

// Create Type for populated Category with billboard
type ProductWithCategory = Prisma.ProductGetPayload<{
	include: {
		category: true;
	};
}>;

interface Props {
	data: ProductWithCategory[];
}

const ProductsTable = ({ data }: Props) => {
	const products: ProductColumn[] = data.map((item) => ({
		id: item.id,
		name: item.name,
		size: item.size,
		price: Number(item.price), // FIX?
		category: item.category.name,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}));
	return <DataTable columns={columns} data={products} searchKey='name' />;
};

export default ProductsTable;
