import { vi, beforeEach, afterEach } from "vitest";

import crm from './wix-crm-backend.js';
import members from './wix-members-backend.js';

const packages = [crm, members];

function setupMocksForPackage(pkg) {
    const { real, mock } = pkg;
    Object.entries(real).forEach(([moduleKey, moduleValue]) => {
        Object.entries(moduleValue).forEach(([methodKey, methodValue]) => {
            if (typeof mock[moduleKey] !== 'undefined' && typeof mock[moduleKey][methodKey] === 'function') {
                vi.mocked(methodValue).mockImplementation(mock[moduleKey][methodKey]);
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
