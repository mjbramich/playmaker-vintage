import { ProductColumn } from '@/types';
import { columns } from '@/components/product/product-columns';
import { DataTable } from '@/components/ui/data-table';

// Create Type for populated collection with billboard
// type ProductWithcollection = Prisma.ProductGetPayload<{
// 	include: {
// 		collection: true;
// 	};
// }>;

interface Props {
	data: ProductColumn[];
}

const ProductsTable = ({ data }: Props) => (
	<DataTable columns={columns} data={data} searchKey='name' />
);

export default ProductsTable;
