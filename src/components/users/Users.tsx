import { useAppDispatch, useAppSelector } from "@/hooks"
import s from "./Users.module.css"
import { followAC, setUsersAC, unfollowAC } from "@/redux/users-reducer"
import { useEffect } from "react"
import axios from "axios"
import userPhoto from '../../assets/images/user.png'

export const Users = () => {
  const users = useAppSelector((state) => state.usersPage.users)

  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(res => {
      console.log(res.data.items)
      dispatch(setUsersAC(res.data.items))
    })
    // dispatch(
    //   setUsersAC([
    //     {
    //       id: nanoid(),
    //       photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGudC4lC7QWrwolFFMWxFs2QW_IfWR965AXw&s",
    //       followed: true,
    //       name: "Anna",
    //       status: "I am boss!",
    //       location: { city: "Almaty", country: "Kazakhstan" },
    //     },
    //     {
    //       id: nanoid(),
    //       photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXYJjodFz_K34O-knK2K_A80iwv4007bb3Q&s",
    //       followed: true,
    //       name: "Vika",
    //       status: "I am so pretty",
    //       location: { city: "Moscow", country: "Russia" },
    //     },
    //     {
    //       id: nanoid(),
    //       photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByFCks-L2CzaZwcNeur-Fy-YxXwprUyUOvw&s",
    //       followed: false,
    //       name: "Sergey",
    //       status: "Hello",
    //       location: { city: "Minsk", country: "Belarus" },
    //     },
    //     {
    //       id: nanoid(),
    //       photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR32g-r99Tc-rrI29wlHF-FVF6P-thIEKgU0w&s",
    //       followed: false,
    //       name: "Artur",
    //       status: "I like football!!!",
    //       location: { city: "Philadelphia", country: "United States" },
    //     },
    //   ]),
    // )
  }, [])

  return (
    <div>
      Users
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
