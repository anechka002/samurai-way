import { useState } from "react"
import { MyPosts } from "./MyPosts"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { addPostAC, updateNewPostTextAC } from "@/redux/profile-reducer"

export const MyPostsContainer = () => {

  const newPostText = useAppSelector(state => state.profilePage.newPostText)
  const posts = useAppSelector(state => state.profilePage.posts)

  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)

  const onPostChange = (text: string) => {
    dispatch(updateNewPostTextAC(text))
  }

  const onClickAddPost = () => {
    let trimmedPostTitle = newPostText.trim()
    if (trimmedPostTitle) {
      dispatch(addPostAC(trimmedPostTitle))
    } else {
      setError("Title is required")
    }
  }

  return <MyPosts newPostText={newPostText} error={error} setError={setError} posts={posts} onPostChange={onPostChange} onClickAddPost={onClickAddPost}/>
}

