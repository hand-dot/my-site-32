import { beforeEach, vi } from "vitest";
import { triggeredEmails } from 'wix-crm-backend';
import { currentMember } from 'wix-members-backend';

beforeEach(() => {
    vi.resetAllMocks();

    currentMember.getMember.mockImplementation((args) => {
        console.log('-----', 'args', args, '-----')
        return Promise.resolve({
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
        })
    })

    triggeredEmails.emailMember.mockImplementation(() => Promise.resolve());
});

vi.mock("wix-members-backend", () => ({
    __esModule: true,
    default: {
    },
    currentMember: {
        getMember: vi.fn()
    }
}));


vi.mock("wix-crm-backend", () => ({
    __esModule: true,
    default: {
    },
    triggeredEmails: {
        emailMember: vi.fn()
    }
}));
