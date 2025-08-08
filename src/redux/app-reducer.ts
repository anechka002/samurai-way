
type AppType = {
  error: null | string 
}

const initState: AppType = {
  error: null,
}

export const appReducer = (state: AppType = initState, action: ActionsTypes): AppType => {
  switch (action.type) {
    case 'SET_ERROR': {
      return { ...state, error: action.payload.error }
    }
    default: {
      return state
    }
  }
}

export type ActionsTypes = ReturnType<typeof setErrorAC> 

// action creators
export const setErrorAC = (payload: {error: null | string}) =>
  ({ type: "SET_ERROR", payload}) as const