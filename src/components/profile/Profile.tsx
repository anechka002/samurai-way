import s from "./Profile.module.css"
import { ProfileInfo } from "./profileInfo/ProfileInfo"
import { MyPostsContainer } from "./myPosts/MyPostsContainer"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getStatusTC, getUserProfileTC } from "@/redux/profile-reducer"
import { useParams } from "react-router"

export const Profile = () => {
  let { userId } = useParams<{userId: string}>(); // Получение параметра id
  const profile = useAppSelector((state) => state.profilePage.profile)
  const authorizedUserId = useAppSelector(state => state.auth.id)

  const numericUserId = parseInt(userId || (authorizedUserId !== null ? authorizedUserId.toString() : '0'), 10);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserProfileTC(numericUserId))
    dispatch(getStatusTC(numericUserId))
  }, [numericUserId])

  return (
    <div className={s.profile}>
      <ProfileInfo isOwner={!userId} profile={profile} />
      <MyPostsContainer />
    </div>
  )
}
