import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prismadb';

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
	const { userId } = auth();

	if (!userId) {
		redirect('/sign-in');
	}

	console.log(userId);

	// Get Default Store
	const store = await prisma.store.findFirst({
		where: {
			userId
		}
	});

	if (store) {
		redirect(`/store/${store.id}`);
	}

	// eslint-disable-next-line
	return <>{children}</>;
}
