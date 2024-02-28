import prisma from '@/lib/prismadb';
import { format } from 'date-fns';
import { currencyFormatter } from '@/lib/utils';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import OrdersTable from '@/components/order/order-table';

const OrdersPage = async () => {
	const orders = await prisma.order.findMany({
		include: {
			orderItems: true
		},

		orderBy: {
			createdAt: 'desc'
		}
	});

	const formattedOrders = orders.map((order) => ({
		id: order.id,
		phone: order.phone,
		address: order.address,
		products: order.orderItems.map((item) => item.name),
		total: currencyFormatter.format(
			order.orderItems.reduce((total, item) => total + Number(item.price), 0)
		),
		paid: order.isPaid,
		createdAt: format(order.createdAt, 'MMMM do, yyyy')
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-8 '>
				<Heading title='Orders' description='View all orders' count={orders.length} />
				<Separator />
				<OrdersTable data={formattedOrders} />
			</div>
		</div>
	);
};

export default OrdersPage;
