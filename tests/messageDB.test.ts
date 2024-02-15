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
        expect(messages.items[0].message).toBe('Test');
        expect(messages.items[0].sender).toBe('xxx');
        expect(messages.items[0].receiver).toBe('yyy');
        expect(messages.items[0].viewed).toBe(false);
    });


    // test('readMessageByID', async () => {
    //     expect(true).toBe(false)
    // })

    // test('findUnreadMessages', async () => {
    //     expect(true).toBe(false)
    // })

    // test('insertMessage', async () => {
    //     expect(true).toBe(false)
    // })

    // test('updateMessage', async () => {
    //     expect(true).toBe(false)
    // })

    // test('deleteMessage', async () => {
    //     expect(true).toBe(false)
    // })
});