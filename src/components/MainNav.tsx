'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();

	const routes = [
		{
			href: `/admin`,
			name: 'Dashboard',
			active: pathname === `/admin`
		},
		{
			href: `/admin/billboards`,
			name: 'Billboards',
			active: pathname.includes('billboards')
		},
		{
			href: `/admin/collections`,
			name: 'collections',
			active: pathname.includes('collections')
		},
		{
			href: `/admin/products`,
			name: 'Products',
			active: pathname.includes('products')
		},
		{
			href: `/admin/orders`,
			name: 'Orders',
			active: pathname.includes('orders')
		},
		{
			href: `/admin/settings`,
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
