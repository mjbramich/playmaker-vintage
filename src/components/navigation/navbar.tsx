'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import { Collection } from '@/types';
import useMobileMenuStore from '@/stores/mobile-menu';
import Container from '@/components/container';
import NavLinks from '@/components/navigation/nav-links';
import NavActions from '@/components/navigation/nav-actions';
import MobileNav from '@/components/navigation/mobile-nav';
import { Button } from '@/components/ui/button';

interface Props {
	collections?: Collection[];
}

const Navbar = ({ collections }: Props) => {
	const { isOpen, toggleMenu } = useMobileMenuStore();
	const pathname = usePathname();
	const isAdmin = pathname.includes('admin');

	const adminRoutes = [
		{
			href: `/admin`,
			name: 'Dashboard',
			active: pathname === '/admin'
		},
		{
			href: `/admin/billboards`,
			name: 'Billboards',
			active: pathname.includes('billboards')
		},
		{
			href: `/admin/collections`,
			name: 'Collections',
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
		}
	];

	const storeRoutes = [
		{ href: '/collections/all', name: 'shop all', active: pathname.includes('all') },
		...(collections
			? collections.map((collection) => ({
					href: `/collection/${collection.name}`,
					name: collection.name,
					active: pathname.includes(collection.name)
				}))
			: [])
	];

	return (
		<nav className='relative border-b bg-white '>
			<Container>
				<div className='relative z-20 flex h-16 items-center bg-white px-4 lg:justify-between  '>
					<Image
						src='/playmaker-name-small.png'
						height={120}
						width={200}
						alt='Playmaker vintage script'
					/>
					<NavLinks isAdmin={isAdmin} adminLinks={adminRoutes} storeLinks={storeRoutes} />

					<div className='ml-auto flex items-center gap-4 lg:ml-0'>
						<NavActions isAdmin={isAdmin} />
						<Button className='p-0 lg:hidden' variant='ghost' onClick={toggleMenu}>
							{isOpen ? <X /> : <Menu />}
						</Button>
					</div>
				</div>
				<MobileNav
					isOpen={isOpen}
					isAdmin={isAdmin}
					adminLinks={adminRoutes}
					storeLinks={storeRoutes}
				/>
			</Container>
		</nav>
	);
};

export default Navbar;
