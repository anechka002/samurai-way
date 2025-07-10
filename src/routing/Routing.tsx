import { Routes, Route } from "react-router"
import { Dialogs, News, Profile, Users } from "@/components"
import { PATH } from "@/constants"

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.DIALOGS} element={<Dialogs />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.USERS} element={<Users />} />
      <Route path={PATH.NEWS} element={<News />} />
    </Routes>
  )
}
