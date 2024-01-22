'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import AlertModal from '@/components/modals/AlertModal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Store } from '@prisma/client';

interface Props {
	initialData: Store;
}

const SettingsHeading = ({ initialData }: Props) => {
	const [open, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	console.log(initialData, 'header');

	const router = useRouter();

	const handleDelete = async () => {
		try {
			setLoading(true);
			const deleted = await fetch(`/api/stores/${initialData.id}`, {
				method: 'DELETE'
			});

			console.log(deleted);

			router.refresh();
			// router.push('/');
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
				title='Delete Store'
				desc='Are you sure you want to delete this store?'
				isOpen={open}
				setIsOpen={setIsOpen}
				onConfirm={handleDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading title='Settings' description='Manage your store settings' />
				<Button disabled={loading} variant='destructive' size='sm' onClick={() => setIsOpen(true)}>
					<Trash className='h-16 w-4' />
				</Button>
			</div>

			<Separator />
		</>
	);
};

export default SettingsHeading;
