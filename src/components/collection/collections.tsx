'use client';

import { useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Collections = () => {
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='collections' description='Manage your collections' />
				<Button onClick={() => router.push(`/admin/collections/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default Collections;
