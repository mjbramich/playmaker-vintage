'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Category } from '@prisma/client';

import AlertModal from '@/components/modals/AlertModal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
	initialData: Category | null;
}

const CategoryHeading = ({ initialData }: Props) => {
	const [open, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit Category' : 'Create Category';
	const description = initialData ? 'Edit a Category' : 'Add a new Category';

	const handleDelete = async () => {
		try {
			setLoading(true);
			await fetch(`/api/stores/${params.storeId}/categories/${params.categoryId}`, {
				method: 'DELETE'
			});

			router.push(`/store/${params.storeId}/categories`);
			router.refresh();
			toast.success('Successfully deleted category');
		} catch (error) {
			toast.error('Remove all products first');
		} finally {
			setLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				title='Delete Category'
				desc='Are you sure you want to delete this category?'
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
						Delete Category
					</Button>
				)}
			</div>
			<Separator />
		</>
	);
};

export default CategoryHeading;
