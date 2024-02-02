'use client';

import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Categories = () => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Categories' description='Manage your categories' />
				<Button onClick={() => router.push(`/store/${params.storeId}/categories/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default Categories;
