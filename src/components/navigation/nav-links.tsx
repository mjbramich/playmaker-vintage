'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const NavLinks = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();

	const productRoutes = [
		{
			href: `/categories/all`,
			name: 'Shop All',
			active: pathname.includes('all')
		},
		{
			href: `/categories/t-shirts`,
			name: 'T-shirts',
			active: pathname.includes('t-shirts')
		},
		{
			href: `/categories/sweaters`,
			name: 'Sweaters',
			active: pathname.includes('sweaters')
		},
		{
			href: `/categories/jackets`,
			name: 'Jackets',
			active: pathname.includes('jackets')
		}
	];

	// const routes = data.map((route) => ({
	// 	href: `/category/${route.slug}`,
	// 	label: route.name,
	// 	active: pathname.includes(route.slug)
	// }));

	return (
		<nav className={cn('flex-2 px-6 hidden lg:flex', className)} {...props}>
			<ul className='flex items-center  space-x-4 '>
				{productRoutes.map((route) => (
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
			</ul>
		</nav>
	);
};

export default NavLinks;
