import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// dynamic route segments are automatically passed as the params props.
// eg: api/stores/[storeId]/products/[productId] => [storeId], [productId] = params

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
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { name, size, price, images, categoryId } = body;

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

		// Update Product
		const product = await prisma.product.update({
			where: {
				id: params.productId
			},
			data: {
				name,
				size,
				price,
				categoryId,
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

// DELETE CATEGORY
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!params.productId) {
			return NextResponse.json({ error: 'Product not dound' }, { status: 400 });
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

		// Delete Category
		const product = await prisma.product.delete({
			where: {
				id: params.productId
			},
			include: {
				images: true
			}
		});

		console.log(product);

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
