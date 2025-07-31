import { Preloader } from '@/components/preloader/Preloader';
import s from './ProfileInfo.module.css'
import type { ProfileType } from '@/types';

type Props = {
  profile: ProfileType | null
}

export const ProfileInfo = ({profile}: Props) => {
  if(!profile){
    return <Preloader/>
  }
  return (
    <>
      <div>
        <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="img"
        />
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large}/>
        <div className={s.profileBlock}>
          <h2>{profile.fullName}</h2>
          <h3>{profile.aboutMe}</h3>
          <h4>Contacts:</h4>
          <span>{profile.contacts.facebook}</span>
          <span>{profile.contacts.github}</span>
          <span>{profile.contacts.instagram}</span>
          <span>{profile.contacts.vk}</span>
          <span>{profile.contacts.twitter}</span>
          <span>{profile.lookingForAJobDescription}</span>
        </div>
      </div>
    </>
  );
};
