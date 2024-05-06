import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton = () => (
	<div className='flex aspect-[4/5] flex-col items-center space-y-4'>
		<Skeleton className='h-full w-full rounded-xl' />
		<div className='space-y-2 '>
			<Skeleton className='h-7 w-[250px]' />
			<Skeleton className='mx-auto h-5 w-[200px]' />
		</div>
	</div>
);

export default CardSkeleton;
