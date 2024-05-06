import CardSkeleton from './card-skeleton';

const LoadingCards = () => (
	<div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-6'>
		<ul className=' mt-6 grid grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 md:grid-cols-4 lg:grid-cols-4 lg:px-0 xl:gap-x-8'>
			{[...Array(8)].map((_, index) => (
				<CardSkeleton key={index} />
			))}
		</ul>
	</div>
);

export default LoadingCards;
