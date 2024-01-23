import { test, expect, describe } from "vitest";
import { test1, test2, test3 } from "src/backend/new-file.js"
import wixData from 'wix-data';

describe('new-file.js', () => {
    test('test1', () => {
        expect(test1('hello')).toBe('hello!');
    });

    test('test2', async () => {
        // wixData.query mock for test2
        wixData.query.mockImplementation(() => ({
            find: () => ({ items: [{ _id: 'aaa' }, { _id: 'bbb' }] })
        }));

        const result = await test2();
        expect(result).toEqual(['aaa!', 'bbb!']);
    })

    test('test3', async () => {
        // wixData.query mock for test3
        wixData.query.mockImplementation(() => ({
            find: () => ({ items: [{ _id: 'a' }, { _id: 'b' }, { _id: 'c' }] })
        }));

        const result = await test3();
        expect(result).toEqual(['a?', 'b?', 'c?']);
    });
});