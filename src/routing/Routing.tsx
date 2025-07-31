import { Routes, Route } from "react-router"
import { Dialogs, Login, News, Profile, Users } from "@/components"
import { PATH } from "@/constants"

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.DIALOGS} element={<Dialogs />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={'/profile/:userId'} element={<Profile />} />
      <Route path={PATH.USERS} element={<Users />} />
      <Route path={PATH.NEWS} element={<News />} />
      <Route path={PATH.LOGIN} element={<Login />} />
    </Routes>
  )
}
