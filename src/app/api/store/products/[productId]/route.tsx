import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// dynamic route segments are automatically passed as the params props.
// eg: api/store/products/[productId] => [productId] = params

// GET SINGLE PRODUCT

export async function GET(req: Request, { params }: { params: { productId: string } }) {
	try {
		if (!params.productId) {
			return NextResponse.json({ error: 'Could not find product' }, { status: 400 });
		}

		const product = await prisma.product.findUnique({
			where: {
				id: params.productId
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// EDIT PRODUCT
export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name, size, price, images, collectionId, description, featured, archived } = body;

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

		if (!collectionId) {
			return NextResponse.json({ error: 'collection is required' }, { status: 400 });
		}

		if (!description) {
			return NextResponse.json({ error: 'Description is required' }, { status: 400 });
		}

		// Update Product
		const product = await prisma.product.update({
			where: {
				id: params.productId
			},
			data: {
				name,
				size,
				price,
				collectionId,
				description,
				featured,
				archived,
				images: {
					deleteMany: {},
					createMany: {
						data: images
					}
				}
			}
		});
		console.log(product);

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_PATCH]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// DELETE collection
export async function DELETE(_req: Request, { params }: { params: { productId: string } }) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!params.productId) {
			return NextResponse.json({ error: 'Product not found' }, { status: 400 });
		}

		// Delete collection
		const product = await prisma.product.delete({
			where: {
				id: params.productId
			}

			// NOT NEEDED Only Populates query with images
			// include: {
			// 	images: true
			// } /
		});
		console.log(product);

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
