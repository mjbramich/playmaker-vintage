import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// dynamic route segments are automatically passed as the params props.
// eg: api/store/collections/[collectionId] =>  [collectionId] = params

// GET SINGLE collection
export async function GET(req: Request, { params }: { params: { collectionId: string } }) {
	try {
		if (!params.collectionId) {
			return NextResponse.json({ error: 'collection not found' }, { status: 400 });
		}

		const collection = await prisma.collection.findUnique({
			where: {
				id: params.collectionId
			}
		});

		return NextResponse.json(collection);
	} catch (error) {
		console.log('[collection_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// EDIT collection
export async function PATCH(req: Request, { params }: { params: { collectionId: string } }) {
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

		if (!params.collectionId) {
			return NextResponse.json({ error: 'collection not found' }, { status: 400 });
		}

		// Update collection
		const collection = await prisma.collection.updateMany({
			where: {
				id: params.collectionId
			},
			data: {
				name,
				billboardId
			}
		});

		return NextResponse.json(collection);
	} catch (error) {
		console.log('[collection_PATCH]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// DELETE collection
export async function DELETE(_req: Request, { params }: { params: { collectionId: string } }) {
	try {
		const { userId } = auth();
		console.log(params.collectionId);

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!params.collectionId) {
			return NextResponse.json({ error: 'collection not found' }, { status: 400 });
		}

		// Delete collection
		const collection = await prisma.collection.delete({
			where: {
				id: params.collectionId
			}
		});
		console.log(collection);

		return NextResponse.json(collection);
	} catch (error) {
		console.log('[collection_DELETE]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
