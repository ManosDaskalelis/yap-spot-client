export interface Message {
  content: string;
  senderUsername: string;
  senderPfp: string;
  timestamp: Date;
  isOwn: boolean;
}
