import prisma from '@/lib/prismadb';

import PageContainer from '@/components/page-container';
import Navbar from '@/components/navigation/store-navbar';

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
	// const { userId } = auth();

	// if (!userId) {
	// 	redirect('/sign-in');
	// }

	// // Get Default Store
	// const store = await prisma.store.findFirst({
	// 	where: {
	// 		userId
	// 	}
	// });

	// if (store) {
	// 	redirect(`/admin/store/${store.id}`);

	// eslint-disable-next-line

	// Grab all Categories to show
	const categories = await prisma.category.findMany({
		include: {
			billboard: true
		}
	});

	return (
		<>
			<Navbar categories={categories} />
			<PageContainer>{children}</PageContainer>
		</>
	);
}
