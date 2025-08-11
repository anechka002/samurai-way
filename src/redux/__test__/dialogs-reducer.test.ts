import { nanoid } from "@reduxjs/toolkit"
import { test, expect } from 'vitest';
import { dialogsReducer, sendMessageAC } from "../dialogs-reducer";

const initState = {
  users: [
    { id: 1, name: 'Sveta', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 2, name: 'Anna', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 3, name: 'Viktor', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 4, name: 'Valera', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 5, name: 'Alex', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
    { id: 6, name: 'John', followed: false, status: 'is online', photos: { small: null, large: null }, uniqueUrlName: null },
  ],
  messages: [
    { id: nanoid(), text: 'Hi' },
    { id: nanoid(), text: 'Hello' },
    { id: nanoid(), text: 'Ok' },
    { id: nanoid(), text: 'Yo' },
  ],
};

test("sending a new message should add it to messages array", () => {

  const action = sendMessageAC("Hello")
  let newState = dialogsReducer(initState, action)

  expect(newState.messages.length).toBe(5) 
  expect(newState.messages[0].text).toBe('Hello') 
})

test("new message should have a unique id", () => {

  const action = sendMessageAC("Another message");
  const newState = dialogsReducer(initState, action);

  expect(newState.messages[0].id).not.toBe(initState.messages[0].id); // Проверяем, что id нового сообщения не совпадает с первым сообщением
});


