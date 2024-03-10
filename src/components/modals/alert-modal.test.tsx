import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AlertModal from '@/components/modals/alert-modal';

describe('Alert modal', () => {
	const handleMock = jest.fn();
	const confirmMock = jest.fn();

	const defaultProps = {
		title: 'test alert modal',
		desc: 'body of alert modal',
		isOpen: true,
		setIsOpen: handleMock,
		onConfirm: confirmMock,
		loading: false
	};

	describe('Open state', () => {
		it('modal should display title', async () => {
			// Arrange
			render(<AlertModal {...defaultProps} />);

			// Act
			const modal = screen.getByRole('alertdialog', { name: 'test alert modal' });

			// Assert
			expect(modal).toHaveTextContent('test alert modal');
		});

		it('modal should display description', async () => {
			render(<AlertModal {...defaultProps} />);

			const modal = screen.getByRole('alertdialog', { name: 'test alert modal' });

			expect(modal).toHaveTextContent('body of alert modal');
		});

		it('modal can be closed using cancel button', async () => {
			const user = userEvent.setup();

			render(<AlertModal {...defaultProps} />);

			await user.click(screen.getByText('Cancel'));

			expect(handleMock).toHaveBeenCalledTimes(1);
		});

		it('modal action can be performed using confirm button', async () => {
			const user = userEvent.setup();

			render(<AlertModal {...defaultProps} />);

			await user.click(screen.getByText('Are you sure?'));

			expect(confirmMock).toHaveBeenCalledTimes(1);
		});

		it('modal confirm button should be disabled when loading', async () => {
			const user = userEvent.setup();

			// eslint-disable-next-line react/jsx-boolean-value
			render(<AlertModal {...defaultProps} loading={true} />);

			await user.click(screen.getByText('Are you sure?'));

			expect(screen.getByText('Are you sure?')).toBeDisabled();
		});
	});

	describe('Closed State', () => {
		it('modal should not be displayed', async () => {
			render(<AlertModal {...defaultProps} isOpen={false} />);

			const modal = screen.queryByRole('alertdialog', { name: 'test alert modal' });

			expect(modal).not.toBeInTheDocument();
		});
	});
});
