import { Permissions, webMethod } from "wix-web-module";
import { test1 as _test } from "./new-file";

export const test = webMethod(Permissions.Anyone, (...args) => _test(args));