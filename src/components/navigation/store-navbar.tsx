'use client';

import { Menu, X } from 'lucide-react';

import useMobileMenuStore from '@/stores/mobile-menu';
import Container from '@/components/container';
import NavLinks from '@/components/navigation/nav-links';
import NavActions from '@/components/navigation/nav-actions';
import MobileNav from '@/components/navigation/mobile-nav';
import { Button } from '@/components/ui/button';

const Navbar = () => {
	const { isOpen, toggleMenu } = useMobileMenuStore();

	return (
		<nav className='relative border-b bg-white '>
			<Container>
				<div className='relative z-20 flex h-16 items-center bg-white px-4 lg:justify-between  '>
					<p className=' text-xl font-bold  '>Playmaker Vintage</p>
					<NavLinks />

					<div className='ml-auto flex items-center gap-4 lg:ml-0'>
						<NavActions />
						<Button className='p-0 lg:hidden' variant='ghost' onClick={toggleMenu}>
							{isOpen ? <X /> : <Menu />}
						</Button>
					</div>
				</div>
				<MobileNav isOpen={isOpen} />
			</Container>
		</nav>
	);
};

export default Navbar;
