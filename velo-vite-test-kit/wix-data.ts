import { vi } from "vitest";
import _wixData from 'wix-data';
type WixData = typeof _wixData;

const wixData: WixData = {
  aggregate: vi.fn(),
  bulkInsert: vi.fn(),
  bulkRemove: vi.fn(),
  bulkSave: vi.fn(),
  bulkUpdate: vi.fn(),
  filter: vi.fn(),
  get: vi.fn(),
  insert: vi.fn(),
  insertReference: vi.fn(),
  isReferenced: vi.fn(),
  query: vi.fn(),
  queryReferenced: vi.fn(),
  remove: vi.fn(),
  removeReference: vi.fn(),
  replaceReferences: vi.fn(),
  save: vi.fn(),
  sort: vi.fn(),
  truncate: vi.fn(),
  update: vi.fn(),
};

vi.mock("wix-data", () => ({
  __esModule: true,
  default: wixData,
}));