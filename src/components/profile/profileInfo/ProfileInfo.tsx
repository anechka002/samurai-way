import { Preloader } from "@/components/common/preloader/Preloader"
import s from "./ProfileInfo.module.css"
import type { ProfileType } from "@/types"
import { ProfileStatus } from "./ProfileStatus"
import { useAppSelector } from "@/hooks"
import userPhoto from "../../../assets/images/user.png"

type Props = {
  profile: ProfileType | null
}

export const ProfileInfo = ({ profile }: Props) => {
  const status = useAppSelector((state) => state.profilePage.status)

  if (!profile) {
    return <Preloader />
  }
  return (
    <>
      <div>
        {/* <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="img"
        /> */}
      </div>
      <h2 className={s.name}>{profile.fullName}</h2>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large !== null ? profile.photos.large : userPhoto} alt="photo" />
        <div className={s.profileBlock}>
          <ProfileStatus status={status} />
          <h3>{profile.aboutMe}</h3>
          <h4>Contacts:</h4>
          <span>facebook: {profile.contacts.facebook}</span>
          <span>github: {profile.contacts.github}</span>
          <span>instagram: {profile.contacts.instagram}</span>
          <span>vk: {profile.contacts.vk}</span>
          <span>twitter: {profile.contacts.twitter}</span>
          <span>looking For A Job: {profile.lookingForAJobDescription}</span>
        </div>
      </div>
    </>
  )
}
