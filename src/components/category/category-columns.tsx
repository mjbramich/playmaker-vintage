'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CategoryColumn } from '@/types';
import RowAction from '@/components/category/row-action';

// Define the columns for the billboard table
export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'billboard',
		header: 'Billboard',
		cell: ({ row }) => row.original.billboardLabel
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
