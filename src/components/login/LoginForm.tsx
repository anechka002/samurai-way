import { useAppDispatch } from "@/hooks"
import { useForm, type SubmitHandler } from "react-hook-form"
import s from './Login.module.css'
import type { Inputs } from "@/types"
import { loginTC } from "@/redux/auth-reducer"

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { email: "", password: "MasteR!123", rememberMe: false } })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset()
    console.log(data)
    dispatch(loginTC(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Login" type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p className={s.errorMessage}>{errors.email.message}</p>}
      </div>
      <div>
        <input placeholder="Password" type="password" {...register("password", { required: "Password is required", minLength: 3, })} />
        {errors.password && <p className={s.errorMessage}>{errors.password.message}</p>}
      </div>
      <div>
        <input type="checkbox" /> remember me
      </div>
      <div>
        <button type="submit" >Login</button>
      </div>
    </form>
  )
}
