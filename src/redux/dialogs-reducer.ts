import type { DialogPageType, MessageType } from "@/types";
import { nanoid } from "@reduxjs/toolkit";

const initState: DialogPageType = {
  users: [
    { id: 1, name: 'Sveta' },
    { id: 2, name: 'Anna' },
    { id: 3, name: 'Viktor' },
    { id: 4, name: 'Valera' },
    { id: 5, name: 'Alex' },
    { id: 6, name: 'John' },
  ],
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
