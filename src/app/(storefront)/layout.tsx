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
	return (
		<>
			<Navbar />
			<PageContainer>{children}</PageContainer>
		</>
	);
}
