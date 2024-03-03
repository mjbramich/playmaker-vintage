'use client';

import { Prisma } from '@prisma/client';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import AlertModal from '@/components/modals/AlertModal';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Create Type for populated Images with billboard
type ProductWithImages = Prisma.ProductGetPayload<{
	include: {
		images: true;
	};
}>;

interface FormattedProduct extends Omit<ProductWithImages, 'price'> {
	price: string;
}

interface Props {
	initialData: FormattedProduct | null;
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
			const response = await fetch(`/api/store/products/${params.productId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}

			router.push(`/admin/products`);
			router.refresh();
			toast.success('Successfully deleted product');
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
