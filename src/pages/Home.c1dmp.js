import { test } from "backend/new-module.web"
$w.onReady(async function () {
    console.log('!!')
    const a = await test();
    console.log(a)
    console.log('??')
});