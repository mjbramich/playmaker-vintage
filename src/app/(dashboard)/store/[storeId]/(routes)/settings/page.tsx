import { auth } from '@clerk/nextjs';

import { redirect } from 'next/navigation';

import prisma from '@/lib/prismadb';
import SettingsForm from '@/components/SettingsForm';

import SettingsHeading from '@/components/SettingsHeading';

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

	const store = await prisma.store.findFirst({
		where: {
			id: params.storeId, // params is accessed from the dynamic route segment value in [storeId]
			userId
		}
	});

	if (!store) {
		// notFound();
		redirect('/');
	}

	return (
		<div className='space-y-8'>
			<SettingsHeading initialData={store} />
			<SettingsForm initialData={store} />
		</div>
	);
};

export default SettingsPage;
