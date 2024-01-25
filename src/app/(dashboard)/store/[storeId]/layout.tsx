import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prismadb';
import Navbar from '@/components/Navbar';

export default async function DashboardLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
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

	// Redirect back to create Store if no store found
	if (!store) {
		redirect('/');
	}
	// eslint-disable-next-line
	return (
		<div className='flex min-h-screen flex-col'>
			<Navbar />
			<div className='flex-1 p-8 pt-6 '>{children}</div>
		</div>
	);
}
