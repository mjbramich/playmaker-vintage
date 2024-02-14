'use client';

import Link from 'next/link';
import { useClerk, SignedIn, SignedOut } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface Props {
	isOpen: boolean;
}

const MobileNav = ({ isOpen }: Props) => {
	const pathname = usePathname();
	const { signOut } = useClerk();

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

	return (
		<div
			className={cn(
				'duration-700 transition-all absolute top-0 left-0 overflow-hidden  w-full ',
				isOpen ? ' translate-y-16 ' : ' -translate-y-full  pointer-events-none  '
			)}
		>
			<ul className='relative  *:block *:border-b *:px-10 *:py-4  '>
				{productRoutes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className={cn(
							' text-sm font-medium transition-colors hover:text-primary ',
							route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
						)}
					>
						{route.name}
					</Link>
				))}

				{/* user not signed in */}
				<SignedOut>
					<Link
						href='/sign-in'
						className=' text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
					>
						Sign In
					</Link>
				</SignedOut>
				{/* user signed in */}
				<SignedIn>
					<Link
						href='/admin/store'
						className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
					>
						Dashboard
					</Link>
					<Link
						href='/'
						onClick={() => signOut()}
						className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
					>
						Sign Out
					</Link>
				</SignedIn>
			</ul>
		</div>
	);
};

export default MobileNav;
