import prisma from '@/lib/prismadb';

import Collections from '@/components/collection/collections';
import CollectionTable from '@/components/collection/collections-table';

const collectionsPage = async () => {
	const collections = await prisma.collection.findMany({
		include: {
			billboard: true // populate the billboard on the collection (return all billboard fields)
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-8 '>
				<Collections />
				<CollectionTable data={collections} />
			</div>
		</div>
	);
};

export default collectionsPage;
