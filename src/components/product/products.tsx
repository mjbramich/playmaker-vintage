'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { ProductColumn } from '@/types';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
	products: ProductColumn[];
}

const Products = ({ products }: Props) => {
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Products' description='Manage your products' count={products.length} />
				<Button onClick={() => router.push(`/admin/products/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default Products;
