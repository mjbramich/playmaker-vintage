import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat('en-AU', {
	style: 'currency',
	currency: 'AUD'
});

export const validateSortInput = (sortQuery: string | undefined) => {
	const allowedSortFields = ['name', 'price', 'createdAt'];
	const defaultSortField = 'name';

	if (!sortQuery) {
		return { sortField: defaultSortField, sortValue: 'asc' }; // Set default values if no sort query is provided
	}

	const [receivedSortField, receivedSortValue] = sortQuery.split('-');

	if (
		allowedSortFields.includes(receivedSortField) &&
		(receivedSortValue === 'asc' || receivedSortValue === 'desc')
	) {
		return { sortField: receivedSortField, sortValue: receivedSortValue };
	}
	return { sortField: defaultSortField, sortValue: 'asc' };
};

export const getPageNumbers = (
	totalPages: number,
	currentPage: number,
	totalPagesToDisplay: number
) => {
	if (totalPages <= totalPagesToDisplay) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}
	const half = Math.floor(totalPagesToDisplay / 2); // 2
	// To ensure that the current page is always in the middle
	let start = currentPage - half;
	let end = currentPage + half;
	// If the current page is near the start
	if (start < 1) {
		start = 1;
		end = totalPagesToDisplay;
	}
	// If the current page is near the end
	if (end > totalPages) {
		start = totalPages - totalPagesToDisplay + 1;
		end = totalPages;
	}
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);

	// TODO ADD ELLIPSIS IN MIDDLE
};
