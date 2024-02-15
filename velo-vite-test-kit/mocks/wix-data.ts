import { vi } from "vitest";
import mongoose from 'mongoose';
import _wixData from 'wix-data';
import type { WixDataQuery, WixDataQueryResult } from 'wix-data';
import { getCollectionModel } from '../utils/collections'

type WixData = typeof _wixData;

const wixData: WixData = {
  aggregate: vi.fn(),
  bulkInsert: vi.fn(),
  bulkRemove: vi.fn(),
  bulkSave: vi.fn(),
  bulkUpdate: vi.fn(),
  filter: vi.fn(),
  get: vi.fn(async (collectionId, itemId) => {
    const model = await getCollectionModel(collectionId);
    return model.findById(itemId);
  }),
  insert: vi.fn(async (collectionId, item) => {
    if (!item._id) {
      item._id = new mongoose.Types.ObjectId();
    }
    const model = await getCollectionModel(collectionId);
    return model.create(item);
  }),
  insertReference: vi.fn(),
  isReferenced: vi.fn(),
  query: vi.fn(function (collectionId) {
    const operators: { propertyName: string, value: any, operator: string }[] = [];
    const wixDataQuery: WixDataQuery = {
      find: vi.fn(async function () {
        const model = await getCollectionModel(collectionId);
        const queryConditions = operators.reduce((acc, { propertyName, value, operator }) => {
          switch (operator) {
            case 'eq':
              acc[propertyName] = value;
              break;
            case 'gt':
              acc[propertyName] = { $gt: value };
              break;
            case 'lt':
              acc[propertyName] = { $lt: value };
              break;
            case 'ne':
              acc[propertyName] = { $ne: value };
              break;
            case 'ge':
              acc[propertyName] = { $gte: value };
              break;
            case 'le':
              acc[propertyName] = { $lte: value };
              break;
            // Add more operators as needed
          }
          return acc;
        }, {});
        const items = await model.find(queryConditions);
        const result: WixDataQueryResult = {
          items,
          totalCount: items.length,
          currentPage: 0,
          length: 0,
          pageSize: 0,
          partialIncludes: false,
          query: this,
          totalPages: 0,
          hasNext: vi.fn(() => false),
          hasPrev: vi.fn(() => false),
          next: function () { return this; },
          prev: function () { return this; },
        }
        return result;
      }),
      count: async () => {
        const model = await getCollectionModel(collectionId);
        return model.countDocuments();
      },
      limit: function (limit) { return this; },
      skip: function (skip) { return this; },
      ascending: function (propertyNames) { return this; },
      descending: function (propertyNames) { return this; },
      distinct: function (propertyName) { return this; },
      fields: function (propertyNames) { return this; },
      include: function (propertyNames) { return this; },
      and: function (query) { return this; },
      between: function (propertyName, rangeStart, rangeEnd) { return this; },
      contains: function (propertyName, string) { return this; },
      endsWith: function (propertyName, string) { return this; },
      eq: function (propertyName, value) {
        operators.push({ propertyName, value, operator: 'eq' });
        return this;
      },
      ge: function (propertyName, value) {
        operators.push({ propertyName, value, operator: 'ge' });
        return this;
      },
      gt: function (propertyName, value) {
        operators.push({ propertyName, value, operator: 'gt' });
        return this;
      },
      hasAll: function (propertyName, value) { return this; },
      hasSome: function (propertyName, value) { return this; },
      isEmpty: function (propertyName) { return this; },
      isNotEmpty: function (propertyName) { return this; },
      le: function (propertyName, value) {
        operators.push({ propertyName, value, operator: 'le' });
        return this;
      },
      lt: function (propertyName, value) {
        operators.push({ propertyName, value, operator: 'lt' });
        return this;
      },
      ne: function (propertyName, value) {
        operators.push({ propertyName, value, operator: 'ne' });
        return this;
      },
      not: function (query) { return this; },
      or: function (query) { return this; },
      startsWith: function (propertyName, string) { return this; },
    }
    return wixDataQuery
  }),
  queryReferenced: vi.fn(),
  remove: vi.fn(async (collectionId, itemId) => {
    const model = await getCollectionModel(collectionId);
    return model.findByIdAndDelete(itemId);
  }),
  removeReference: vi.fn(),
  replaceReferences: vi.fn(),
  save: vi.fn(),
  sort: vi.fn(),
  truncate: vi.fn(),
  update: vi.fn(async (collectionId, item) => {
    const model = await getCollectionModel(collectionId);
    return model.findByIdAndUpdate(item._id, item)
  }),
};

vi.mock("wix-data", () => ({
  __esModule: true,
  default: wixData,
}));