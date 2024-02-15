import mongoose from 'mongoose';
import type { Schema, Model } from 'mongoose';

type Collection = {
    collectionName: string,
    schema: Schema,
    initialData: any[]
}


const collections: Collection[] = [
    {
        collectionName: 'messages',
        schema: new mongoose.Schema({
            _id: String,
            message: String,
            sender: String,
            receiver: String,
            viewed: Boolean,
        }),
        initialData: [
            {
                _id: '1',
                message: 'Test1',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: false
            },
            {
                _id: '2',
                message: 'Test2',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: true
            },
            {
                _id: '3',
                message: 'Test3',
                sender: 'xxx',
                receiver: 'yyy',
                viewed: false
            },
            {
                _id: '4',
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

export const getCollectionModel = (collectionName): mongoose.Model<any> => {
    if (!modelsCache[collectionName]) {
        const collection = collections.find(c => c.collectionName === collectionName);
        if (!collection) {
            throw new Error(`Collection ${collectionName} not found`);
        }
        modelsCache[collectionName] = mongoose.models[collectionName] || mongoose.model(collection.collectionName, collection.schema);
    }
    return modelsCache[collectionName];
};