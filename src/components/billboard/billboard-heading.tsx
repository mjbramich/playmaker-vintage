'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import AlertModal from '@/components/modals/AlertModal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';

interface Props {
	initialData: Billboard | null;
}

const BillboardHeading = ({ initialData }: Props) => {
	const [open, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit billboard' : 'Create billboard';
	const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';

	const handleDelete = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/store/billboards/${params.billboardId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}

			router.push(`/admin/billboards`);
			router.refresh();
			toast.success('Successfully deleted billboard');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`Make sure to delete all categories first. ${error.message}`);
			}
		} finally {
			setLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				title='Delete billboard'
				desc='Are you sure you want to delete this billboard?'
				isOpen={open}
				setIsOpen={setIsOpen}
				onConfirm={handleDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button disabled={loading} variant='destructive' onClick={() => setIsOpen(true)}>
						<Trash className='mr-2 h-4 w-4' />
						Delete Billboard
					</Button>
				)}
			</div>
			<Separator />
		</>
	);
};

export default BillboardHeading;
