import { beforeEach, vi } from "vitest";
import { triggeredEmails } from 'wix-crm-backend';
import { currentMember } from 'wix-members-backend';


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

export const mocks = {
    "wix-members-backend": {
        currentMember: {
            getMember: {
                default: () => {
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
                }
            }
        }
    },
    "wix-crm-backend": {
        triggeredEmails: {
            emailMember: {
                default: () => {
                    return Promise.resolve();
                },
                fail: () => {
                    return Promise.reject('error');
                }
            }

        }
    }
}


beforeEach(() => {
    vi.resetAllMocks();
    currentMember.getMember.mockImplementation(mocks['wix-members-backend'].currentMember.getMember.default);
    triggeredEmails.emailMember.mockImplementation(mocks['wix-crm-backend'].triggeredEmails.emailMember.default);
})


