'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';

import { OrderColumn } from '@/types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AlertModal from '@/components/modals/AlertModal';

interface Props {
	data: OrderColumn;
}
const RowAction = ({ data }: Props) => {
	const router = useRouter();
	const [open, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success('OrderId copied to clipboard.');
	};

	const handleDelete = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/store/orders/${data.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}
			toast.success('Successfully deleted order');
			router.refresh();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`Failed to delete order ${error.message}`);
			}
		} finally {
			setLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				title='Delete Order'
				desc='Are you sure you want to delete this Order?'
				isOpen={open}
				setIsOpen={setIsOpen}
				onConfirm={handleDelete}
				loading={loading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className='mr-2 h-4 w-4' /> Copy ID
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setIsOpen(true)}>
						<Trash className='mr-2 h-4 w-4' /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default RowAction;
