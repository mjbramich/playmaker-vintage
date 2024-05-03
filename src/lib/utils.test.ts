import { validateSortInput, getPageNumbers } from '@/lib/utils';

// Triple A structure

// Arrange

// Act

// Assert

describe('Utilities - validateSortInput', () => {
	describe('Default sorting behaviour', () => {
		it('When query is undefined, it should default to sort by name in ascending order', () => {
			const query = undefined;

			const validation = validateSortInput(query);

			expect(validation.sortField).toEqual('name');
			expect(validation.sortValue).toEqual('asc');
		});

		it('When query is invalid, it should default to sort by name in ascending order', () => {
			const query = 'Invalid';

			const validation = validateSortInput(query);

			expect(validation.sortField).toEqual('name');
			expect(validation.sortValue).toEqual('asc');
		});

		it('When query field is invalid but sort value is valid it should default to sort by name in ascending order', () => {
			const query = 'invalidField-asc';

			const validation = validateSortInput(query);

			expect(validation.sortField).toEqual('name');
			expect(validation.sortValue).toEqual('asc');
		});

		it('When query field is valid but sort value is invalid it should default to sort by name in ascending order', () => {
			const query = 'name-invalid';

			const validation = validateSortInput(query);

			expect(validation.sortField).toEqual('name');
			expect(validation.sortValue).toEqual('asc');
		});
	});

	describe('Correct sorting behaviour', () => {
		it('When query is valid and specifies ascending, it should sort in ascending order', () => {
			const inputQuery = 'price-asc';

			const validation = validateSortInput(inputQuery);

			expect(validation.sortField).toEqual('price');
			expect(validation.sortValue).toEqual('asc');
		});

		it('When query is valid and specifies descending, it should sort in descending order', () => {
			const inputQuery = 'price-desc';

			const validation = validateSortInput(inputQuery);

			expect(validation.sortField).toEqual('price');
			expect(validation.sortValue).toEqual('desc');
		});
	});

	describe('Utilities - getPageNumbers', () => {
		describe('Generate Pagination Numbers', () => {
			it('should return all page numbers when total pages is less than or equal to total pages to display', () => {
				// Arrange
				const totalPages = 3;
				const currentPage = 2;
				const totalPagesToDisplay = 5;
				// Act
				const pageNumbers = getPageNumbers(totalPages, currentPage, totalPagesToDisplay);
				// Assert
				expect(pageNumbers).toEqual([1, 2, 3]);
			});

			it('should return page numbers centered around the current page when total pages is greater than total pages to display', () => {
				const totalPages = 10;
				const currentPage = 5;
				const totalPagesToDisplay = 5;

				const pageNumbers = getPageNumbers(totalPages, currentPage, totalPagesToDisplay);

				expect(pageNumbers).toEqual([3, 4, 5, 6, 7]);
			});

			it('should return page numbers starting from the beginning when current page is at the beginning', () => {
				const totalPages = 10;
				const currentPage = 1;
				const totalPagesToDisplay = 5;

				const pageNumbers = getPageNumbers(totalPages, currentPage, totalPagesToDisplay);

				expect(pageNumbers).toEqual([1, 2, 3, 4, 5]);
			});

			it('should return page numbers ending at the end when current page is at the end', () => {
				const totalPages = 10;
				const currentPage = 10;
				const totalPagesToDisplay = 5;

				const pageNumbers = getPageNumbers(totalPages, currentPage, totalPagesToDisplay);

				expect(pageNumbers).toEqual([6, 7, 8, 9, 10]);
			});

			it('should return single page number when total pages is 1', () => {
				const totalPages = 1;
				const currentPage = 1;
				const totalPagesToDisplay = 5;

				const pageNumbers = getPageNumbers(totalPages, currentPage, totalPagesToDisplay);

				expect(pageNumbers).toEqual([1]);
			});
		});
	});
});
