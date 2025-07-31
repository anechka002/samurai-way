
type AuthType = {
  id: null | number
  email: string | null 
  login: string | null 
  isAuth: boolean
}

const initState: AuthType = {
  id: null,
  email: null,
  login: 'samurai',
  isAuth: false
};

export const authReducer = (
  state: AuthType = initState,
  action: ActionsTypes
): AuthType => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        ...action.data,
        isAuth: true
      };
    }

    default: {
      return state;
    }
  }
};

export type ActionsTypes =
  | ReturnType<typeof setAuthUserDataAC>

  // action creators
export const setAuthUserDataAC = ( id: number, email: string, login: string ) => 
  ({ type: 'SET_USER_DATA', data: { id, email, login } } as const);



