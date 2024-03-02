import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// dynamic route segments are automatically passed as the params props.
// eg: api/stores/[storeId]/billboards/[billboadId] => [storeId], [billboardId] = params

// GET SINGLE BILLBOARD
export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
	try {
		if (!params.billboardId) {
			return NextResponse.json({ error: 'Billboard not found' }, { status: 400 });
		}

		const billboard = await prisma.billboard.findUnique({
			where: {
				id: params.billboardId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// EDIT BILLBOARD
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
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

		if (!params.billboardId) {
			return NextResponse.json({ error: 'Billboard not found' }, { status: 400 });
		}

		// Update Billboard
		const billboard = await prisma.billboard.updateMany({
			where: {
				id: params.billboardId
			},
			data: {
				label,
				imageUrl
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_PATCH]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// DELETE BILLBOARD
export async function DELETE(_req: Request, { params }: { params: { billboardId: string } }) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!params.billboardId) {
			return NextResponse.json({ error: 'Billboard not found' }, { status: 400 });
		}

		// Delete Billboard
		const billboard = await prisma.billboard.delete({
			where: {
				id: params.billboardId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_DELETE]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
