import { vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { getCollections } from './collections'

import './wix-crm-backend';
import './wix-members-backend';
import './wix-data';

global.mongoServer = null;

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {});
    global.mongoServer = mongoServer;
});

afterAll(async () => {
    await mongoose.disconnect();
    await global.mongoServer.stop();
});

beforeEach(async () => {
    // setup initial data
    for (const { collectionName, schema, initialData } of getCollections()) {
        const model = mongoose.model(collectionName, schema);
        await model.insertMany(initialData);

    }
});

afterEach(async () => {
    vi.resetAllMocks();
    vi.restoreAllMocks();

    // clear all data
    await Promise.all(getCollections().map(async ({ collectionName }) => {
        const model = mongoose.models[collectionName] || mongoose.model(collectionName, new mongoose.Schema({}));
        await model.deleteMany({});
    }));
});