export const API_URL = "https://egg-talk-server.run.goorm.io";

export type JoinFormType = {
  username: string;
  displayname: string;
  password: string;
  email: string;
  gender: string;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type userData = {
  authorityDtoSet: [];
  username: string;
  displayname: string;
  email: string;
  gender: number;
} | null;

export type TypeRoom = {
  createdDate?: string;
  modifiedDate?: string;
  roomId?: number;
  roomName?: string;
} | null;

export type TypeMessage = {
  content: string;
  createdDate: string;
  id: number;
  messageType: number;
  roomId: number;
  displayname: string;
};

export const roomsTest = [
  {
    createdDate: "2022-10-04T13:38:50",
    roomId: 10,
    creatorId: "test32",
    roomName: "testterdf",
  },
  {
    createdDate: "2022-10-04T13:53:51",
    roomId: 11,
    creatorId: "ckdhkdwns",
    roomName: "My room!",
  },
];

export const messagesTest = [
  {
    createdDate: "2022-10-04T10:31:19",
    id: 4,
    messageType: 0,
    roomId: 6,
    sender: "testuser",
    message: "testuser님이 입장하였습니다.",
  },
  {
    createdDate: "2022-10-04T13:17:31",
    id: 23,
    messageType: 1,
    roomId: 5,
    sender: "test32",
    message: "asdasdasd",
  },
];
