import { Preloader } from "@/components/common/preloader/Preloader"
import s from "./ProfileInfo.module.css"
import type { Contacts, ProfileType } from "@/types"
import { ProfileStatus } from "./ProfileStatus"
import { useAppSelector } from "@/hooks"
import { AddPhoto } from "./addPhoto/AddPhoto"
import { useState } from "react"
import { ProfileDataForm } from "./profileDataForm/ProfileDataForm"
import userPhoto from "../../../assets/images/user.png"

type Props = {
  profile: ProfileType | null
  isOwner: boolean
}

export const ProfileInfo = ({ profile, isOwner }: Props) => {
  const status = useAppSelector((state) => state.profilePage.status)

  const [editMode, setEditMode] = useState<boolean>(false)

  if (!profile) {
    return <Preloader />
  }

  const goToEditModeHandler = () => {
    setEditMode(true)
  }

  return (
    <>
      <div>
        {/* <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="img"
        /> */}
      </div>
      <div className={s.container}>
        <h3 className={s.name}>{profile.fullName}</h3>
        <ProfileStatus status={status} />
      </div>
      <div className={s.descriptionBlock}>
        <div className={s.avatarContainer}>
          <img src={profile.photos.large || userPhoto} alt="photo" className={s.avatar} />

          {isOwner && <AddPhoto />}
        </div>

        <div>
          {editMode ? (
            <ProfileDataForm profile={profile} setEditMode={setEditMode} />
          ) : (
            <ProfileData goToEditModeHandler={goToEditModeHandler} isOwner={isOwner} profile={profile} />
          )}
        </div>
      </div>
    </>
  )
}

type ProfileDataProps = {
  profile: ProfileType
  goToEditModeHandler: () => void
  isOwner: boolean
}

const ProfileData = ({ profile, goToEditModeHandler, isOwner }: ProfileDataProps) => {
  // Получаем ключи из Contacts
  const contactKeys = Object.keys(profile.contacts) as Array<keyof Contacts>

  return (
    <div className={s.profileData}>
      <div>
        <h3 className={s.aboutMe}>About me: <span>{profile.aboutMe}</span></h3>        
        <h3 className={s.aboutMe}>Looking For A Job: <span>{profile.lookingForAJob ? "yes" : "no"}</span></h3>
        <h3 className={s.aboutMe}>My professional skills: <span>{profile.lookingForAJobDescription}</span></h3>
        {/* {profile.lookingForAJob && } */}
      </div>
      <h3>Contacts: {isOwner && <button className={s.button} onClick={goToEditModeHandler}>edit</button>}</h3>
      {contactKeys.map((key) => {
        const value = profile.contacts[key]
        return <Contact key={key} contactTitle={key} contactValue={value} />
      })}
    </div>
  )
}

type PropsContact = {
  contactTitle: string
  contactValue: string | undefined
}

const Contact = ({ contactTitle, contactValue }: PropsContact) => {
  return (
    <div>
      <h4 className={s.contact}>{contactTitle}: <span>{contactValue}</span></h4>
    </div>
  )
}
