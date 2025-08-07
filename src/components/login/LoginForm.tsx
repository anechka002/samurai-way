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
    // console.log(data)
    dispatch(loginTC(data))
  }
  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input className={s.login} placeholder="Login" type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p className={s.errorMessage}>{errors.email.message}</p>}
      </div>
      <div>
        <input className={s.login} placeholder="Password" type="password" {...register("password", { required: "Password is required", minLength: 3, })} />
        {errors.password && <p className={s.errorMessage}>{errors.password.message}</p>}
      </div>
      <div className={s.checkboxContainer}>
        <input className={s.checkbox} type="checkbox" />
        <span> remember me</span>
      </div>
      <div>
        <button className={s.button} type="submit" >Login</button>
      </div>
    </form>
  )
}
