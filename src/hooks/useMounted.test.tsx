import { renderHook } from '@testing-library/react';
import useMounted from './useMounted';

describe('useMounted Hook', () => {
	describe('Component Mounting and Unmounting', () => {
		it('After mounting it should return true', () => {
			const { result } = renderHook(() => useMounted());

			expect(result.current()).toBe(true);
		});

		it('After unmounting it should return false', () => {
			const { result, unmount } = renderHook(() => useMounted());

			expect(result.current()).toBe(true);

			unmount(); // Unmount the component

			expect(result.current()).toBe(false);
		});

		it('After remounting it should return true', () => {
			const { result, rerender } = renderHook(() => useMounted());

			// Rerender component
			rerender({});

			expect(result.current()).toBe(true);
		});
	});
});
