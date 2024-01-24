import { test } from "backend/new-module.web"
$w.onReady(async function () {
    console.log('!!')
    const a = await test("aaa");
    console.log(a)
    console.log('??')
});