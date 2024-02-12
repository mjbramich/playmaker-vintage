'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname, useParams } from 'next/navigation';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/admin/store/${params.storeId}`,
			name: 'Dashboard',
			active: pathname === `/store/${params.storeId}`
		},
		{
			href: `/admin/store/${params.storeId}/billboards`,
			name: 'Billboards',
			active: pathname.includes('billboards')
		},
		{
			href: `/admin/store/${params.storeId}/categories`,
			name: 'Categories',
			active: pathname.includes('categories')
		},
		{
			href: `/admin/store/${params.storeId}/products`,
			name: 'Products',
			active: pathname.includes('products')
		},
		{
			href: `/admin/store/${params.storeId}/orders`,
			name: 'Orders',
			active: pathname.includes('orders')
		},
		{
			href: `/admin/store/${params.storeId}/settings`,
			name: 'Settings',
			active: pathname.includes('settings')
		}
	];
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
					)}
				>
					{route.name}
				</Link>
			))}
		</nav>
	);
};

export default MainNav;
