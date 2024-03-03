import prisma from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// dynamic route segments are automatically passed as the params props.
// eg: api/store/orders/[orderId] =>  [orderId] = params

export async function DELETE(_req: Request, { params }: { params: { orderId: string } }) {
	try {
		const { userId } = auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
		}

		if (!params.orderId) {
			return NextResponse.json({ error: 'Order not found' }, { status: 400 });
		}

		// Delete collection
		const order = await prisma.order.delete({
			where: {
				id: params.orderId
			}
		});

		return NextResponse.json(order, { status: 200 });
	} catch (error) {
		console.log('[ORDER_DELETE]', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
