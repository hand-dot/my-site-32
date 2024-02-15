import { test, expect, describe } from "vitest";
import {
    readAllMessages,
    readMessageByID,
    findUnreadMessages,
    insertMessage,
    updateMessage,
    deleteMessage
} from "../src/backend/messageDB.js"



describe('messageDB.js', () => {
    test('readAllMessages', async () => {
        const messages = await readAllMessages()
        expect(Array.isArray(messages.items)).toBe(true);
        expect(messages.items.length).toBeGreaterThan(0);
        expect(messages.items[0].message).toBe('Test1');
        expect(messages.items[0].sender).toBe('xxx');
        expect(messages.items[0].receiver).toBe('yyy');
        expect(messages.items[0].viewed).toBe(false);
    });


    test('readMessageByID', async () => {
        const message = await readMessageByID('1')
        expect(message.message).toBe('Test1');
        expect(message.sender).toBe('xxx');
        expect(message.receiver).toBe('yyy');
        expect(message.viewed).toBe(false);
    })

    test('findUnreadMessages', async () => {
        const unreadMessages = await findUnreadMessages('yyy')
        expect(unreadMessages.items.length).toBe(2);
        expect(unreadMessages.items[0].viewed).toBe(false);
        expect(unreadMessages.items[1].viewed).toBe(false);
    })

    test('insertMessage', async () => {
        const toInsert = { "viewed": true, "receiver": "xxx", "sender": "xxx", "message": "test!" };
        const allMessageLength = (await readAllMessages()).items.length
        await insertMessage(toInsert)
        const messages = await readAllMessages();
        expect(messages.items.length).toBe(allMessageLength + 1);
        expect(messages.items[messages.items.length - 1].message).toBe('test!');
    })

    test('updateMessage', async () => {
        const toUpdate = { _id: 'updateMessage', "viewed": true, "receiver": "xxx", "sender": "xxx", "message": "test" };
        const allMessageLength = (await readAllMessages()).items.length
        await insertMessage(toUpdate)
        const messages = await readAllMessages();
        const message = messages.items[messages.items.length - 1];
        message.viewed = false;
        await updateMessage(message);
        const updatedMessages = await readAllMessages();
        expect(updatedMessages.items.length).toBe(allMessageLength + 1);
        expect(updatedMessages.items[updatedMessages.items.length - 1].viewed).toBe(false);
    })

    test('deleteMessage', async () => {
        const allMessageLength = (await readAllMessages()).items.length;
        const toDelete = (await readAllMessages()).items[0];
        await deleteMessage(toDelete);
        const messages = await readAllMessages();
        expect(messages.items.length).toBe(allMessageLength - 1);

        const deletedMessageResult = await readMessageByID(toDelete._id);

        expect(deletedMessageResult).toBe(null);
    })

});