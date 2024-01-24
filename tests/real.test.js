import { test, expect, describe, vi } from "vitest";
import { emailCurrentMember } from "src/backend/real.js"
import member from 'wix-members-backend';
import crm from 'wix-crm-backend';


describe('real.js', () => {
    test('emailCurrentMember', async () => {
        member.currentMember.getMember.mockImplementation(() => Promise.resolve({
            "_id": "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8",
            "loginEmail": "kyohei@example.com",
            "loginEmailVerified": true,
            "status": "APPROVED",
            "contactId": "be6f3742-12d1-445c-b312-e1eba8fe8a22",
            "privacyStatus": "PRIVATE",
            "activityStatus": "ACTIVE",
            "_createdDate": "2024-01-23T05:43:59.000Z",
            "_updatedDate": "2024-01-23T05:43:59.710Z",
            "lastLoginDate": "2024-01-24T05:36:21.000Z",
            "contactDetails": {
                "firstName": "Kyohei",
                "lastName": "Fukuda",
                "phones": [],
                "emails": [],
                "addresses": [],
                "customFields": {}
            },
            "profile": {
                "nickname": "Kyohei Fukuda",
                "profilePhoto": {
                    "_id": "",
                    "url": "https://lh3.googleusercontent.com/a/test",
                    "height": 0,
                    "width": 0
                },
                "slug": "kyoheif"
            }
        }));
        crm.triggeredEmails.emailMember.mockImplementation(() => Promise.resolve());
        const spy = vi.spyOn(crm.triggeredEmails, "emailMember");

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

});