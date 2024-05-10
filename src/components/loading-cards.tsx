import CardSkeleton from './card-skeleton';

const LoadingCards = () => (
	<ul className=' mt-6 grid grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 md:grid-cols-4 lg:grid-cols-4 lg:px-0 xl:gap-x-8'>
		{[...Array(8)].map((_, index) => (
			<CardSkeleton key={index} />
		))}
	</ul>
);

export default LoadingCards;
