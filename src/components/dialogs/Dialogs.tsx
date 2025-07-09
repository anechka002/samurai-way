import s from './Dialogs.module.css';
import { Message } from './message/Message';
import { DialogItem } from './dialogItem/DialogItem';
import type { ChangeEvent } from 'react';
import { sendMessageAC, updateNewMessageTextAC } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export const Dialogs = () => {

  const messages = useAppSelector(state => state.dialogsPage.messages)
  const newMessage = useAppSelector(state => state.dialogsPage.newMessage)
  const users = useAppSelector(state => state.dialogsPage.users)

  const dispatch = useAppDispatch()

  const sendMessageHandler = () => {
    dispatch(sendMessageAC(newMessage));
  };

  const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNewMessageTextAC(e.currentTarget.value));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {users.map((user) => (
          <DialogItem key={user.id} user={user} />
        ))}
      </div>
      <div className={s.message}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div className={s.messageInput}>
          <textarea
            placeholder="Enter your message"
            value={newMessage}
            onChange={onMessageChangeHandler}
          ></textarea>
          <button onClick={sendMessageHandler}>send</button>
        </div>
      </div>
    </div>
  );
};
