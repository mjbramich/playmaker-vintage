'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check } from 'lucide-react';

import { ProductColumn } from '@/types';
import RowAction from '@/components/product/row-action';

// Define the columns for the billboard table
export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'createdAt',
		header: 'Date'
	},
	{
		accessorKey: 'featured',
		header: 'Featured',
		cell: ({ row }) => (row.original.featured ? <Check /> : null)
	},
	{
		accessorKey: 'archived',
		header: 'Archived',
		cell: ({ row }) => (row.original.archived ? <Check /> : null)
	},
	{
		accessorKey: 'size',
		header: 'Size'
	},
	{
		accessorKey: 'collection',
		header: 'collection',
		cell: ({ row }) => row.original.collection
	},
	{
		accessorKey: 'price',
		header: 'Price'
	},
	{
		header: 'Actions',
		id: 'actions',
		// row.original is the original row object provided to the table
		cell: ({ row }) => <RowAction data={row.original} />
	}
];
