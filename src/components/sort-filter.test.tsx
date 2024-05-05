import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line jest/no-mocks-import
import { AppRouterContextProviderMock } from '@/__mocks__/app-router-mock';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

import SortFilter from '@/components/sort-filter';

describe('Sort Filter', () => {
	describe('Sorting a list of items', () => {
		it('Sort button should be visible', async () => {
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<SortFilter />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			const sortButton = screen.getByRole('button', { name: 'Sort' });

			expect(sortButton).toBeInTheDocument();
		});

		it('When clicked sort button should open sort menu', async () => {
			// Arrange
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<SortFilter />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			// Act
			const sortButton = screen.getByRole('button', { name: 'Sort' });
			await user.click(sortButton);
			const sortOptions = screen.getAllByRole('menuitemradio');

			// Assert
			expect(sortOptions).toHaveLength(6);
		});

		it('Should display the correct sort options', async () => {
			// Arrange
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<SortFilter />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			// Act
			const sortButton = screen.getByRole('button', { name: 'Sort' });
			await user.click(sortButton);
			const sortOptions = screen.getAllByRole('menuitemradio');

			// Assert
			expect(sortOptions).toHaveLength(6);
			expect(sortOptions[0]).toHaveTextContent('Alphabetically, A-Z');
			expect(sortOptions[1]).toHaveTextContent('Alphabetically, Z-A');
			expect(sortOptions[2]).toHaveTextContent('Price, low-high');
			expect(sortOptions[3]).toHaveTextContent('Price, high-low');
			expect(sortOptions[4]).toHaveTextContent('Date, new-old');
			expect(sortOptions[5]).toHaveTextContent('Date, old-new');
		});

		it('Should highlight correct sort option when clicked', async () => {
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<SortFilter />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			// Act
			const sortButton = screen.getByRole('button', { name: 'Sort' });
			await user.click(sortButton);

			const sortOptions = screen.getAllByRole('menuitemradio');
			await user.click(sortOptions[2]);

			// Assert
			// waitFor is used to wait for the sortFilter state to be updated
			await waitFor(() => {
				expect(sortOptions[2]).toHaveAttribute('aria-checked', 'true');
			});
		});

		it('Should navigate to back to page 1 when a sort option is selected', async () => {
			// Arrange
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<SortFilter />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			// Act
			const sortButton = screen.getByRole('button', { name: 'Sort' });
			await user.click(sortButton);
			const sortOptions = screen.getAllByRole('menuitemradio');
			await user.click(sortOptions[3]);

			expect(push).toHaveBeenCalledWith('?page=1&sort=price-desc');
		});
	});
});
