import Billboard from '@/components/billboard';
import Hero from '@/components/hero';
import prisma from '@/lib/prismadb';

export default async function Home() {
	const billboard = await prisma.billboard.findUnique({
		where: {
			id: '2aacc948-ea65-4ce2-ba93-30fa638e6ec0'
		}
	});
	return (
		<>
			<Hero />
			<Billboard data={billboard} />
		</>
	);
}
