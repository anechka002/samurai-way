import type { ActionsTypes, ProfilePageType } from '@/redux/store';
import s from './Profile.module.css';
import { MyPosts } from './myPosts/MyPosts';
import { ProfileInfo } from './profileInfo/ProfileInfo';

type Props = {
  state: ProfilePageType;
  dispatch: (action: ActionsTypes) => void;
  // handleIncrementLikesCount: (postId: string) => void
};

export const Profile = ({ state, dispatch }: Props) => {
  return (
    <div className={s.profile}>
      <ProfileInfo />
      <MyPosts
        dispatch={dispatch}
        newPostText={state.newPostText}
        posts={state.posts}
      />
    </div>
  );
};
