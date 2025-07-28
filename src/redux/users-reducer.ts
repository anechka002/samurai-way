
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
  pageSize: number 
  totalUsersCount: number
  currentPage: number
}

const initState: UsersPageType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
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
    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.totalCount
      }
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
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setTotalUsersCountAC>

  // action creators
export const followAC = ( userId: number ) =>
  ({ type: 'FOLLOW', userId} as const);
export const unfollowAC = (userId: number) =>
  ({ type: 'UNFOLLOW', userId } as const);
export const setUsersAC = (users: UsersType[]) =>
  ({ type: 'SET_USERS', users} as const);
export const setCurrentPageAC = (currentPage: number) =>
  ({ type: 'SET_CURRENT_PAGE', currentPage} as const);
export const setTotalUsersCountAC = (totalCount: number) =>
  ({ type: 'SET_TOTAL_USERS_COUNT', totalCount} as const);


