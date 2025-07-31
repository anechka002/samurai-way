import s from "./Profile.module.css"
import { ProfileInfo } from "./profileInfo/ProfileInfo"
import { MyPostsContainer } from "./myPosts/MyPostsContainer"
import { useEffect } from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setUserProfileAC } from "@/redux/profile-reducer"
import { useParams } from "react-router"

export const Profile = () => {
  let { userId } = useParams<{userId: string}>(); // Получение параметра id
  const profile = useAppSelector((state) => state.profilePage.profile)
  // console.log('profile', profile)
  // console.log('userId', userId)

  // if(!userId) {
  //   userId = 2
  // }

  const numericUserId = parseInt(userId || "2", 10);

  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${numericUserId}`)
      .then((res) => {
      dispatch(setUserProfileAC(res.data))
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [numericUserId])

  return (
    <div className={s.profile}>
      <ProfileInfo profile={profile}/>
      <MyPostsContainer />
    </div>
  )
}
