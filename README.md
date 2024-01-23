Using the mock feature in Vite, we automatically mock Wix Velo modules. By optionally overriding with `mockImplementation`, we can efficiently perform unit testing of logic that includes Wix Velo modules.


## Example

backend/someFunc.js
```
import wixData from 'wix-data';

export const someFunc = async (args) => {
    const { items } = await wixData.query('myCollection').find();
    return items.map(({ _id }) => _id + '!');
}

```

test.js
```
import { test, expect } from 'vitest';
import { someFunc } from 'src/backend/someFunc.js'
import wixData from 'wix-data';

test('someFunc test', async () => {
   // wixData.query mock for someFunc
   wixData.query.mockImplementation(() => ({
      find: () => ({ items: [{ _id: 'aaa' }, { _id: 'bbb' }] })
   }));

   const result = await someFunc();
   expect(result).toEqual(['aaa!', 'bbb!']);
})
```

## Setup:

```
npm install
npm run mockgen
npm run test
```