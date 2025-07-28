import { useAppDispatch, useAppSelector } from "@/hooks"
import s from "./Users.module.css"
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC } from "@/redux/users-reducer"
import { useEffect } from "react"
import axios from "axios"
import userPhoto from '../../assets/images/user.png'

export const Users = () => {
  const users = useAppSelector((state) => state.usersPage.users)
  const pageSize = useAppSelector((state) => state.usersPage.pageSize)
  const totalUsersCount = useAppSelector((state) => state.usersPage.totalUsersCount)
  const currentPage = useAppSelector((state) => state.usersPage.currentPage)

  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`).then(res => {
      dispatch(setUsersAC(res.data.items))
      dispatch(setTotalUsersCountAC(res.data.totalCount))
    })
  }, [currentPage, pageSize])

  const visiblePagesCount = 1;
  const pagesCount = Math.ceil(totalUsersCount / pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    if (
      i <= visiblePagesCount || // Первые страницы
      i > pagesCount - visiblePagesCount || // Последние страницы
      (i >= currentPage - visiblePagesCount && i <= currentPage + visiblePagesCount) // Страницы вокруг текущей
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...'); // Добавляем многоточие
    }
  }

  const onPageChangedHandler = (pageNumber: number) => {
    dispatch(setCurrentPageAC(pageNumber))
    // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`).then(res => {
    //   dispatch(setUsersAC(res.data.items))
    // })
  }

  return (
    <div>
      Users
      <div>
        {pages.map((p) => {
          return <button 
                    key={p}
                    onClick={() => typeof p === 'number' && onPageChangedHandler(p)} 
                    className={currentPage === p ? s.selectedPage : ''}
                    disabled={p === '...'}
                  >{p}</button>
        })}
      </div>
      {users.map((u) => (
        <div key={u.id} className={s.container}>
          <div className={s.users}>
            <img className={s.usersPhoto} src={u.photos.small !== null ? u.photos.small : userPhoto} alt="photo" />
            <div>
              {u.followed ? (
                <button
                  className={s.button}
                  onClick={() => {
                    dispatch(unfollowAC(u.id))
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={s.button}
                  onClick={() => {
                    dispatch(followAC(u.id))
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className={s.description}>
            <div>
              <div className={s.name}>{u.name}</div>
              <div>{u.status}</div>
            </div>
            <div className={s.location}>
              {/* <div className={s.city}>{u.location.city}</div> */}
              {/* <div>{u.location.country}</div> */}
            </div>
          </div>

        </div>
      ))}
    </div>
  )
}
