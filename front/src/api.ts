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
