'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn, getPageNumbers } from '@/lib/utils';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface Props {
	currentPage: number;
	pageSize: number;
	itemCount: number;
	totalPagesToDisplay?: number;
}

const PaginationBar = ({ currentPage, pageSize, itemCount, totalPagesToDisplay = 3 }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const changePage = (p: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', p.toString());
		router.push(`?${params.toString()}`, { scroll: false });
	};

	const totalPages = Math.ceil(itemCount / pageSize);

	const renderPaginationItems = () => {
		const pageNumbers = getPageNumbers(totalPages, currentPage, totalPagesToDisplay);
		return pageNumbers.map((pageNumber) => (
			<PaginationItem key={pageNumber} className='hidden sm:flex'>
				<Button
					variant='ghost'
					onClick={() => changePage(pageNumber)}
					className={cn(pageNumber === currentPage && 'bg-accent')}
				>
					{pageNumber}
				</Button>
			</PaginationItem>
		));
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Button
						variant='ghost'
						disabled={currentPage <= 1}
						onClick={() => changePage(currentPage - 1)}
						className='group'
					>
						<ChevronLeft className='transition-all delay-150 duration-300 group-hover:-translate-x-1' />{' '}
						Previous
					</Button>
				</PaginationItem>
				{renderPaginationItems()}
				<PaginationItem>
					<Button
						variant='ghost'
						disabled={currentPage >= totalPages}
						onClick={() => changePage(currentPage + 1)}
						className='group'
					>
						Next
						<ChevronRight className='transition-all delay-150 duration-300 group-hover:translate-x-1' />{' '}
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationBar;
