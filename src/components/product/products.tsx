'use client';

import { useParams, useRouter } from 'next/navigation';
import { Product } from '@prisma/client';

import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface Props {
	products: Product[];
}

const Products = ({ products }: Props) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Products' description='Manage your products' count={products.length} />
				<Button onClick={() => router.push(`/store/${params.storeId}/products/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default Products;