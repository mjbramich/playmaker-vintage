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
