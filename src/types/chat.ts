import { OutputData } from "@editorjs/editorjs";

export type MessageIF = {
    userName: string;
    imageUrl: string;
    timestamp: Date;
    message: OutputData;
    replies?: MessageIF[];
};
