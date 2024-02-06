'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ProductColumn } from '@/types';
// import RowAction from '@/components/category/row-action';

// Define the columns for the billboard table
export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'size',
		header: 'Size'
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => row.original.category
	},
	{
		accessorKey: 'createdAt',
		header: 'Date'
	},
	{
		accessorKey: 'price',
		header: 'Price'
	}
	// {
	// 	header: 'Actions',
	// 	id: 'actions',
	// 	// row.original is the original row object provided to the table
	// 	cell: ({ row }) => <RowAction data={row.original} />
	// }
];
