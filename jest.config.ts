import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        // Map lucide-react to the mock
        '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
    },
}


export default createJestConfig(config)