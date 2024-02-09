import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';

// eg: api/stores/[storeId]/billboards => [storeId] = params

// CREATE NEW BILLBOARD
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { label, imageUrl } = body;

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!label) {
			return NextResponse.json({ error: 'Label is required' }, { status: 400 });
		}

		if (!imageUrl) {
			return NextResponse.json({ error: 'Image is required' }, { status: 400 });
		}

		if (!params.storeId) {
			return NextResponse.json({ error: 'Store not found' }, { status: 400 });
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

		const billboard = await prisma.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARDS_POST]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// GET ALL BILLBOARDS FOR CURRENT STORE
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
	console.log('Hello');

	try {
		if (!params.storeId) {
			return NextResponse.json({ error: 'Store not found' }, { status: 400 });
		}

		const billboards = await prisma.billboard.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboards);
	} catch (error) {
		console.log('[BILLBOARDS_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
