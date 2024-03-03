import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/order/order-columns';
import { OrderColumn } from '@/types';

// Create Type for populated collection with billboard
// type ProductWithcollection = Prisma.ProductGetPayload<{
// 	include: {
// 		collection: true;
// 	};
// }>;

interface Props {
	data: OrderColumn[];
}

const OrdersTable = ({ data }: Props) => (
	<DataTable columns={columns} data={data} searchKey='name' />
);

export default OrdersTable;
