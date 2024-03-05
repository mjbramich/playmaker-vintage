'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

import useStore from '@/hooks/useStore';
import useCartStore from '@/stores/cart';
import { Button } from '@/components/ui/button';

interface Props {
	isAdmin: boolean;
}

const NavActions = ({ isAdmin }: Props) => {
	const router = useRouter();
	const products = useStore(useCartStore, (state) => state.items);

	return (
		<div className='flex items-center justify-end space-x-4 lg:w-[210px] lg:space-x-6'>
			{/* user not signed in */}
			<div className='hidden gap-4 lg:flex lg:items-center '>
				<SignedOut>
					<Link
						href='/sign-in'
						className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
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

					<UserButton afterSignOutUrl='/' />
				</SignedIn>
			</div>
			{!isAdmin && (
				<Button
					onClick={() => router.push('/cart')}
					variant='ghost'
					className='flex items-center p-0'
				>
					<ShoppingCart size={20} color='black' />
					<span className='ml-2 text-sm font-medium'>{products?.length}</span>
				</Button>
			)}
		</div>
	);
};

export default NavActions;
