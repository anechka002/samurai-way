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
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
}

const initState: UsersPageType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

export const usersReducer = (state: UsersPageType = initState, action: ActionsTypes): UsersPageType => {
  switch (action.type) {
    case "SET_USERS": {
      return {
        ...state,
        users: action.users,
      }
    }
    case "FOLLOW": {
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: true } : u)),
      }
    }
    case "UNFOLLOW": {
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.userId ? { ...u, followed: false } : u)),
      }
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalCount,
      }
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
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
export const followAC = (userId: number) => ({ type: "FOLLOW", userId }) as const
export const unfollowAC = (userId: number) => ({ type: "UNFOLLOW", userId }) as const
export const setUsersAC = (users: UsersType[]) => ({ type: "SET_USERS", users }) as const
export const setCurrentPageAC = (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage }) as const
export const setTotalUsersCountAC = (totalCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", totalCount }) as const
export const toggleIsFetchingAC = (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching }) as const
export const toggleIsFollowingProgressAC = (isDisabled: boolean, userId: number) =>
  ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isDisabled, userId }) as const

// thunk
export const getUsersTC = (currentPage: number, pageSize: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetchingAC(false))
      dispatch(setUsersAC(data.items))
      dispatch(setTotalUsersCountAC(data.totalCount))
    })
  }
}

export const unfollowTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    followAPI.unfollow(userId).then((data) => {
      if (data.resultCode === ResultCode.Success) {
        dispatch(unfollowAC(userId))
      }
      dispatch(toggleIsFollowingProgressAC(false, userId))
    })
  }
}

export const followTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    followAPI.follow(userId).then((data) => {
      if (data.resultCode === ResultCode.Success) {
        dispatch(followAC(userId))
      }
      dispatch(toggleIsFollowingProgressAC(false, userId))
    })
  }
}
