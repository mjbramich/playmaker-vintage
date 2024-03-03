import { format } from 'date-fns';
import { Prisma } from '@prisma/client';

import { CollectionColumn } from '@/types';
import { columns } from '@/components/collection/collection-columns';
import { DataTable } from '../ui/data-table';

// Create Type for populated collection with billboard
type CollectionWithBillboard = Prisma.collectionGetPayload<{
	include: {
		billboard: true;
	};
}>;

interface Props {
	data: CollectionWithBillboard[];
}

const CollectionTable = ({ data }: Props) => {
	const collections: CollectionColumn[] = data.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}));
	return <DataTable columns={columns} data={collections} searchKey='name' />;
};

export default CollectionTable;
