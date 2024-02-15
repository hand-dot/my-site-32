import { vi } from "vitest";
import mongoose from 'mongoose';
import _wixData from 'wix-data';
import type { WixDataQuery, WixDataQueryResult } from 'wix-data';
import { getCollectionModel } from './collections'

type WixData = typeof _wixData;

const mockWixDataQuery: WixDataQuery = {
  find: vi.fn(() => this),
  count: vi.fn(() => this),
  limit: vi.fn(() => this),
  skip: vi.fn(() => this),
  ascending: vi.fn(() => this),
  descending: vi.fn(() => this),
  distinct: vi.fn(() => this),
  fields: vi.fn(() => this),
  include: vi.fn(() => this),
  and: vi.fn(() => this),
  between: vi.fn(() => this),
  contains: vi.fn(() => this),
  endsWith: vi.fn(() => this),
  eq: vi.fn(() => this),
  ge: vi.fn(() => this),
  gt: vi.fn(() => this),
  hasAll: vi.fn(() => this),
  hasSome: vi.fn(() => this),
  isEmpty: vi.fn(() => this),
  isNotEmpty: vi.fn(() => this),
  le: vi.fn(() => this),
  lt: vi.fn(() => this),
  ne: vi.fn(() => this),
  not: vi.fn(() => this),
  or: vi.fn(() => this),
  startsWith: vi.fn(() => this),
};

const mockWixDataQueryResult: WixDataQueryResult = {
  items: [],
  currentPage: 0,
  length: 0,
  pageSize: 0,
  partialIncludes: false,
  query: mockWixDataQuery,
  totalCount: 0,
  totalPages: 0,
  hasNext: vi.fn(() => false),
  hasPrev: vi.fn(() => false),
  next: vi.fn(() => this),
  prev: vi.fn(() => this),
};


const wixData: WixData = {
  aggregate: vi.fn(),
  bulkInsert: vi.fn(),
  bulkRemove: vi.fn(),
  bulkSave: vi.fn(),
  bulkUpdate: vi.fn(),
  filter: vi.fn(),
  get: vi.fn((collectionId, itemId) => {
    const model = getCollectionModel(collectionId);
    return model.findById(itemId);
  }),
  insert: vi.fn((collectionId, item) => {
    const model = getCollectionModel(collectionId);
    if (!item._id) {
      item._id = new mongoose.Types.ObjectId();
    }
    return model.create(item);
  }),
  insertReference: vi.fn(),
  isReferenced: vi.fn(),
  query: vi.fn((collectionId) => {
    return {
      ...mockWixDataQuery,
      ...{
        find: vi.fn(async () => {
          const model = getCollectionModel(collectionId);
          const items = await model.find()
          const result: WixDataQueryResult = {
            ...mockWixDataQueryResult,
            items,
            totalCount: items.length,
          }
          return result
        })
      }
    }
  }),
  queryReferenced: vi.fn(),
  remove: vi.fn((collectionId, itemId) => {
    const model = getCollectionModel(collectionId);
    return model.findByIdAndDelete(itemId);
  }),
  removeReference: vi.fn(),
  replaceReferences: vi.fn(),
  save: vi.fn(),
  sort: vi.fn(),
  truncate: vi.fn(),
  update: vi.fn(async (collectionId, item) => {
    const model = getCollectionModel(collectionId);
    const updatedDoc = await model.findByIdAndUpdate(
      item._id,
      { $set: item },
      { new: true }
    );
    return updatedDoc;
  }),
};

vi.mock("wix-data", () => ({
  __esModule: true,
  default: wixData,
}));