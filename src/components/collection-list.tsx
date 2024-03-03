import { collection } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	data: collection[];
}

const CollectionList = ({ data }: Props) => (
	<div className='bg-white pt-8 sm:pt-16 lg:mx-auto lg:max-w-7xl lg:px-6 '>
		<div className='flex items-center justify-center px-4 sm:justify-between sm:px-6 lg:px-0'>
			<h2 className='text-2xl font-bold uppercase text-primary '>Shop By Collection</h2>
		</div>

		<ul className=' mt-6 grid grid-cols-1 gap-x-6 gap-y-10  px-20 sm:grid-cols-3 sm:px-6 lg:px-0 xl:gap-x-8'>
			{/* eslint-disable-next-line */}
			{data.map((collection) => (
				<div key={collection.name} className='group relative cursor-pointer space-y-4 '>
					<div className='relative aspect-[4/5] overflow-hidden rounded-xl py-6'>
						<Image
							src='https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg'
							alt='hi'
							className='h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 '
							fill
						/>
					</div>
					<div className=' text-center'>
						<Link href={`/collections/${collection.name}`} className='absolute inset-0' />
						<h3 className='text-lg font-medium capitalize text-gray-900'>{collection.name}</h3>
					</div>
				</div>
			))}
		</ul>
	</div>
);

export default CollectionList;
