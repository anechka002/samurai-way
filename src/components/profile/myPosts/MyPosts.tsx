import { type ChangeEvent, type KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import { Post } from './post/Post';
import { type PostType } from '@/redux/store';

type Props = {
  posts: PostType[];
  newPostText: string;
  onPostChange: (text: string) => void
  onClickAddPost: () => void
  error: string | null
  setError: (value: string | null) => void
};

export const MyPosts = ({ posts, newPostText, onPostChange, onClickAddPost, error, setError }: Props) => {

  const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onPostChange(e.currentTarget.value)
  };

  const onClickAddPostHandler = () => {
    onClickAddPost()
  };

  const onKeyDownAddPostHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      onClickAddPostHandler();
    }
  };

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <div className={s.postInput}>
        <textarea
          className={error ? s.inputError : ''}
          value={newPostText}
          onChange={onPostChangeHandler}
          onKeyDown={onKeyDownAddPostHandler}
        />
        <button onClick={onClickAddPostHandler}>Add Post</button>
        {error && <div className={s.inputErrorMessage}>{error}</div>}
      </div>

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
