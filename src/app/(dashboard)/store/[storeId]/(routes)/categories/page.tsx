import prisma from '@/lib/prismadb';

import Categories from '@/components/category/categories';
import CategoryTable from '@/components/category/category-table';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
	const categories = await prisma.category.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			billboard: true // populate the billboard on the category (return all billboard fields)
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-8 '>
				<Categories />
				<CategoryTable data={categories} />
			</div>
		</div>
	);
};

export default CategoriesPage;
