import { Routes, Route } from "react-router"
import { Dialogs, Login, News, Profile, ProtectedRoute, Users } from "@/components"
import { PATH } from "@/constants"
import { useAppSelector } from "@/hooks"

export const Routing = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  return (
    <Routes>
      {/* Private routes. Если пользователь не залогинен, то он не попадает в этот роуты  */}
      <Route element={<ProtectedRoute isAllowed={isAuth} redirectPath={PATH.LOGIN}/>}>
        <Route path={PATH.DIALOGS} element={<Dialogs />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={'/profile/:userId'} element={<Profile />} />
        <Route path={PATH.USERS} element={<Users />} />
      </Route>
      {/* Private routes. Если пользователь залогинен, то он не попадает в этот роут */}
      <Route element={<ProtectedRoute isAllowed={!isAuth} redirectPath={PATH.PROFILE}/>}>
        <Route path={PATH.LOGIN} element={<Login />} />
      </Route>

      <Route path={PATH.NEWS} element={<News />} />

    </Routes>
  )
}
