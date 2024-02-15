import { test, expect, describe } from "vitest";
import {
    readAllMessages,
    readMessageByID,
    findUnreadMessages,
    insertMessage,
    updateMessage,
    deleteMessage
} from "../src/backend/messageDB.js"

describe('messageDB.js tests', () => {
    test('readAllMessages - should correctly read all messages', async () => {
        const messages = await readAllMessages();
        expect(Array.isArray(messages.items)).toBe(true);
        expect(messages.items.length).toBeGreaterThan(0);
        expect(messages.items[0].message).toBe('Test1');
        expect(messages.items[0].sender).toBe('xxx');
        expect(messages.items[0].receiver).toBe('yyy');
        expect(messages.items[0].viewed).toBe(false);
    });

    test('readMessageByID - should correctly read a message by ID', async () => {
        const message = await readMessageByID('1');
        expect(message.message).toBe('Test1');
        expect(message.sender).toBe('xxx');
        expect(message.receiver).toBe('yyy');
        expect(message.viewed).toBe(false);
    });

    test('findUnreadMessages - should find all unread messages for a receiver', async () => {
        const unreadMessages = await findUnreadMessages('yyy');
        expect(unreadMessages.items.length).toBe(2);
        expect(unreadMessages.items.every(msg => msg.viewed === false)).toBe(true);
    });

    test('insertMessage - should correctly insert a new message', async () => {
        const toInsert = { "viewed": true, "receiver": "xxx", "sender": "xxx", "message": "test!" };
        const allMessageLengthBeforeInsert = (await readAllMessages()).items.length;
        await insertMessage(toInsert);
        const messagesAfterInsert = await readAllMessages();
        expect(messagesAfterInsert.items.length).toBe(allMessageLengthBeforeInsert + 1);
        expect(messagesAfterInsert.items[messagesAfterInsert.items.length - 1].message).toBe('test!');
    });

    test('updateMessage - should correctly update a message', async () => {
        const toUpdate = { _id: 'updateMessage', "viewed": true, "receiver": "xxx", "sender": "xxx", "message": "test" };
        const insertedMessage = await insertMessage(toUpdate);
        insertedMessage.viewed = false;
        await updateMessage(insertedMessage);
        const updatedMessage = await readMessageByID('updateMessage');
        expect(updatedMessage.viewed).toBe(false);
    });

    test('deleteMessage - should correctly delete a message', async () => {
        const allMessagesBeforeDelete = await readAllMessages();
        const toDelete = allMessagesBeforeDelete.items[0];
        await deleteMessage(toDelete);
        const messagesAfterDelete = await readAllMessages();
        expect(messagesAfterDelete.items.length).toBe(allMessagesBeforeDelete.items.length - 1);
        const deletedMessageResult = await readMessageByID(toDelete._id);
        expect(deletedMessageResult).toBe(null);
    });
});
