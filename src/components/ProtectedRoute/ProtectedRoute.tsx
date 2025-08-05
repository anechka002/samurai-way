import { PATH } from "@/constants"
import type { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({children, isAllowed, redirectPath = PATH.LOGIN}: Props) => {

  if(!isAllowed){
    return <Navigate to={redirectPath}/>
  }

  return children ? children : <Outlet/>
}
