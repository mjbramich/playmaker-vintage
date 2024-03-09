import { validateSortInput } from '@/lib/utils';

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
});
