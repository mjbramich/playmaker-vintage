import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = auth();

	// Make sure User is authenticated before accessing admin
	if (!userId) {
		redirect('/sign-in');
	}

	return (
		<div className='mx-auto flex min-h-screen max-w-[1920px] flex-col p-8 pt-6'>{children}</div>
	);
}
