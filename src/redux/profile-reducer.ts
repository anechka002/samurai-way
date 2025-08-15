import { profileAPI } from "@/api/api"
import { ResultCode } from "@/enum"
import type { Photos, PostType, ProfilePageType, ProfileType } from "@/types"
import { nanoid, type Dispatch } from "@reduxjs/toolkit"

const initState: ProfilePageType = {
  posts: [
    {
      id: nanoid(),
      img: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png",
      message: "I'm learn React",
      likesCount: 5,
    },
    {
      id: nanoid(),
      img: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png",
      message: "Hello, how are you?",
      likesCount: 10,
    },
  ],
  profile: {
    aboutMe: "",
    contacts: {
      facebook: "",
      website: null,
      vk: "",
      twitter: "",
      instagram: "",
      youtube: null,
      github: "",
      mainLink: null,
    },
    lookingForAJob: false,
    lookingForAJobDescription: "",
    fullName: "",
    userId: 0,
    photos: {
      small: "",
      large: "",
    }
  },
  status: "",
}

export const profileReducer = (state: ProfilePageType = initState, action: ActionsTypes): ProfilePageType => {
  switch (action.type) {
    case "profile/ADD-POST": {
      const newPost: PostType = {
        id: nanoid(),
        img: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png",
        message: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
      }
    }
    case "profile/DELETE-POST": {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      }
    }
    case "profile/SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case "profile/SET_STATUS_PROFILE": {
      return {
        ...state,
        status: action.status,
      }
    }
    case "profile/SAVE_PHOTO_SUCCESS": {
      return { 
        ...state,
        profile: { 
          ...state.profile, 
          photos: action.photos
        },
      }
    }
    default: {
      return state
    }
  }
}

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof deletePostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusProfileAC>
  | ReturnType<typeof savePhotoSuccessAC>

// action creators
export const addPostAC = (newPostText: string) => ({ type: "profile/ADD-POST", newPostText }) as const
export const deletePostAC = (postId: string) => ({ type: "profile/DELETE-POST", postId }) as const
export const savePhotoSuccessAC = (photos: Photos) => ({ type: "profile/SAVE_PHOTO_SUCCESS", photos }) as const
export const setUserProfileAC = (profile: ProfileType) => ({ type: "profile/SET_USER_PROFILE", profile }) as const
export const setStatusProfileAC = (status: string) => ({ type: "profile/SET_STATUS_PROFILE", status }) as const

// thunk
export const getUserProfileTC = (numericUserId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      let data = await profileAPI.getUserProfile(numericUserId)
      dispatch(setUserProfileAC(data))
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }
}

export const getStatusTC = (numericUserId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      let data = await profileAPI.getStatus(numericUserId)
      dispatch(setStatusProfileAC(data))
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }
}

export const updateStatusTC = (status: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let data = await profileAPI.updateStatus(status)
      if (data.resultCode === ResultCode.Success) {
        dispatch(setStatusProfileAC(status))
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }
}

export const savePhotoTC = (photo: File) => {
  return async (dispatch: Dispatch) => {
    // debugger
    try {
      let res = await profileAPI.savePhoto(photo)
      if (res.data.resultCode === ResultCode.Success && res.data.data) {
        dispatch(savePhotoSuccessAC(res.data.data.photos))
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }
}
