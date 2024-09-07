export type SigninRequestType = {
    login: string,
    password: string
}

export type SignupRequestType = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type SignupResponseType = {
    id: number
}

export type ErrorResponseType = {
    error?: string,
    reason: string
}

export type UserResponseType = {
    id: number;
    display_name: string;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export type ResourceType = {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string
}

export type ChatMessageType = {
    id: number,
    user_id: number,
    chat_id: number,
    time: string,
    type: string,
    content: string,
    is_read?: boolean,
    file:ResourceType | null
}

export type ChatsResponseType = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: {
        user: UserResponseType,
        time: string,
        content: string
    }
}

export type CreateChatRequestType = {
    title: string
}

export type CreateChatResponseType = {
    id: number
}

export type ChatsMessagesTokenResponseType = {
    token: string
}

export type SearchUsersRequestType = {
    login: string
}

export type UserUpdateRequestType = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type ChangePasswordRequestType = {
    oldPassword: string,
    newPassword: string
}
