import { authAPI } from "@/api/api"
import type { Inputs } from "@/types"
import type { ThunkAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "./redux-store"
import { handleServerAppError } from "@/utils/handleServerAppError"
import { ResultCode } from "@/enum"
import { setErrorAC } from "./app-reducer"

type AuthType = {
  id: null | number
  email: string | null
  login: string | null
  isAuth: boolean
}

const initState: AuthType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

export const authReducer = (state: AuthType = initState, action: ActionsTypes): AuthType => {
  switch (action.type) {
    case "auth/SET_USER_DATA": {
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      }
    }
    case "auth/RESET_USER_AUTH_DATA": {
      return {
        ...state,
        ...initState,
      }
    }
    default: {
      return state
    }
  }
}

export type ActionsTypes = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof resetAuthUserDataAC>

// action creators
export const setAuthUserDataAC = (id: number, email: string, login: string) =>
  ({ type: "auth/SET_USER_DATA", payload: { id, email, login } }) as const
export const resetAuthUserDataAC = () => ({ type: "auth/RESET_USER_AUTH_DATA" }) as const

// thunk
export const getAuthUserDataTC = (): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = await authAPI.me()

      if (data.resultCode === ResultCode.Success) {
        const { id, email, login } = data.data
        dispatch(setAuthUserDataAC(id, email, login))
      }
    } catch (error) {
      console.error("Error fetching auth:", error)
      throw error
    }
  }
}
export const loginTC = (arg: Inputs): ThunkAction<void, RootState, unknown, ActionsTypes> => {
  return async (dispatch: AppDispatch) => {
    try {
      let res = await authAPI.login(arg)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(getAuthUserDataTC())
        dispatch(setErrorAC({ error: null }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (error) {
      console.error("Error fetching auth:", error)
    }
  }
}
export const logoutTC = (): ThunkAction<void, RootState, unknown, ActionsTypes> => {
  return async (dispatch: AppDispatch) => {
    try {
      let res = await authAPI.logout()
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(resetAuthUserDataAC())
        dispatch(setErrorAC({ error: null }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (error) {
      console.error("Error fetching auth:", error)
    }
  }
}
