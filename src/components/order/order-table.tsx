import { OrderColumn } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/order/order-columns';

// Create Type for populated Category with billboard
// type ProductWithCategory = Prisma.ProductGetPayload<{
// 	include: {
// 		category: true;
// 	};
// }>;

interface Props {
	data: OrderColumn[];
}

const OrdersTable = ({ data }: Props) => <DataTable columns={columns} data={data} searchKey='id' />;

export default OrdersTable;
