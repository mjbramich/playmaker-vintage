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
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		if (!label) {
			return new NextResponse('Label is required', { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse('Image is required', { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse('Stored id is required', { status: 400 });
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

		const billboard = await prisma.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[Billboards_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// GET ALL BILLBOARDS FOR CURRENT STORE
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
	console.log('Hello');

	try {
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const billboards = await prisma.billboard.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboards);
	} catch (error) {
		console.log('[BILLBOARDS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
