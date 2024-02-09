import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';

// eg: api/stores/[storeId]/categoires => [storeId] = params

// CREATE NEW CATEGORY
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
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

		if (!params.storeId) {
			return NextResponse.json({ error: 'No store found' }, { status: 400 });
		}

		// Check to make sure user has access to store
		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
		}

		const category = await prisma.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORIES_POST]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// GET ALL CATEGORIES FOR CURRENT STORE
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
	try {
		if (!params.storeId) {
			return NextResponse.json({ error: 'No store found' }, { status: 400 });
		}

		const categories = await prisma.category.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.log('[CATEGORIES_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
