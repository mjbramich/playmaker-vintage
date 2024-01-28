'use client';

import { ColumnDef } from '@tanstack/react-table';

import { BillboardColumn } from '@/types';
import RowAction from '@/components/billboard/row-action';

// Define the columns for the billboard table
export const columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: 'label',
		header: 'Label'
	},
	{
		accessorKey: 'createdAt',
		header: 'Date'
	},

	{
		header: 'Actions',
		id: 'actions',
		// row.original is the original row object provided to the table
		cell: ({ row }) => <RowAction data={row.original} />
	}
];
