// const navigation = [
// 	{ name: 'Shipping', href: '#' },
// 	{ name: 'Returns', href: '#' }
// ];

const Footer = () => (
		<footer className='bg-white'>
			<div className='mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8'>
				{/* <nav
					className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12'
					aria-label='Footer'
				>
					{navigation.map((item) => (
						<div key={item.name} className='pb-6'>
							<a href={item.href} className='text-sm leading-6 text-gray-600 hover:text-gray-900'>
								{item.name}
							</a>
						</div>
					))}
				</nav> */}

				<p className='mt-10 text-center text-xs leading-5 text-gray-500'>
					&copy; {new Date().getFullYear()} Playmaker Vintage, Inc. All rights reserved.
				</p>
			</div>
		</footer>
	);

export default Footer;
