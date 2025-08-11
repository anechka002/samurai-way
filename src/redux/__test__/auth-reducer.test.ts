import { test, expect } from 'vitest';
import { authReducer, resetAuthUserDataAC, setAuthUserDataAC } from '../auth-reducer';

const initState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

test("should set users", () => {

  const action = setAuthUserDataAC(1, "test@example.com", "testUser");
  let newState = authReducer(initState, action)

  expect(newState.id).toBe(1);
  expect(newState.email).toBe("test@example.com");
  expect(newState.login).toBe("testUser");
  expect(newState.isAuth).toBe(true);
})

test("should reset user data", () => {
  const actionSet = setAuthUserDataAC(1, "test@example.com", "testUser");
  const stateWithUser = authReducer(initState, actionSet);

  const actionReset = resetAuthUserDataAC();
  const newState = authReducer(stateWithUser, actionReset);

  expect(newState).toEqual(initState);
});



