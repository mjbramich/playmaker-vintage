import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import MainNav from '@/components/MainNav';
import Container from './container';

const Navbar = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect('/sign-in');
	}

	return (
		<nav className='border-b'>
			<Container>
				<div className='flex h-16 items-center px-4'>
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
