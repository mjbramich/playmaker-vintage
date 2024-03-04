'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { NavLinks as Links } from '@/types';

export interface AdminLinks {
	href: string;
	name: string;
	active: boolean;
}

interface Props {
	isAdmin: boolean;
	adminLinks: Links[];
	storeLinks: Links[];
}

const NavLinks = ({ isAdmin, adminLinks, storeLinks }: Props) => {
	const routes = isAdmin ? adminLinks : storeLinks;

	return (
		<nav className={cn('flex-2 px-6 hidden lg:flex')}>
			<ul className='flex items-center  space-x-4 '>
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className={cn(
							'text-sm font-medium transition-colors hover:text-primary capitalize',
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
