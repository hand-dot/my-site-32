> [!WARNING]  
> This project is currently under development and should be considered a concept at this stage.  
> We welcome your feedback and suggestions.

# Velo Test Kit

A powerful testing framework that enables efficient unit testing of Wix Velo functions using the speed of [Vitest](https://vitest.dev/) and [TypeScript](https://www.typescriptlang.org/)'s type support.

https://github.com/hand-dot/my-site-32/assets/24843808/dd024c52-4705-43cc-9fdb-c3ef474e5323

## Features and Benefits

- Full type support throughout, ensuring robust and reliable tests.
- All Velo modules come pre-mocked, allowing easy integration and immediate test writing.
- Default behaviors leverage type information for simple and secure customization, accommodating tests for various scenarios.

## Setup

> [!TIP]
> We plan to improve the setup process in the future, making it usable with just an installation.

To use this library, follow the steps below for setup. This ensures anyone can start utilizing it effectively:

1. Install the necessary packages:
   ```
   npm install --save-dev typescript vitest
   ```
2. Add `vitest.config.ts` to your project:
   ```typescript
   import { defineConfig } from 'vitest/config';
   export default defineConfig({
       test: {
           setupFiles: ['./velo-vite-test-kit/index.ts'],
       },
   });
   ```
3. Modify `jsconfig.json` to include `typeRoots` and `checkJs: true`:
   ```json
   {
       "compilerOptions": {
           "typeRoots": [".wix/types/wix-code-types/dist/types"],
           "checkJs": true
       },
       "references": [...]
   }
   ```
4. Copy the [velo-vite-test-kit directory](https://github.com/hand-dot/my-site-32/tree/main/velo-vite-test-kit) to your root directory.
5. Start writing tests.
6. Run your tests with `npx vitest` (or add a script to your `package.json`).

## Usage

### Testing a Function to Send Email to the Current Member

Let's say you have a function to send an email to the logged-in member:

```jsx
import { currentMember } from 'wix-members-backend';
import { triggeredEmails } from 'wix-crm-backend';

export const emailCurrentMember = async (emailId) => {
    const member = await currentMember.getMember({ fieldsets: ['FULL'] })
    const memberId = member._id;
    const options = {
        variables: {
            firstName: member.contactDetails.firstName,
            lastName: member.contactDetails.lastName,
        }
    }

    return triggeredEmails.emailMember(emailId, memberId, options);
}
```

### Test Case for `sendEmailToCurrentMember`

The test below checks that:

- The email sending method is called with the intended data using `spyOn`.
- The default behavior can be customized with `mockImplementation` to throw an error when not logged in.

```jsx
import { test, expect, describe, vi } from "vitest";
import { emailCurrentMember } from "../src/backend/real.js"
import { currentMember, triggeredEmails } from 'wix-members-backend';

describe('real.js', () => {
  test('emailCurrentMember - success', async () => {
    const spy = vi.spyOn(triggeredEmails, "emailMember");

    const emailId = "U2GDBS7";
    const res = await emailCurrentMember(emailId);

    expect(res).toBe(undefined);
    expect(spy).toHaveBeenCalledWith("U2GDBS7", "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8", {
      variables: {
        firstName: "Kyohei",
        lastName: "Fukuda"
      }
    });
  });

  test('emailCurrentMember - not logged in', async () => {
    vi.mocked(currentMember.getMember).mockImplementation(() => {
      throw new Error('not logged in')
    });

    const emailId = "U2GDBS7";

    try {
      const res = await emailCurrentMember(emailId);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('not logged in');
    }
  });
});
```

Use `vi.mocked` and `mockImplementation` to override default mocks, taking advantage of type information to ensure easy and safe customization of behavior.

---

## Database Testing with velo-test-kit

velo-test-kit enables database testing. At the start of a test, it launches a [MongoDB server](https://github.com/nodkz/mongodb-memory-server), with data stored in memory.

All functions from the `wix-data` package called within a test case access this MongoDB instead of Wix CMS. Databases are initialized within each test case, allowing easy testing of functions with side effects.

It's also straightforward to set and initialize data equivalent to Wix CMS collections from a configuration file.
Currently, at the start of the test, files under [`velo-vite-test-kit/configs/CMS`](https://github.com/hand-dot/my-site-32/tree/main/velo-vite-test-kit/configs/CMS) are scanned to initialize collections for testing.


Here's a specific example:  
To simulate a `messages` collection, create the following CMS configuration file:

![Untitled](https://github.com/hand-dot/my-site-32/assets/24843808/1617cc65-d4fb-4e32-80f5-4e57188058d4)

[velo-vite-test-kit/configs/CMS/messages.ts](https://github.com/hand-dot/my-site-32/blob/main/velo-vite-test-kit/configs/CMS/messages.ts)
```ts
const schema = {
    _id: String,
    message: String,
    sender: String,
    receiver: String,
    viewed: Boolean,
};

const data = [
    { _id: '1', message: 'Test1', sender: 'xxx', receiver: 'yyy', viewed: false },
    { _id: '2', message: 'Test2', sender: 'xxx', receiver: 'yyy', viewed: true },
    { _id: '3', message: 'Test3', sender: 'xxx', receiver: 'yyy', viewed: false },
    { _id: '4', message: 'Test4', sender: 'xxx', receiver: 'yyy', viewed: true },
]

export default {
    schema,
    data
}
```

For a backend function using wix-data, like this:

[src/backend/messageDB.js](https://github.com/hand-dot/my-site-32/blob/main/src/backend/messageDB.js)
```js
import wixData from 'wix-data';

export const readAllMessages = async () => {
    return wixData.query("messages").find()
}

export const readMessageByID = async (messageId) => {
    return wixData.get("messages", messageId)
}

export const findUnreadMessages = async (receiverId) => {
    return wixData.query("messages")
        .eq("receiver", receiverId)
        .eq("viewed", false)
        .find()
}

export const insertMessage = async (toInsert) => {
    return wixData.insert("messages", toInsert);
}

export const updateMessage = async (toUpdate) => {
    return wixData.update("messages", toUpdate);
}

export const deleteMessage = async (messageId) => {
    return wixData.remove("messages", messageId)
}
```

You can write tests like these:

[tests/messageDB.test.ts](https://github.com/hand-dot/my-site-32/blob/main/tests/messageDB.test.ts)
```ts
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
        expect(messages.items.length).toBe(4);
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
        const toUpdate = { _id: 'updateMessage', "viewed": true, "receiver": "xxx", "

sender": "xxx", "message": "test" };
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
```

While not all wix-data functions are currently supported, the principle should allow for handling various cases.
