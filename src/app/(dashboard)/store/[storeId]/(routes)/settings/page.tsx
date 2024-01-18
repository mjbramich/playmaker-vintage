import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prismadb';
import SettingsForm from '@/components/SettingsForm';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface SettingsPageProps {
	params: {
		storeId: string;
	};
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
	const { userId } = auth();

	if (!userId) {
		redirect('/sign-in');
	}

	const store = await prisma.store.findUnique({
		where: {
			id: params.storeId, // params is accessed from the dynamic route segment value in [storeId]
			userId
		}
	});

	if (!store) {
		redirect('/');
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<Heading title='Settings' description='Manage your store settings' />
				<Separator />
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default SettingsPage;
