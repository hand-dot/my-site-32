import wixData from 'wix-data';

export const test = async (args) => {
    console.log(args)
    const { items } = await wixData.query('Test').find();
    return items
}