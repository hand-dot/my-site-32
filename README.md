# Velo Test Kit

A powerful testing framework that enables efficient unit testing of Wix Velo functions using the speed of Vitest and TypeScript's type support.

## Notice

- This project is currently under development and should be considered a concept at this stage. We welcome your feedback and suggestions.

## Features and Benefits

- Full type support throughout, ensuring robust and reliable tests.
- All Velo modules come pre-mocked, allowing easy integration and immediate test writing.
- Default behaviors leverage type information for simple and secure customization, accommodating tests for various scenarios.

## Setup

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