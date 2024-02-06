'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import AlertModal from '@/components/modals/AlertModal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Product } from '@prisma/client';

interface Props {
	initialData: Product | null;
}

const ProductHeading = ({ initialData }: Props) => {
	const [open, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit product' : 'Create product';
	const description = initialData ? 'Edit a product.' : 'Add a new product';

	const handleDelete = async () => {
		try {
			setLoading(true);
			await fetch(`/api/stores/${params.storeId}/products/${params.productId}`, {
				method: 'DELETE'
			});

			router.push(`/store/${params.storeId}/products`);
			router.refresh();
			toast.success('Successfully deleted product');
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
				title='Delete Product'
				desc='Are you sure you want to delete this product?'
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
						Delete Product
					</Button>
				)}
			</div>
			<Separator />
		</>
	);
};

export default ProductHeading;
