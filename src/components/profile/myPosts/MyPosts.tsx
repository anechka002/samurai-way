import s from './MyPosts.module.css';
import { Post } from './post/Post';
import type { PostType } from '@/types';
import { AddMessageForm, type IForm } from '@/components/addMessageForm/AddMessageForm';

type Props = {
  posts: PostType[];
  onClickAddPost: (data: IForm) => void
};

export const MyPosts = ({ posts, onClickAddPost }: Props) => {

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <AddMessageForm onSubmit={onClickAddPost}/>
      <div className={s.posts}>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};
