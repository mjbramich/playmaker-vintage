import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// dynamic route segments are automatically passed as the params props.
// eg: api/store/categories/[categoryId] =>  [categoryId] = params

// GET SINGLE CATEGORY
export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
	try {
		if (!params.categoryId) {
			return NextResponse.json({ error: 'Category not found' }, { status: 400 });
		}

		const category = await prisma.category.findUnique({
			where: {
				id: params.categoryId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// EDIT CATEGORY
export async function PATCH(req: Request, { params }: { params: { categoryId: string } }) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, billboardId } = body;

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!name) {
			return NextResponse.json({ error: 'Name is required' }, { status: 400 });
		}

		if (!billboardId) {
			return NextResponse.json({ error: 'Billboard is required' }, { status: 400 });
		}

		if (!params.categoryId) {
			return NextResponse.json({ error: 'Category not found' }, { status: 400 });
		}

		// Update Category
		const category = await prisma.category.updateMany({
			where: {
				id: params.categoryId
			},
			data: {
				name,
				billboardId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_PATCH]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// DELETE CATEGORY
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!params.categoryId) {
			return NextResponse.json({ error: 'Category not found' }, { status: 400 });
		}

		// Delete Category
		const category = await prisma.category.delete({
			where: {
				id: params.categoryId
			}
		});
		console.log(category);

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
