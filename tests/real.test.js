import { test, expect, describe, vi } from "vitest";
import { emailCurrentMember } from "../src/backend/real.js"


describe('real.js', () => {
  test('emailCurrentMember', async () => {

    // const spy = vi.spyOn(triggeredEmails, "emailMember");

    const emailId = "U2GDBS7";
    const res = await emailCurrentMember(emailId);

    expect(res).toBe(undefined);
    // expect(spy).toHaveBeenCalledWith("U2GDBS7",
    //   "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8",
    //   {
    //     variables: {
    //       firstName: "Kyohei",
    //       lastName: "Fukuda"
    //     }
    //   });
  });
});
