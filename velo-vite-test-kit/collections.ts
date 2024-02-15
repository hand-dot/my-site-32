import mongoose from 'mongoose';
import type { Schema } from 'mongoose';

type Collection = {
    collectionName: string,
    schema: Schema,
    initialData: any[]
}


const collections: Collection[] = [
    {
        collectionName: 'messages',
        schema: new mongoose.Schema({
            message: String,
            sender: String,
            receiver: String,
            viewed: Boolean,
        }),
        initialData: [
            {
                message: 'Test',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: false
            },
            {
                message: 'Test2',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: true
            },
            {
                message: 'Test3',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: false
            },
            {
                message: 'Test4',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: true
            },
        ]
    },
]

export const getCollections = () => collections
const modelsCache = {};

export const getCollectionModel = (collectionName) => {
    if (modelsCache[collectionName]) {
        return modelsCache[collectionName];
    }

    const collection = collections.find(collection => collection.collectionName === collectionName);
    if (!collection) {
        throw new Error(`Collection ${collectionName} not found`);
    }

    const model = mongoose.model(collection.collectionName, collection.schema);
    modelsCache[collectionName] = model;
    return model;
};