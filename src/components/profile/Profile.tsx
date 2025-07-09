import s from './Profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';
import { MyPostsContainer } from './myPosts/MyPostsContainer';

export const Profile = () => {
  return (
    <div className={s.profile}>
      <ProfileInfo />
      <MyPostsContainer/>
    </div>
  );
};
