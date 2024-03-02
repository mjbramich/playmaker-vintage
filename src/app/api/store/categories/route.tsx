import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';

// eg: api/store/categories

// CREATE NEW CATEGORY
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

		const category = await prisma.category.create({
			data: {
				name,
				billboardId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORIES_POST]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// GET ALL CATEGORIES FOR CURRENT STORE
export async function GET() {
	try {
		const categories = await prisma.category.findMany();

		return NextResponse.json(categories);
	} catch (error) {
		console.log('[CATEGORIES_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
