import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Navbar from '@/components/Navbar';

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = auth();

	if (!userId) {
		redirect('/sign-in');
	}

	return (
		<div className='flex min-h-screen flex-col'>
			<Navbar />
			<div className='flex-1 p-8 pt-6 '>{children}</div>
		</div>
	);
}
