import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import type { Schema, Document, SchemaDefinition } from 'mongoose';

const collectionsDirectory = path.join(process.cwd(), 'velo-vite-test-kit/configs/CMS');

const createSchema = <T extends Document>(definition: SchemaDefinition): Schema<T> => new mongoose.Schema<T>(definition, { timestamps: true })

let cmsCollectionsCache: { collectionName: string, schema: Schema, initialData: any[] }[];
const loadCMSCollections = async () => {
    if (cmsCollectionsCache) return cmsCollectionsCache;

    const collectionConfigs = [];

    const files = fs.readdirSync(collectionsDirectory);
    for (const file of files) {
        const filePath = path.join(collectionsDirectory, file);
        if (path.extname(file) === '.ts') {
            const { default: config } = await import(filePath);
            const collectionName = path.basename(file, '.ts');
            collectionConfigs.push({ collectionName, ...config });
        }
    }
    const collections = collectionConfigs.map(({ collectionName, schema, data }) => ({ collectionName, schema: createSchema(schema), initialData: data }));
    cmsCollectionsCache = collections;
    return collections
}

export const getCollections = loadCMSCollections;

const modelsCache = {};

export const getCollectionModel = async (collectionName): mongoose.Model<any> => {
    if (!modelsCache[collectionName]) {
        const collection = (await loadCMSCollections()).find(c => c.collectionName === collectionName);
        if (!collection) {
            throw new Error(`Collection ${collectionName} not found`);
        }
        modelsCache[collectionName] = mongoose.models[collectionName] || mongoose.model(collection.collectionName, collection.schema);
    }
    return modelsCache[collectionName];
};