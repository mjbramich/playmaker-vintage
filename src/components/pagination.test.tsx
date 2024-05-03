import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line jest/no-mocks-import
import { AppRouterContextProviderMock } from '@/__mocks__/app-router-mock';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import PaginationBar from '@/components/pagination';

// Mock the next navigation module
// jest.mock('next/navigation', () => ({
// 	__esModule: true,
// 	usePathname: () => ({
// 		pathname: ''
// 	}),
// 	useRouter: () => ({
// 		replace: jest.fn(),
// 		push: jest.fn(),
// 		prefetch: jest.fn()
// 	}),
// 	useSearchParams: () => ({
// 		get: () => {}
// 	})
// }));

describe('Pagination', () => {
	const defaultProps = {
		currentPage: 1,
		pageSize: 8,
		itemCount: 100,
		totalPagesToDisplay: 3
	};

	describe('Navigating to a new page', () => {
		it('Should display correct page numbers', async () => {
			const push = jest.fn();
			const params = new URLSearchParams({ page: '2' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<PaginationBar {...defaultProps} />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			const page1Btn = screen.getByRole('button', { name: '1' });
			const page2Btn = screen.getByRole('button', { name: '2' });
			const page3Btn = screen.getByRole('button', { name: '3' });

			expect(page1Btn).toBeInTheDocument();
			expect(page2Btn).toBeInTheDocument();
			expect(page3Btn).toBeInTheDocument();
		});

		it('Page numbers should navigate to the correct page', async () => {
			// Arrange

			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '2' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<PaginationBar {...defaultProps} />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			// Act
			const page2Btn = screen.getByRole('button', { name: '2' });
			await user.click(page2Btn);

			// Assert
			expect(page2Btn).toBeInTheDocument();
			expect(push).toHaveBeenCalledTimes(1);
			expect(push).toHaveBeenCalledWith('?page=2');
		});

		it('Previous button should navigate to the previous page', async () => {
			// Arrange

			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<PaginationBar {...defaultProps} currentPage={2} />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			const previousBtn = screen.getByRole('button', { name: 'Previous' });
			await user.click(previousBtn);

			expect(previousBtn).toBeInTheDocument();
			expect(push).toHaveBeenCalledTimes(1);
			expect(push).toHaveBeenCalledWith('?page=1');
		});

		it('Next button should navigate to the next page', async () => {
			// Arrange
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '3' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<PaginationBar {...defaultProps} currentPage={2} />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			// Act
			const nextBtn = screen.getByRole('button', { name: 'Next' });
			await user.click(nextBtn);

			// Assert
			expect(nextBtn).toBeInTheDocument();
			expect(push).toHaveBeenCalledTimes(1);
			expect(push).toHaveBeenCalledWith('?page=3');
		});

		it('Previous button should be disabled when on the first page', async () => {
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '1' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<PaginationBar {...defaultProps} />
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			const previousBtn = screen.getByRole('button', { name: 'Previous' });
			await user.click(previousBtn);

			expect(previousBtn).toBeInTheDocument();
			expect(push).not.toHaveBeenCalled();
		});

		it('Next button should be disabled when on the last page', async () => {
			const user = userEvent.setup();
			const push = jest.fn();
			const params = new URLSearchParams({ page: '14' });

			render(
				<SearchParamsContext.Provider value={params}>
					<AppRouterContextProviderMock router={{ push }}>
						<PaginationBar {...defaultProps} currentPage={13} />
						{/* 13 is the last page */}
					</AppRouterContextProviderMock>
				</SearchParamsContext.Provider>
			);

			const nextBtn = screen.getByRole('button', { name: 'Next' });
			await user.click(nextBtn);

			expect(nextBtn).toBeInTheDocument();
			expect(push).not.toHaveBeenCalled();
		});
	});
});
