import { profileAPI } from '@/api/api';
import { ResultCode } from '@/enum';
import type { PostType, ProfilePageType, ProfileType } from '@/types';
import { nanoid, type Dispatch } from '@reduxjs/toolkit';

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
  profile: null,
  status: '',
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
      };
    }
    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case 'SET_STATUS_PROFILE': {
      return {
        ...state,
        status: action.status,
      }
    }
    default: {
      return state;
    }
  }
};

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusProfileAC>

// action creators
export const addPostAC = (newPostText: string) =>
  ({ type: 'ADD-POST', newPostText } as const);
export const setUserProfileAC = (profile: ProfileType) =>
  ({ type: 'SET_USER_PROFILE', profile } as const);
export const setStatusProfileAC = (status: string) =>
  ({ type: 'SET_STATUS_PROFILE', status } as const);

// thunk
export const getUserProfileTC = (numericUserId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getUserProfile(numericUserId)
      .then((data) => {
        dispatch(setUserProfileAC(data))
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }
}

export const getStatusTC = (numericUserId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getStatus(numericUserId)
      .then((data) => {
        // debugger
        dispatch(setStatusProfileAC(data))
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }
}

export const updateStatusTC = (status: string) => {
  return (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
      .then((data) => {
        if(data.resultCode === ResultCode.Success) {
          dispatch(setStatusProfileAC(status))
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }
}