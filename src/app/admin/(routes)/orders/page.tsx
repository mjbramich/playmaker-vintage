import prisma from '@/lib/prismadb';
import { format } from 'date-fns';

import { currencyFormatter } from '@/lib/utils';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import OrdersTable from '@/components/order/order-table';

const OrdersPage = async () => {
	const orders = await prisma.order.findMany({
		include: {
			orderItems: {
				include: {
					collection: true
				}
			}
		},

		orderBy: {
			createdAt: 'desc'
		}
	});

	const formattedOrders = orders.map((order) => ({
		...order,
		orderItems: order.orderItems.map(({ id, name, collection }) => ({
			id,
			name,
			collection: collection.name
		})),
		total: currencyFormatter.format(
			order.orderItems.reduce((total, item) => total + Number(item.price), 0)
		),
		createdAt: format(order.createdAt, 'MMM do, yyyy')
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
