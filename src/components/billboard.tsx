import Image from 'next/image';

import { Billboard as BillboardType } from '@/types';

interface Props {
	data: BillboardType | null;
}
const Billboard = ({ data }: Props) => {
	const image = data?.imageUrl || '';
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
				<div className='relative overflow-hidden rounded-lg'>
					<div className='absolute inset-0 '>
						<Image
							src={image}
							alt='Billboard background image'
							className='h-full w-full object-cover object-center'
							fill
						/>
					</div>
					<div aria-hidden='true' className='absolute inset-0 bg-gray-900/75 ' />

					<div className='relative px-6 py-28 sm:px-8 sm:py-44 lg:px-16'>
						<div className='relative mx-auto flex max-w-4xl flex-col items-center text-center'>
							<h2 className='text-4xl font-bold uppercase tracking-tight text-white  sm:text-5xl lg:text-6xl'>
								{data?.label}
							</h2>
							<p className='mt-4 text-xl uppercase text-white'>
								Vintage Clothing Reseller | EST 2021
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Billboard;
