import type { RequestStatus } from "@/types"
import type { ThunkAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "./redux-store"
import { getAuthUserDataTC } from "./auth-reducer"

type AppType = {
  error: null | string 
  status: RequestStatus,
}

const initState: AppType = {
  error: null,
  status: 'idle' as RequestStatus,
}

export const appReducer = (state: AppType = initState, action: ActionsTypes): AppType => {
  switch (action.type) {
    case 'app/SET_ERROR': {
      return { ...state, error: action.payload.error }
    }
    case 'app/SET_STATUS': {
      return { ...state, status: action.payload.status }
    }
    default: {
      return state
    }
  }
}

export type ActionsTypes = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>

// action creators
export const setErrorAC = (payload: {error: null | string}) =>
  ({ type: "app/SET_ERROR", payload}) as const
export const setStatusAC = (payload: {status: RequestStatus}) =>
  ({ type: "app/SET_STATUS", payload}) as const

// thunk 
export const initialize = (): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => 
async(dispatch: AppDispatch) => {
  dispatch(setStatusAC({ status: 'loading' }));
  try {
    await dispatch(getAuthUserDataTC())
    dispatch(setStatusAC({ status: 'succeeded' }));
  } catch (error: any) {
    dispatch(setErrorAC({ error: error.message || 'Some error occurred' }));
    dispatch(setStatusAC({ status: 'failed' }));
    throw error; // Пробрасываем ошибку
  }
};