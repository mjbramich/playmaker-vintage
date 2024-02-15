import Image from 'next/image';
import Link from 'next/link';

import hero from '@public/hero.jpg';

const Hero = () => (
	<div className='relative bg-gray-900'>
		<div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
			<Image
				src={hero}
				alt='People having fun playing basketball'
				className='h-full w-full object-cover object-center'
				fill
				// eslint-disable-next-line react/jsx-boolean-value
				priority={true}
				placeholder='blur'
			/>
		</div>
		<div aria-hidden='true' className='absolute inset-0 bg-gray-900/50' />
		<div className='relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center sm:py-72 lg:px-0'>
			<h1 className=' text-4xl font-bold uppercase tracking-tight text-white lg:text-6xl'>
				For those who make plays
			</h1>
			<p className='mt-4 text-xl text-white'>
				Elevate your style game and become a{' '}
				<span className='font-semibold uppercase'>playmaker</span> with our latest vintage arrivals
				straight from the US.
			</p>
			{/* TODO Change href */}
			<Link
				href='/'
				className='mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100'
			>
				Shop All Collections
			</Link>
		</div>
	</div>
);

export default Hero;
