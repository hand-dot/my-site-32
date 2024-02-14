import { vi } from "vitest";
import { triggeredEmails } from 'wix-crm-backend';

/** @typedef {import("wix-crm-backend").TriggeredEmails} TriggeredEmails*/

vi.mock("wix-crm-backend", () => ({
    __esModule: true,
    default: {},
    /** @type {TriggeredEmails} */
    triggeredEmails: {
        emailMember: vi.fn(),
        emailContact: vi.fn(),
    }
}));

/** @type {TriggeredEmails} */
const triggeredEmailsMock = {
    emailMember: () => Promise.resolve(),
    emailContact: vi.fn(),
}


export default {
    real: { triggeredEmails },
    mock: { triggeredEmails: triggeredEmailsMock }
}