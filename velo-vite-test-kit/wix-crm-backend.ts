import { vi } from "vitest";
import * as wixCrmBackend from 'wix-crm-backend';
import type { TriggeredEmails } from 'wix-crm-backend';


vi.mock("wix-crm-backend", () => ({
    __esModule: true,
    /** @type {TriggeredEmails} */
    triggeredEmails: {
        emailMember: vi.fn(),
        emailContact: vi.fn(),
    },
}));


const triggeredEmails: TriggeredEmails = {
    emailMember: vi.fn(() => Promise.resolve()),
    emailContact: vi.fn(),
};

export default {
    real: { triggeredEmails: wixCrmBackend.triggeredEmails },
    mock: { triggeredEmails }
};
