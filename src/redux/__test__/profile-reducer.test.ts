import { addPostAC, deletePostAC, profileReducer } from "../profile-reducer"
import { nanoid } from "@reduxjs/toolkit"
import { test, expect } from 'vitest';

const initState = {
  posts: [
    {
      id: nanoid(),
      img: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png",
      message: "I'm learn React",
      likesCount: 5,
    },
    {
      id: nanoid(),
      img: "https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png",
      message: "Hello, how are you?",
      likesCount: 10,
    },
  ],
  profile: null,
  status: "",
}

test("new post should be added", () => {

  const action = addPostAC("Hello")
  let newState = profileReducer(initState, action)

  expect(newState.posts.length).toBe(3)
})

test("message new post should be correct", () => {

  const action = addPostAC("Hello")
  let newState = profileReducer(initState, action)

  expect(newState.posts[0].message).toBe("Hello")
})

test("after deleting length of message should be decrement", () => {

  const action = deletePostAC(initState.posts[0].id)
  let newState = profileReducer(initState, action)

  expect(newState.posts.length).toBe(1) 
})

test("after deleting length shouldn't be decrement if id is incorrect", () => {

  const action = deletePostAC('1000')
  let newState = profileReducer(initState, action)

  expect(newState.posts.length).toBe(2) 
})
