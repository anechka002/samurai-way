import { Routes, Route } from "react-router"
import { Login, News, ProtectedRoute } from "@/components"
import { PATH } from "@/constants"
import { useAppSelector } from "@/hooks"
import { Preloader } from "@/components/common"
import { lazy, Suspense } from "react"

const Users = lazy(() => import("../components/users/Users")
    .then(module => ({ default: module.Users })));
const Dialogs = lazy(() => import("../components/dialogs/Dialogs")
    .then(module => ({ default: module.Dialogs })));
const Profile = lazy(() => import("../components/profile/Profile")
    .then(module => ({ default: module.Profile })));


export const Routing = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  return (
    <Suspense fallback={ <div><Preloader /></div>}>

      <Routes>
        {/* Private routes. Если пользователь не залогинен, то он не попадает в этот роуты  */}
        <Route element={<ProtectedRoute isAllowed={isAuth} redirectPath={PATH.LOGIN} />}>
          <Route path={PATH.DIALOGS} element={<Dialogs />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={"/profile/:userId"} element={<Profile />} />
        </Route>
        {/* Private routes. Если пользователь залогинен, то он не попадает в этот роут */}
        <Route element={<ProtectedRoute isAllowed={!isAuth} redirectPath={PATH.PROFILE} />}>
          <Route path={PATH.LOGIN} element={<Login />} />
        </Route>

        <Route path={PATH.USERS} element={<Users />} />
        <Route path={PATH.NEWS} element={<News />} />
      </Routes>
    </Suspense>
  )
}
