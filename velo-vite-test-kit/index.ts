import { vi, beforeEach, afterEach } from "vitest";
import type { MockedFunction } from "vitest";

import crm from './wix-crm-backend.js';
import members from './wix-members-backend.js';

interface Module {
    [key: string]: any;
}

interface Package {
    real: Module;
    mock: Module;
}

const packages: Package[] = [crm, members];

function setupMocksForPackage(pkg: Package): void {
    const { real, mock } = pkg;
    Object.entries(real).forEach(([moduleKey, moduleValue]) => {
        Object.entries(moduleValue).forEach(([methodKey, methodValue]) => {
            if (typeof mock[moduleKey] !== 'undefined' && typeof mock[moduleKey][methodKey] === 'function') {
                const mockedFunction = vi.mocked(methodValue as unknown) as MockedFunction<any>;
                mockedFunction.mockImplementation(mock[moduleKey][methodKey]);
            }
        });
    });
}

beforeEach(() => {
    vi.resetAllMocks();
    packages.forEach(setupMocksForPackage);
});

afterEach(() => {
    vi.resetAllMocks();
});
