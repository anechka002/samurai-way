import type { DialogPageType, MessageType } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import type { UsersType } from "./users-reducer";

const initState: DialogPageType = {
  users: [
    { id: 1, name: 'Sveta', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 2, name: 'Anna', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 3, name: 'Viktor', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 4, name: 'Valera', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 5, name: 'Alex', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 6, name: 'John', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
  ] as UsersType[],
  messages: [
    { id: nanoid(), text: 'Hi' },
    { id: nanoid(), text: 'Hello' },
    { id: nanoid(), text: 'Ok' },
    { id: nanoid(), text: 'Yo' },
  ],
};

export const dialogsReducer = (
  state: DialogPageType = initState,
  action: ActionsTypes
): DialogPageType => {
  switch (action.type) {
    case 'SEND-MESSAGE': {
      const newMessage: MessageType = {
        id: nanoid(),
        text: action.message,
      };
      return {
        ...state,
        messages: [newMessage, ...state.messages]
      };
    }
    default: {
      return state;
    }
  }
};

export type ActionsTypes =
  | ReturnType<typeof sendMessageAC>

export const sendMessageAC = (message: string) =>
  ({ type: 'SEND-MESSAGE', message } as const);
