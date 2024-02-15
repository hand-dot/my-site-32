import wixData from 'wix-data';

export const readAllMessages = async () => {
    return wixData.query("messages").find()
    /*
    {
        "items": [
            {
            "viewed": true,
            "_id": "92ce0f73-79ac-4fe7-874b-fa91773e5904",
            "_owner": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
            "_createdDate": "2024-02-15T01:42:20.643Z",
            "receiver": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
            "_updatedDate": "2024-02-15T02:03:28.723Z",
            "sender": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
            "message": "おっすー"
            },
            {
            "_id": "92ca169b-f26c-475d-a170-c32c0286a1a8",
            "_owner": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
            "_createdDate": "2024-02-15T01:42:07.343Z",
            "receiver": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
            "_updatedDate": "2024-02-15T02:03:04.185Z",
            "sender": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
            "message": "こんにちわ"
            }
        ],
        "length": 2,
        "partialIncludes": false,
        "query": {
            "invalidArguments": [],
            "filterTree": {},
            "encoder": {},
            "provider": {
            "cloudDataUrl": "",
            "gridAppId": "cd61cff4-a3b1-4f8b-8359-f231e8842fcd",
            "segment": "SANDBOX"
            },
            "collectionName": "messages",
            "skipNumber": 0,
            "included": [],
            "projectedFields": []
        },
        "totalCount": 2,
        "totalPages": 1
    }
    */
}

// const messageId = "92ce0f73-79ac-4fe7-874b-fa91773e5904"
export const readMessageByID = async (messageId) => {
    return wixData.get("messages", messageId)
    /*
    {
        "viewed": true,
        "_id": "92ce0f73-79ac-4fe7-874b-fa91773e5904",
        "_owner": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "_createdDate": "2024-02-15T01:42:20.643Z",
        "receiver": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "_updatedDate": "2024-02-15T02:03:28.723Z",
        "sender": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "message": "おっすー"
    }
    */
}

// const receiverId = "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8"
export const findUnreadMessages = async (receiverId) => {
    return wixData.query("messages")
        .eq("receiver", receiverId)
        .eq("viewed", false)
        .find()
    /*
    {
        "items": [
            {
            "viewed": false,
            "_id": "7d1a4938-d51d-4d2a-9630-0e6f4212560c",
            "_owner": "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8",
            "_createdDate": "2024-02-15T04:06:01.302Z",
            "receiver": "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8",
            "_updatedDate": "2024-02-15T04:06:46.081Z",
            "sender": "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8",
            "message": "msg"
            }
        ],
        "length": 1,
        "partialIncludes": false,
        "query": {
            "invalidArguments": [],
            "filterTree": {
            "$and": [
                {
                "receiver": "d9cde4f8-cd5d-42d7-a827-a59d8a7789b8"
                },
                {
                "viewed": false
                }
            ]
            },
            "encoder": {},
            "provider": {
            "cloudDataUrl": "",
            "gridAppId": "b71a739c-a932-4b1f-9164-d8201ea03570",
            "segment": "SANDBOX"
            },
            "collectionName": "messages",
            "skipNumber": 0,
            "included": [],
            "projectedFields": []
        },
        "totalCount": 1,
        "totalPages": 1
    }
    */
}

/*
const toInsert = {
  "viewed": true,
  "receiver":  "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
  "sender":  "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
  "message":    "こんちわ----っす"
};
*/
export const insertMessage = async (toInsert) => {
    return wixData.insert("messages", toInsert);
    /*
    {
        "viewed": true,
        "receiver": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "sender": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "message": "こんちわ----っす",
        "_id": "7f4449a8-fbc0-4ef8-ad0f-e418dcf0dfd7",
        "_owner": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "_createdDate": "2024-02-15T02:12:21.942Z",
        "_updatedDate": "2024-02-15T02:12:21.942Z"
    }
    */
}

/*
const toUpdate = {
  "_id": "92ce0f73-79ac-4fe7-874b-fa91773e5904",
  "viewed": true,
  "receiver":  "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
  "sender":  "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
  "message":    "こんちわ?!"
};
*/
export const updateMessage = async (toUpdate) => {
    return wixData.update("messages", toUpdate);
    /*
    {
        "_id": "92ce0f73-79ac-4fe7-874b-fa91773e5904",
        "viewed": true,
        "receiver": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "sender": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "message": "こんちわ?!",
        "_owner": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "_createdDate": "2024-02-15T01:42:20.643Z",
        "_updatedDate": "2024-02-15T02:11:30.782Z"
    }
    */
}

// const messageId = "7f4449a8-fbc0-4ef8-ad0f-e418dcf0dfd7"
export const deleteMessage = async (messageId) => {
    return wixData.remove("messages", messageId)
    /*
    {
        "viewed": true,
        "_id": "7f4449a8-fbc0-4ef8-ad0f-e418dcf0dfd7",
        "_owner": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "_createdDate": "2024-02-15T02:12:21.942Z",
        "receiver": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "_updatedDate": "2024-02-15T02:12:21.942Z",
        "sender": "af2e66fd-181b-4fa9-b95e-7c1d69443be7",
        "message": "こんちわ----っす"
    }
    */
}