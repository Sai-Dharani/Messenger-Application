export class ChatMessage {
    email?:string;
    userName?:string;
    message?:string;
    timeSent?: Date = new Date();
    $key?:string;
}
