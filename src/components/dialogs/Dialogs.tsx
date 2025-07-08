import s from './Dialogs.module.css';
import { Message } from './message/Message';
import { DialogItem } from './dialogItem/DialogItem';
import type { ChangeEvent } from 'react';
import { sendMessageAC, updateNewMessageTextAC, type ActionsTypes, type DialogPageType } from '@/redux/store';

type Props = {
  state: DialogPageType;
  dispatch: (action: ActionsTypes) => void;
};

export const Dialogs = ({ state, dispatch }: Props) => {
  const sendMessageHandler = () => {
    dispatch(sendMessageAC(state.newMessage));
  };

  const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNewMessageTextAC(e.currentTarget.value));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {state.users.map((user) => (
          <DialogItem key={user.id} user={user} />
        ))}
      </div>
      <div className={s.message}>
        {state.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div className={s.messageInput}>
          <textarea
            placeholder="Enter your message"
            value={state.newMessage}
            onChange={onMessageChangeHandler}
          ></textarea>
          <button onClick={sendMessageHandler}>send</button>
        </div>
      </div>
    </div>
  );
};
