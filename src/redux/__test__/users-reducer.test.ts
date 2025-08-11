import { test, expect } from 'vitest';
import { followAC, setUsersAC, toggleIsFetchingAC, unfollowAC, usersReducer } from '../users-reducer';

const initState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

test("should set users", () => {

  const action = setUsersAC([{ id: 3, name: 'Viktor', followed: false, photos: { large: null, small: null }, status: 'is online', uniqueUrlName: null }]);
  let newState = usersReducer(initState, action)

  expect(newState.users.length).toBe(1) 
  expect(newState.users[0].name).toBe('Viktor') 
})

test("should follow a user", () => {
  const setUsersAction = setUsersAC([{ id: 3, name: 'Viktor', followed: false, photos: { large: null, small: null }, status: 'is online', uniqueUrlName: null }]);
  let newState = usersReducer(initState, setUsersAction);
  const action = followAC(1);
  newState = usersReducer(newState, action);

  expect(newState.users[0].followed).toBe(false);
});

test("should unfollow a user", () => {
  const setUsersAction = setUsersAC([{ id: 3, name: 'Viktor', followed: false, photos: { large: null, small: null }, status: 'is online', uniqueUrlName: null }]);
  let newState = usersReducer(initState, setUsersAction);
  const actionFollow = followAC(1);
  newState = usersReducer(newState, actionFollow);
  const actionUnfollow = unfollowAC(1);
  newState = usersReducer(newState, actionUnfollow);

  expect(newState.users[0].followed).toBe(false);
});

test("should toggle isFetching", () => {
  const action = toggleIsFetchingAC(true);
  const newState = usersReducer(initState, action);

  expect(newState.isFetching).toBe(true);
});



