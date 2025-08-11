import { test, expect } from 'vitest';
import { appReducer, setErrorAC, setStatusAC } from '../app-reducer';
import type { RequestStatus } from '@/types';

const initState = {
  error: null,
  status: 'idle' as RequestStatus
}

test("should set error", () => {

  const action = setErrorAC({ error: "Some error occurred" });
  let newState = appReducer(initState, action)

  expect(newState.error).toBe("Some error occurred");
})

test("should set status", () => {
  const action = setStatusAC({ status: 'loading' });
  const newState = appReducer(initState, action);

  expect(newState.status).toBe('loading');
});


