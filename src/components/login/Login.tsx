import { LoginForm } from "./LoginForm"
import s from './Login.module.css'

export const Login = () => {

  return (
    <div className={s.container}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}
