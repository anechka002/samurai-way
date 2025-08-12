import { useAppDispatch } from "@/hooks"
import s from "./Users.module.css"
import { followTC, unfollowTC, type UsersType } from "@/redux/users-reducer"
import userPhoto from "../../assets/images/user.png"
import { NavLink } from "react-router"

type Props = {
  user: UsersType
  followingInProgress: number[]
}

export const User = ({user, followingInProgress}: Props) => {

  const dispatch = useAppDispatch()

  return (
    <div className={s.container}>
      <div className={s.users}>
        <NavLink to={"/profile/" + user.id}>
          <img className={s.usersPhoto} src={user.photos.small !== null ? user.photos.small : userPhoto} alt="photo" />
        </NavLink>
        <div>
          {user.followed ? (
            <button
              className={s.button}
              disabled={followingInProgress.some((el) => el === user.id)}
              onClick={() => {
                dispatch(unfollowTC(user.id))
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={s.button}
              disabled={followingInProgress.some((el) => el === user.id)}
              onClick={() => {
                dispatch(followTC(user.id))
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>

      <div className={s.description}>
        <div>
          <div className={s.name}>{user.name}</div>
          <div>{user.status}</div>
        </div>
        <div className={s.location}>
          {/* <div className={s.city}>{u.location.city}</div> */}
          {/* <div>{u.location.country}</div> */}
        </div>
      </div>
    </div>
  )
}
