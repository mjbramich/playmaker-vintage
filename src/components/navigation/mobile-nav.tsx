'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk, SignedIn, SignedOut } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { NavLinks } from '@/types';

interface Props {
	isOpen: boolean;
	isAdmin: boolean;
	adminLinks: NavLinks[];
	storeLinks: NavLinks[];
}

const MobileNav = ({ isOpen, isAdmin, adminLinks, storeLinks }: Props) => {
	const pathname = usePathname();
	const { signOut } = useClerk();

	const routes = pathname.includes('admin') ? adminLinks : storeLinks;

	return (
		<div
			className={cn(
				'duration-700 transition-all absolute top-0 left-0 overflow-hidden  w-full ',
				isOpen ? ' translate-y-16 ' : ' -translate-y-full  pointer-events-none  '
			)}
		>
			<ul className='relative  *:block *:border-b *:px-10 *:py-4  '>
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className={cn(
							' text-sm font-medium transition-colors hover:text-primary capitalize',
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
					{isAdmin ? (
						<Link
							href='/'
							className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
						>
							Storefront
						</Link>
					) : (
						<Link
							href='/admin'
							className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
						>
							Dashboard
						</Link>
					)}
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
