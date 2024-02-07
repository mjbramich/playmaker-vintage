import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';

// eg: api/stores/[storeId]/products=> [storeId] = params

// CREATE NEW CATEGORY
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name, size, price, images, categoryId } = body;
		console.log('images:', images);
		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!name) {
			return NextResponse.json({ error: 'Name is required' }, { status: 400 });
		}

		if (!size) {
			return NextResponse.json({ error: 'Size is required' }, { status: 400 });
		}

		if (!price) {
			return NextResponse.json({ error: 'Price is required' }, { status: 400 });
		}

		if (!images.length || !images) {
			return NextResponse.json({ error: 'Image is required' }, { status: 400 });
		}

		if (!categoryId) {
			return NextResponse.json({ error: 'Category is required' }, { status: 400 });
		}

		// Check to make sure user has access to store
		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
		}

		const product = await prisma.product.create({
			data: {
				name,
				size,
				price,
				categoryId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: images
					}
				}
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCTS_POST]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
