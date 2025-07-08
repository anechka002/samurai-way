import { useState, type ChangeEvent, type KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import { Post } from './post/Post';
import { addPostAC, type ActionsTypes, type PostType } from '@/redux/store';

type Props = {
  posts: PostType[];
  newPostText: string;
  dispatch: (action: ActionsTypes) => void;
  // handleIncrementLikesCount: (postId: string) => void
};

export const MyPosts = ({ posts, dispatch, newPostText }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: e.currentTarget.value });
  };

  const onClickAddPostHandler = () => {
    let trimmedPostTitle = newPostText.trim();
    if (trimmedPostTitle) {
      // dispatch({type: 'ADD-POST', newPostText: trimmedPostTitle})
      dispatch(addPostAC(trimmedPostTitle));
    } else {
      setError('Title is required');
    }
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
            // handleIncrementLikesCount={handleIncrementLikesCount}
          />
        ))}
      </div>
    </div>
  );
};
