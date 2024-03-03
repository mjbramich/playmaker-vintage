'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Collection } from '@/types';

interface Props {
	data: Collection[];
}

const NavLinks = ({ data }: Props) => {
	const pathname = usePathname();

	// const productRoutes = [
	// 	{
	// 		href: `/collections/all`,
	// 		name: 'Shop All',
	// 		active: pathname.includes('all')
	// 	},
	// 	{
	// 		href: `/collections/t-shirts`,
	// 		name: 'T-shirts',
	// 		active: pathname.includes('t-shirts')
	// 	},
	// 	{
	// 		href: `/collections/sweaters`,
	// 		name: 'Sweaters',
	// 		active: pathname.includes('sweaters')
	// 	},
	// 	{
	// 		href: `/collections/jackets`,
	// 		name: 'Jackets',
	// 		active: pathname.includes('jackets')
	// 	}
	// ];

	const routes = data.map((route) => ({
		href: `/collection/${route.name}`,
		name: route.name,
		active: pathname.includes(route.name)
	}));

	return (
		<nav className={cn('flex-2 px-6 hidden lg:flex')}>
			<ul className='flex items-center  space-x-4 '>
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
			</ul>
		</nav>
	);
};

export default NavLinks;
