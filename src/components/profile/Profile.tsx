import s from "./Profile.module.css"
import { ProfileInfo } from "./profileInfo/ProfileInfo"
import { MyPostsContainer } from "./myPosts/MyPostsContainer"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getUserProfileTC } from "@/redux/profile-reducer"
import { useParams } from "react-router"

export const Profile = () => {
  let { userId } = useParams<{userId: string}>(); // Получение параметра id
  const profile = useAppSelector((state) => state.profilePage.profile)

  // if(!userId) {
  //   userId = 2
  // }

  const numericUserId = parseInt(userId || "31217", 10);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserProfileTC(numericUserId))
  }, [numericUserId])

  return (
    <div className={s.profile}>
      <ProfileInfo profile={profile}/>
      <MyPostsContainer />
    </div>
  )
}
