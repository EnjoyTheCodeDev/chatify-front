export interface Author {
  id: string;
  nickname: string;
}

export interface FileMessage {
  id: string;
  filename: string;
  path: string;
}

export interface MessageBase {
  content: string;
}

export interface MessageCreate extends MessageBase {
  chatId: string;
}

export interface MessageRead extends MessageBase {
  id: string;
  chatId: string;
  createdAt: Date;
  author: Author;
  files: FileMessage[];
}

export interface MessageUpdate extends MessageBase {
  content: string;
}
