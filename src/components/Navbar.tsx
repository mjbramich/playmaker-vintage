import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prismadb';
import MainNav from '@/components/MainNav';
import StoreSelect from '@/components/StoreSelect';
import Container from './container';

const Navbar = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect('/sign-in');
	}

	const stores = await prisma.store.findMany({
		where: {
			userId
		}
	});
	return (
		<nav className='border-b'>
			<Container>
				<div className='flex h-16 items-center px-4'>
					<StoreSelect stores={stores} />
					<MainNav className='mx-6' />
					<div className='ml-auto flex items-center gap-4'>
						<UserButton afterSignOutUrl='/' />
					</div>
				</div>
			</Container>
		</nav>
	);
};

export default Navbar;
