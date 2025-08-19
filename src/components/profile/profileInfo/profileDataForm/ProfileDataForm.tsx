import { useAppDispatch, useAppSelector } from "@/hooks"
import { saveProfileTC } from "@/redux/profile-reducer"
import type { Contacts, ProfileType } from "@/types"
import { useForm, type SubmitHandler } from "react-hook-form"
import s from './ProfileDataForm.module.css'

type Props = {
  profile: ProfileType
  setEditMode: (editMode: boolean) => void
}

export const ProfileDataForm = ({ profile, setEditMode }: Props) => {
    const dispatch = useAppDispatch()
    const contactKeys = Object.keys(profile.contacts) as Array<keyof Contacts>
  
    const error = useAppSelector(state => state.app.error)
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ProfileType>({defaultValues: {aboutMe: 'I am a frontend developer.', fullName: 'Anna_Blinova'}})
  
    const onSubmit: SubmitHandler<ProfileType> = (data) => {
      // reset()
      // debugger
      console.log(data)
      dispatch(saveProfileTC(data))
      .then(() => {
        setEditMode(false)
      })
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {error && <p className={s.errorMessage}>{error}</p>}
      </div>
      <div className={s.editForm}>
        <h4>Full name: </h4>
        <input placeholder="Full name" type="text" {...register("fullName", { required: "Full Name is required" })} />
        {errors.fullName && <span className={s.errorMessage}>{errors.fullName.message}</span>}
        <h4>Looking For A Job: <input {...register("lookingForAJob")} type="checkbox"/></h4>
        <h4>My professional skills: </h4>
        <textarea placeholder="My professional skills"
          {...register("lookingForAJobDescription", {
            required: "This is required.",
            minLength: { value: 2, message: "Minimum length is 2." },
          })}></textarea>
        {errors.lookingForAJobDescription && <span className={s.errorMessage}>{errors.lookingForAJobDescription.message}</span>}
        <h4>About me: </h4>
        <textarea placeholder="About me"
          {...register("aboutMe", {
            required: "This is required.",
            minLength: { value: 2, message: "Minimum length is 2." },
          })}></textarea>
        {errors.aboutMe && <span className={s.errorMessage}>{errors.aboutMe.message}</span>}  
      </div>

      <div>
        <h2 className={s.contactTitle}>Contacts:</h2>        
        {contactKeys.map((key) => {
          const value = profile.contacts[key]
          return <div className={s.contactItem} key={key}>
            <span>{key}: {' '} </span>
            <input 
              placeholder={key} 
              type="text" 
              {...register(`contacts.${key}` as const)} 
              defaultValue={value} 
            />
            {errors.contacts && errors.contacts[key] && (
              <p className={s.errorMessage}>{errors.contacts[key].message}</p>
            )}
          </div>
        })}
      </div>
      <button className={s.button} type="submit" onClick={()=> {}}>save</button>
    </form>
  )
}