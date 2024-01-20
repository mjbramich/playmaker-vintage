'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname, useParams } from 'next/navigation';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/store/${params.storeId}`,
			name: 'Dashboard',
			active: pathname === `/store/${params.storeId}`
		},
		{
			href: `/store/${params.storeId}/settings`,
			name: 'Settings',
			active: pathname === `/store/${params.storeId}/settings`
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
						route.active ? 'text-black dark:text-white' : 'text-muted'
					)}
				>
					{route.name}
				</Link>
			))}
		</nav>
	);
};

export default MainNav;
