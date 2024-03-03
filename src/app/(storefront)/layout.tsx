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

	// Grab all collections to show in Navbar as links
	const collections = await prisma.collection.findMany({
		include: {
			billboard: true
		}
	});

	return (
		<>
			<Navbar collections={collections} />
			<PageContainer>{children}</PageContainer>
		</>
	);
}
