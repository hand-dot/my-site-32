import { vi } from "vitest";
import { triggeredEmails } from 'wix-crm-backend';

vi.mock("wix-crm-backend", () => ({
    __esModule: true,
    default: {},
    /** @type {import("wix-crm-backend").TriggeredEmails} */
    triggeredEmails: {
        emailMember: vi.fn(),
        emailContact: vi.fn(),
    }
}));

/** @type {import("wix-crm-backend").TriggeredEmails} */
const triggeredEmailsMock = {
    emailMember: () => Promise.resolve(),
    emailContact: vi.fn(),
}


export default {
    real: { triggeredEmails },
    mock: { triggeredEmails: triggeredEmailsMock }
}