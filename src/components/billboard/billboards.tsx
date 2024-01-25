'use client';

import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Billboards = () => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Billboards' description='Manage your billboards' />
				<Button onClick={() => router.push(`/store/${params.storeId}/billboards/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default Billboards;
