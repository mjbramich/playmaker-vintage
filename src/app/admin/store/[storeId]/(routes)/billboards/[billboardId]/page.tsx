import BillboardForm from '@/components/billboard/billboard-form';
import BillboardHeading from '@/components/billboard/billboard-heading';
import prisma from '@/lib/prismadb';

const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
	const billboard = await prisma.billboard.findUnique({
		where: {
			id: params.billboardId
		}
	});

	return (
		<div className='space-y-8'>
			<BillboardHeading initialData={billboard} />
			<BillboardForm initialData={billboard} />
		</div>
	);
};

export default BillboardPage;
