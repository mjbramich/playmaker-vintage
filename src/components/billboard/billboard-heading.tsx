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
	console.log(initialData, 'header');

	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit billboard' : 'Create billboard';
	const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';

	const handleDelete = async () => {
		try {
			setLoading(true);
			await fetch(`/api/stores/${params.storeId}/billboards/${params.billboardId}`, {
				method: 'DELETE'
			});

			router.push(`/store/${params.storeId}/billboards`);
			router.refresh();
			toast.success('Successfully deleted store');
		} catch (error) {
			toast.error('Remove all products & categories first first');
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
