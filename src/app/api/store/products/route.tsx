import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';

// eg: api/stores/products

// CREATE NEW CATEGORY
export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name, size, price, images, categoryId, description } = body;
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

		if (!description) {
			return NextResponse.json({ error: 'Description is required' }, { status: 400 });
		}

		const product = await prisma.product.create({
			data: {
				name,
				size,
				price,
				categoryId,
				description,
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
