export class Message {
    messageId: string;
    content: string;
    userId: string;
    username: string;
    userImage: string;

    constructor(
        messageId: string,
        content: string,
        userId: string,
        username: string,
        userImage: string 
    ) {
        this.messageId = messageId;
        this.content = content;
        this.userId = userId;
        this.username = username;
        this.userImage = userImage; 
    }
}
