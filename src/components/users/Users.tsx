import { useAppDispatch, useAppSelector } from "@/hooks"
import s from "./Users.module.css"
import { getUsersTC, setCurrentPageAC } from "@/redux/users-reducer"
import { useEffect } from "react"
import { Preloader } from "../common/preloader/Preloader"
import { Paginator } from "../common/pagination/Paginator"
import { User } from "./User"

export const Users = () => {
  const users = useAppSelector((state) => state.usersPage.users)
  const pageSize = useAppSelector((state) => state.usersPage.pageSize)
  const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount)
  const currentPage = useAppSelector((state) => state.usersPage.currentPage)
  const isFetching = useAppSelector((state) => state.usersPage.isFetching)
  const followingInProgress = useAppSelector((state) => state.usersPage.followingInProgress)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsersTC(currentPage, pageSize))
  }, [currentPage, pageSize])

  const pagesCount = Math.ceil(totalUsersCount / pageSize)

  const onPageChangedHandler = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    dispatch(setCurrentPageAC(pageNumber))
  }

  return (
    <div className={s.users}>
      <div>Users</div>

      {isFetching ? (
        <Preloader />
      ) : (
        <>
          {users.map((u) => ( <User key={u.id} user={u} followingInProgress={followingInProgress}/>))}
        </>
      )}

      <div className={s.pages}>
        <Paginator count={pagesCount} page={currentPage} onChange={onPageChangedHandler} />
      </div>
    </div>
  )
}
