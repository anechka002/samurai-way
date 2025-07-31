// // import { v1 } from 'uuid';
// import { nanoid } from '@reduxjs/toolkit';
// import { dialogsReducer } from './dialogs-reducer';
// import { profileReducer } from './profile-reducer';



// export type StoreType = {
//   _state: RootStateType;
//   _callSubscriber: () => void;
//   getState: () => RootStateType;
//   subscribe: (observer: () => void) => void;
//   dispatch: (action: ActionsTypes) => void;
// };

// export type ActionsTypes =
//   | ReturnType<typeof addPostAC>
//   | ReturnType<typeof updateNewPostTextAC>
//   | ReturnType<typeof sendMessageAC>
//   | ReturnType<typeof updateNewMessageTextAC>;

// // action creators
// export const addPostAC = (newPostText: string) =>
//   ({ type: 'ADD-POST', newPostText } as const);
// export const updateNewPostTextAC = (text: string) =>
//   ({ type: 'UPDATE-NEW-POST-TEXT', newText: text } as const);
// export const sendMessageAC = (message: string) =>
//   ({ type: 'SEND-MESSAGE', message } as const);
// export const updateNewMessageTextAC = (text: string) =>
//   ({ type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text } as const);


// export const store: StoreType = {
//   _state: {
//     profilePage: {
//       posts: [
//         {
//           id: nanoid(),
//           img: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
//           message: "I'm learn React",
//           likesCount: 5,
//         },
//         {
//           id: nanoid(),
//           img: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
//           message: 'Hello, how are you?',
//           likesCount: 10,
//         },
//       ],
//       newPostText: 'Test',
//     },
//     dialogsPage: {
//       users: [
//         { id: 1, name: 'Sveta' },
//         { id: 2, name: 'Anna' },
//         { id: 3, name: 'Viktor' },
//         { id: 4, name: 'Valera' },
//         { id: 5, name: 'Alex' },
//         { id: 6, name: 'John' },
//       ],
//       messages: [
//         { id: nanoid(), text: 'Hi' },
//         { id: nanoid(), text: 'Hello' },
//         { id: nanoid(), text: 'Ok' },
//         { id: nanoid(), text: 'Yo' },
//       ],
//       newMessage: '',
//     },
//     sidebar: {},
//   },
//   _callSubscriber() {
//     console.log('State changed');
//   },

//   getState() {
//     return this._state;
//   },
//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },

//   dispatch(action: ActionsTypes) {
//     this._state.profilePage = profileReducer(this._state.profilePage, action);
//     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//     this._callSubscriber();
//   },
// };

// (window as any).store = store;
