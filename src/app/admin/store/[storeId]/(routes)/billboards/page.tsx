import prisma from '@/lib/prismadb';

import Billboards from '@/components/billboard/billboards';
import BillboardTable from '@/components/billboard/billboard-table';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
	const billboards = await prisma.billboard.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-8 '>
				<Billboards />
				<BillboardTable data={billboards} />
			</div>
		</div>
	);
};

export default BillboardsPage;
