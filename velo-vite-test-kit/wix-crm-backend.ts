import { vi } from "vitest";
import type { TriggeredEmails } from 'wix-crm-backend';

const triggeredEmails: TriggeredEmails = {
  emailMember: vi.fn(() => Promise.resolve()),
  emailContact: vi.fn(),
};

vi.mock("wix-crm-backend", () => ({
  __esModule: true,
  triggeredEmails
}));