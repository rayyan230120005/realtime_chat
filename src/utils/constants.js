export const DB_NAME = "realtime_chat_db";

export const UserRolesEnum = {
    ADMIN : "ADMIN",
    MEMBER : "MEMBER",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const ChatTypeEnum = {
    DIRECT : "DIRECT",
    GROUP : "GROUP",
};
export const AvailableChatTypes = Object.values(ChatTypeEnum);

export const MessageStatusEnum = {
    SENT : "SENT",
    DELIVERED: "DELIVERED",
    READ: "READ",
};
export const AvailableMessageStatus = Object.values(MessageStatusEnum);

export const SocketEventsEnum = {
    //Connection events
    CONNECTED:"connected",
    DISCONNECT:"disconnect",
    SOCKET_ERROR:"socket:error",

    // Room lifecycle
    JOIN_CHAT:"join:chat",
    LEAVE_CHAT:"leave:chat",

    //MESSAGING
    MESSAGE_SEND:"message:send",
    MESSAGE_RECIEVED:"message:recieved",
    MESSAGE_DELIVERED:"message:delivered",
    MESSAGE_READ:"message:read",

    //REAL TIME INDICATORS
    TYPING_START:"typing:start",
    TYPING_STOP:"typing:stop",

    //PRESENCE
    PRESENCE_UPDATE:"presence:update",
    USER_ONLINE:"user:online",
    USER_OFFLINE:"user:offline",

    //OFFLINE MESSAGE QUEUE SYNCHRONIZATION
    OFFLINE_SYNC_REQUEST:"offline:sync_request",
    OFFLINE_SYNC_RESPONSE:"offline:sync_response",
};

export const AvailableSocketEvents = Object.values(SocketEventsEnum)
