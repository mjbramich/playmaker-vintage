import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';

// eg: api/store/collections

// CREATE NEW collection
export async function POST(req: Request) {
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

		const collection = await prisma.collection.create({
			data: {
				name,
				billboardId
			}
		});

		return NextResponse.json(collection);
	} catch (error) {
		console.log('[collections_POST]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// GET ALL collections FOR CURRENT STORE
export async function GET() {
	try {
		const collections = await prisma.collection.findMany();

		return NextResponse.json(collections);
	} catch (error) {
		console.log('[collections_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
