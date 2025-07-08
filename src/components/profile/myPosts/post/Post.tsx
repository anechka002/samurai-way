import type { PostType } from '@/redux/store';
import s from './Post.module.css';

type PostPropsType = {
  post: PostType;
  // handleIncrementLikesCount: (postId: string) => void
};

export const Post = ({ post }: PostPropsType) => {
  // const onClickLikeCount = () => {
  //   handleIncrementLikesCount(post.id)
  // }

  return (
    <div className={s.post}>
      <div className={s.item}>
        <img src={post.img} />
        {post.message}
      </div>
      <div className={s.like}>
        <span>like: {post.likesCount} </span>
        {/* <span onClick={onClickLikeCount}>like: {post.likesCount} </span> */}
      </div>
    </div>
  );
};
