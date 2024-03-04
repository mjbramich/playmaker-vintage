'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Check } from 'lucide-react';

import { OrderColumn } from '@/types';
import RowAction from '@/components/order/row-action';

// Define the columns for the billboard table
export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Date'
	},
	{
		accessorKey: 'name',
		header: 'Customer'
	},
	{
		accessorKey: 'orderItems',
		header: 'Order Items',
		cell: (
			{ row } // Provide a list of product links
		) => (
			<ul>
				{row.original.orderItems.map(({ id, name, collection }) => (
					<li
						className={`ml-2 inline after:content-[','] first:ml-0 
					last:after:content-[]`}
						key={id}
					>
						<Link href={`/collections/${collection}/products/${id}`} className='font-medium'>
							{name}
						</Link>
					</li>
				))}
			</ul>
		)
	},
	{
		accessorKey: 'phone',
		header: 'Phone'
	},
	{
		accessorKey: 'address',
		header: 'Address'
	},

	{
		accessorKey: 'total',
		header: 'Total'
	},
	{
		accessorKey: 'paid',
		header: 'Paid',
		// row.original is the original row object provided to the table. eg (Order object)
		cell: ({ row }) => (row.original.isPaid ? <Check /> : null)
	},
	{
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => <RowAction data={row.original} />
	}
];
