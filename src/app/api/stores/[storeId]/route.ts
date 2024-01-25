import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// dynamic route segments are automatically passed as the params props.
// eg: api/stores/[storeId] => [storeId] = params

// EDIT STORE
export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();
		const body = await req.json();
		console.log(body);

		const { name } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: 401
			});
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Update Store
		const store = await prisma.store.updateMany({
			where: {
				id: params.storeId,
				userId
			},
			data: {
				name
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORE_PATCH]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

// DELETE STORE
export async function DELETE(_req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', {
				status: 401
			});
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Update Store
		const store = await prisma.store.deleteMany({
			where: {
				id: params.storeId,
				userId
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORE_DELETE]', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
