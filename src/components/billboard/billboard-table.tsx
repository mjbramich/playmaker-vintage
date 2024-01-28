import { format } from 'date-fns';
import { Billboard } from '@prisma/client';

import { BillboardColumn } from '@/types';
import { columns } from '@/components/billboard/billboard-columns';
import { DataTable } from '../ui/data-table';

interface Props {
	data: Billboard[];
}

const BillboardTable = ({ data }: Props) => {
	const billboards: BillboardColumn[] = data.map((item) => ({
		id: item.id,
		label: item.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}));
	return <DataTable columns={columns} data={billboards} searchKey='label' />;
};

export default BillboardTable;
