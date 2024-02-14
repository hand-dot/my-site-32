import { vi, afterEach } from "vitest";

import './wix-crm-backend';
import './wix-members-backend';

afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
});