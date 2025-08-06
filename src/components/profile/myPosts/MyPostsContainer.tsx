import { MyPosts } from "./MyPosts"
import { addPostAC } from "@/redux/profile-reducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import type { IForm } from "@/components/addMessageForm/AddMessageForm"

export const MyPostsContainer = () => {

  const posts = useAppSelector(state => state.profilePage.posts)

  const dispatch = useAppDispatch()

  const onClickAddPost = (data: IForm) => {
    dispatch(addPostAC(data.text))
  }

  return <MyPosts posts={posts} onClickAddPost={onClickAddPost}/>
}

