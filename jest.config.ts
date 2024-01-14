import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './'
});

// Add any custom config to be passed to Jest
const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		// Handle module aliases
		'^/(.*)$': '<rootDir>/src/$1',
		'^@/components/(.*)$': '<rootDir>/src/components/$1'
	},
	// collectCoverage: true, output coverage on every test
	collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
