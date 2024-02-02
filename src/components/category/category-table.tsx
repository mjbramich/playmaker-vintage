import { format } from 'date-fns';
import { Prisma } from '@prisma/client';

import { CategoryColumn } from '@/types';
import { columns } from '@/components/category/category-columns';
import { DataTable } from '../ui/data-table';

// Create Type for populated Category with billboard
type CategoryWithBillboard = Prisma.CategoryGetPayload<{
	include: {
		billboard: true;
	};
}>;

interface Props {
	data: CategoryWithBillboard[];
}

const CategoryTable = ({ data }: Props) => {
	const categories: CategoryColumn[] = data.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}));
	return <DataTable columns={columns} data={categories} searchKey='name' />;
};

export default CategoryTable;
