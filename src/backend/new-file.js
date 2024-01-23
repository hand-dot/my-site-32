import wixData from 'wix-data';

export const test1 = (str) => {
    return str + '!'
}

export const test2 = async (args) => {
    const { items } = await wixData.query('Test').find();
    return items.map(({ _id }) => _id + '!');
}


export const test3 = async (args) => {
    const { items } = await wixData.query('Test').find();
    return items.map(({ _id }) => _id + '?');
}
