import CategoryForm from '@/components/category/category-form';
import prisma from '@/lib/prismadb';

const BillboardPage = async ({ params }: { params: { categoryId: string; storeId: string } }) => {
	const category = await prisma.category.findUnique({
		where: {
			id: params.categoryId
		}
	});

	const billboards = await prisma.billboard.findMany({
		where: {
			storeId: params.storeId
		}
	});

	return (
		<div className='space-y-8'>
			{/* <BillboardHeading initialData={billboards} /> */}
			<CategoryForm initialData={category} billboards={billboards} />
		</div>
	);
};

export default BillboardPage;
