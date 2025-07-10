import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { profileReducer } from './profile-reducer'
import { dialogsReducer } from './dialogs-reducer'
import { usersReducer } from './users-reducer'

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer
})

// создание store
export const store = configureStore({
  reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store