import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    rootDir: path.resolve(import.meta.dirname, '../../'),

    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'babel-jest',
            {
                configFile: path.resolve(import.meta.dirname, '../babel.config.js'),
            },
        ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/config/jest/fileMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

export default config;
