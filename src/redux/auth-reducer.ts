import { authAPI } from "@/api/api"
import type { Dispatch } from "@reduxjs/toolkit"

type AuthType = {
  id: null | number
  email: string | null
  login: string | null
  isAuth: boolean
}

const initState: AuthType = {
  id: null,
  email: null,
  login: "samurai",
  isAuth: false,
}

export const authReducer = (state: AuthType = initState, action: ActionsTypes): AuthType => {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        ...action.data,
        isAuth: true,
      }
    }

    default: {
      return state
    }
  }
}

export type ActionsTypes = ReturnType<typeof setAuthUserDataAC>

// action creators
export const setAuthUserDataAC = (id: number, email: string, login: string) =>
  ({ type: "SET_USER_DATA", data: { id, email, login } }) as const

// thunk
export const getAuthUserDataTC = () => {
  return (dispatch: Dispatch) => {
    authAPI
      .me()
      .then((data) => {
        if (data.resultCode === 0) {
          let { id, email, login } = data.data
          dispatch(setAuthUserDataAC(id, email, login))
        }
      })
      .catch((error) => {
        console.error("Error fetching auth:", error)
      })
  }
}
