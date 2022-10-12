import { atom } from "recoil";
import { TypeMessage, TypeRoom, userData } from "./api";

export const isDarkAtom = atom({ key: "isDark", default: false });

export const isLoginAtom = atom({
  key: "isLogin",
  default:
    localStorage.length !== 0 &&
    localStorage["token"] !== "" &&
    localStorage["token"] !== undefined,
});

export const userInfoAtom = atom<userData>({ key: "userInfo", default: null });

export const roomsAtom = atom<TypeRoom[]>({ key: "rooms", default: [] });
export const myRoomsAtom = atom<TypeRoom[]>({ key: "myrooms", default: [] });
export const currentRoomIdAtom = atom<number | null | undefined>({
  key: "roomId",
  default: null,
});
export const messagesAtom = atom<TypeMessage[]>({
  key: "messages",
  default: [],
});
export const newChatModalAtom = atom({ key: "newChatModal", default: false });
export const allChatAtom = atom({ key: "allchat", default: false });
export const isChatLoadingAtom = atom({ key: "isChatLoading", default: true });
