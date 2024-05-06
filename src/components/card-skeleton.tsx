import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton = () => (
	<div className='flex aspect-[4/5] flex-col items-center space-y-2 sm:space-y-4'>
		<Skeleton className='h-full w-full rounded-xl' />
		<div className=' w-full space-y-1 sm:space-y-2'>
			<Skeleton className='mx-auto h-6 w-5/6 sm:h-7' />
			<Skeleton className='mx-auto h-4 w-3/4 sm:h-5' />
		</div>
	</div>
);

export default CardSkeleton;
