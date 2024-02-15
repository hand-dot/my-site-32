import wixData from 'wix-data';

export const readAllMessages = async () => {
    return wixData.query("messages").find()
}

export const readMessageByID = async (messageId) => {
    return wixData.get("messages", messageId)
}

export const findUnreadMessages = async (receiverId) => {
    return wixData.query("messages")
        .eq("receiver", receiverId)
        .eq("viewed", false)
        .find()
}

export const insertMessage = async (toInsert) => {
    return wixData.insert("messages", toInsert);
}

export const updateMessage = async (toUpdate) => {
    return wixData.update("messages", toUpdate);
}

export const deleteMessage = async (messageId) => {
    return wixData.remove("messages", messageId)
}