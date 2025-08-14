import { followAPI, usersAPI } from "@/api/api"
import { ResultCode } from "@/enum"
import type { Dispatch } from "@reduxjs/toolkit"

type UserPhoto = {
  large: null | string
  small: null | string
}
export type UsersType = {
  followed: boolean
  id: number
  name: string
  photos: UserPhoto
  status: string
  uniqueUrlName: null
}
type UsersPageType = {
  users: UsersType[]
  pageSize: number
  totalItemsCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
}

const initState: UsersPageType = {
  users: [],
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

export const usersReducer = (state: UsersPageType = initState, action: ActionsTypes): UsersPageType => {
  switch (action.type) {
    case "users/SET_USERS": {
      return {
        ...state,
        users: action.users,
      }
    }
    case "users/FOLLOW": {
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: true } : u)),
      }
    }
    case "users/UNFOLLOW": {
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: false } : u)),
      }
    }
    case "users/SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case "users/SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalItemsCount: action.totalCount,
      }
    }
    case "users/TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case "users/TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isDisabled
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((el) => el !== action.userId),
      }
    }
    default: {
      return state
    }
  }
}

export type ActionsTypes =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleIsFollowingProgressAC>

// action creators
export const followAC = (userId: number) => ({ type: "users/FOLLOW", userId }) as const
export const unfollowAC = (userId: number) => ({ type: "users/UNFOLLOW", userId }) as const
export const setUsersAC = (users: UsersType[]) => ({ type: "users/SET_USERS", users }) as const
export const setCurrentPageAC = (currentPage: number) => ({ type: "users/SET_CURRENT_PAGE", currentPage }) as const
export const setTotalUsersCountAC = (totalCount: number) =>
  ({ type: "users/SET_TOTAL_USERS_COUNT", totalCount }) as const
export const toggleIsFetchingAC = (isFetching: boolean) => ({ type: "users/TOGGLE_IS_FETCHING", isFetching }) as const
export const toggleIsFollowingProgressAC = (isDisabled: boolean, userId: number) =>
  ({ type: "users/TOGGLE_IS_FOLLOWING_PROGRESS", isDisabled, userId }) as const

// thunk
export const getUsersTC = (currentPage: number, pageSize: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))
    try {
      let data = await usersAPI.getUsers(currentPage, pageSize)
      dispatch(toggleIsFetchingAC(false))
      dispatch(setUsersAC(data.items))
      dispatch(setTotalUsersCountAC(data.totalCount))
    } catch (error) {}
  }
}

export const unfollowTC = (userId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    try {
      let data = await followAPI.unfollow(userId)
      if (data.resultCode === ResultCode.Success) {
        dispatch(unfollowAC(userId))
      }
      dispatch(toggleIsFollowingProgressAC(false, userId))
    } catch (error) {}
  }
}

export const followTC = (userId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    try {
      let data = await followAPI.follow(userId)
      if (data.resultCode === ResultCode.Success) {
        dispatch(followAC(userId))
      }
      dispatch(toggleIsFollowingProgressAC(false, userId))
    } catch (error) {}
  }
}
