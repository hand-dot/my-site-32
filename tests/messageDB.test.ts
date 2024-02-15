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
        console.log(messages.items[0])
        expect(Array.isArray(messages.items)).toBe(true);
        expect(messages.items.length).toBeGreaterThan(0);
        expect(messages.items[0].message).toBe('Test');
        expect(messages.items[0].sender).toBe('xxx');
        expect(messages.items[0].receiver).toBe('yyy');
        expect(messages.items[0].viewed).toBe(false);
    });


    // test('readMessageByID', async () => {
    //     const message = await readMessageByID('1')
    //     expect(message.message).toBe('Test');
    //     expect(message.sender).toBe('xxx');
    //     expect(message.receiver).toBe('yyy');
    //     expect(message.viewed).toBe(false);
    // })

    // test('findUnreadMessages', async () => {
    //     expect(true).toBe(false)
    // })

    test('insertMessage', async () => {
        // TODO ここから
        expect(true).toBe(false)
    })

    // test('updateMessage', async () => {
    //     expect(true).toBe(false)
    // })

    // test('deleteMessage', async () => {
    //     expect(true).toBe(false)
    // })
});