import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// dynamic route segments are automatically passed as the params props.
// eg: api/stores/[storeId]/categories/[categoryId] => [storeId], [categoryId] = params

// GET SINGLE CATEGORY
export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
	try {
		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		const category = await prisma.category.findUnique({
			where: {
				id: params.categoryId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// EDIT CATEGORY
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, billboardId } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: 401
			});
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!billboardId) {
			return new NextResponse('Image is required', { status: 400 });
		}

		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		// Check to make sure user has access to store
		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
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
		return new NextResponse('Internal Server Error', { status: 500 });
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
			return new NextResponse('Unauthenticated', {
				status: 401
			});
		}

		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		// Check to make sure user has access to store
		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		// Delete Category
		const category = await prisma.category.deleteMany({
			where: {
				id: params.categoryId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
