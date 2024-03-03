import prisma from '@/lib/prismadb';

import CollectionHeading from '@/components/collection/collection-heading';
import CollectionForm from '@/components/collection/collection-form';

const BillboardPage = async ({ params }: { params: { collectionId: string; storeId: string } }) => {
	const collection = await prisma.collection.findUnique({
		where: {
			id: params.collectionId
		}
	});

	const billboards = await prisma.billboard.findMany();

	return (
		<div className='space-y-8'>
			{/* <BillboardHeading initialData={billboards} /> */}
			<CollectionHeading initialData={collection} />
			<CollectionForm initialData={collection} billboards={billboards} />
		</div>
	);
};

export default BillboardPage;
