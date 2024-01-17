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

	const store = await prisma.store.findUnique({
		where: {
			id: params.storeId,
			userId
		}
	});

	if (!store) {
		redirect('/');
	}
	// eslint-disable-next-line
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
