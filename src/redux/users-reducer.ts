
type UserPhoto = {
  large: null | string
  small: null | string
}
type UsersType = {
  followed: boolean
  id: number
  name: string
  photos: UserPhoto
  status: string
  uniqueUrlName: null
}
type UsersPageType = {
  users: UsersType[] 
}

const initState: UsersPageType = {
  users: [],
};

export const usersReducer = (
  state: UsersPageType = initState,
  action: ActionsTypes
): UsersPageType => {
  switch (action.type) {
    case 'SET_USERS': {
      return {
        ...state,
        users: action.users
      };
    }
    case 'FOLLOW': {
      return {
        ...state,
        users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
      };
    }
    case 'UNFOLLOW': {
      return {
        ...state,
        users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
      };
    }
    default: {
      return state;
    }
  }
};

export type ActionsTypes =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>

  // action creators
export const followAC = ( userId: number ) =>
  ({ type: 'FOLLOW', userId} as const);
export const unfollowAC = (userId: number) =>
  ({ type: 'UNFOLLOW', userId } as const);
export const setUsersAC = (users: UsersType[]) =>
  ({ type: 'SET_USERS', users} as const);


