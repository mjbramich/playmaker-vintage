import Billboard from '@/components/billboard';
import prisma from '@/lib/prismadb';

export default async function Home() {
	const billboard = await prisma.billboard.findUnique({
		where: {
			id: '2aacc948-ea65-4ce2-ba93-30fa638e6ec0'
		}
	});
	return (
		<>
			<p>HEllo baby</p>
			<Billboard data={billboard} />
		</>
	);
}
