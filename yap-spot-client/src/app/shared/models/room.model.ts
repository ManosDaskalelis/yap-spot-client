export interface RoomInfo {
  chatRooms: {
    roomName: string;
    unReadMessages: number;
  }[];
  voiceRooms: {
    voiceRoomName: string;
    usersInVoice: number;
  }[];
}

export const roomInformation: RoomInfo = {
  chatRooms: [
    { roomName: 'general', unReadMessages: 2 },
    { roomName: 'memes', unReadMessages: 2 },
    { roomName: 'random', unReadMessages: 0 },
  ],
  voiceRooms: [
    { voiceRoomName: 'games', usersInVoice: 2 },
    { voiceRoomName: 'chill', usersInVoice: 2 },
  ],
};
