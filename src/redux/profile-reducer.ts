import { nanoid } from '@reduxjs/toolkit';
import type { ActionsTypes, PostType, ProfilePageType } from './store';

const initState: ProfilePageType = {
  posts: [
    {
      id: nanoid(),
      img: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
      message: "I'm learn React",
      likesCount: 5,
    },
    {
      id: nanoid(),
      img: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
      message: 'Hello, how are you?',
      likesCount: 10,
    },
  ],
  newPostText: 'Test',
};

export const profileReducer = (
  state: ProfilePageType = initState,
  action: ActionsTypes
): ProfilePageType => {
  switch (action.type) {
    case 'ADD-POST': {
      const newPost: PostType = {
        id: nanoid(),
        img: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
        newPostText: '',
      };
    }
    case 'UPDATE-NEW-POST-TEXT': {
      return {
        ...state,
        newPostText: action.newText,
      };
    }
    default: {
      return state;
    }
  }
};

// action creators
export const addPostAC = (newPostText: string) =>
  ({ type: 'ADD-POST', newPostText } as const);
export const updateNewPostTextAC = (text: string) =>
  ({ type: 'UPDATE-NEW-POST-TEXT', newText: text } as const);
