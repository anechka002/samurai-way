import s from "./Header.module.css"
import { NavLink } from "react-router"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { logoutTC } from "@/redux/auth-reducer"
import userPhoto from "../../assets/images/user.png"
import { getUsersTC } from "@/redux/users-reducer"

export const Header = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const login = useAppSelector((state) => state.auth.login)
  const profile = useAppSelector((state) => state.profilePage.profile)
  const currentPage = useAppSelector((state) => state.usersPage.currentPage)
  const pageSize = useAppSelector((state) => state.usersPage.pageSize)

  const logoutHandler = () => {
    dispatch(logoutTC()).then(() => {
      dispatch(getUsersTC(currentPage, pageSize))
    })
  }

  return (
    <header className={s.header}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58cCGmmFdKjaaU_otro1uki2TonktrPrTYg&usqp=CAU"
        alt=""
      />
      <div>
        {isAuth ? (
          <div className={s.loginBlock}>
            <img src={profile?.photos.small ? profile.photos.small : userPhoto} alt="" />
            {login} 
            <button onClick={logoutHandler}>Logout</button>
          </div>
        ) : (
          <NavLink className={s.loginBlock} to={"/login"}>
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </header>
  )
}
