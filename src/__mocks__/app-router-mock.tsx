// https://github.com/vercel/next.js/discussions/48937

// Need to provide a mock implementation for the next/navigation router because the actual router is not available in the test environment.

// React-testing-library only renders the component, doesn't have access to all the NextJs contexts

// Testing server components
// https://stackoverflow.com/questions/75729282/testing-an-async-server-component-with-jest-in-next-13

import {
	AppRouterContext,
	AppRouterInstance
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';

export type AppRouterContextProviderMockProps = {
	router: Partial<AppRouterInstance>;
	children: React.ReactNode;
};

export const AppRouterContextProviderMock = ({
	router,
	children
}: AppRouterContextProviderMockProps): React.ReactNode => {
	const mockedRouter: AppRouterInstance = {
		back: jest.fn(),
		forward: jest.fn(),
		push: jest.fn(),
		replace: jest.fn(),
		refresh: jest.fn(),
		prefetch: jest.fn(),
		...router
	};
	return <AppRouterContext.Provider value={mockedRouter}>{children}</AppRouterContext.Provider>;
};
