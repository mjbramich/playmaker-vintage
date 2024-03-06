'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Collection } from '@prisma/client';

import AlertModal from '@/components/modals/AlertModal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
	initialData: Collection | null;
}

const CollectionHeading = ({ initialData }: Props) => {
	const [open, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit collection' : 'Create collection';
	const description = initialData ? 'Edit a collection' : 'Add a new collection';

	const handleDelete = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/store/collections/${params.collectionId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}

			router.push(`/admin/collections`);
			router.refresh();
			toast.success('Successfully deleted collection');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				title='Delete collection'
				desc='Are you sure you want to delete this collection?'
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
						Delete collection
					</Button>
				)}
			</div>
			<Separator />
		</>
	);
};

export default CollectionHeading;
