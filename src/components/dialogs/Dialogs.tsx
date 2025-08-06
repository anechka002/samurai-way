import s from './Dialogs.module.css';
import { Message } from './message/Message';
import { DialogItem } from './dialogItem/DialogItem';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { sendMessageAC } from '@/redux/dialogs-reducer';
import { AddMessageForm, type IForm } from '../addMessageForm/AddMessageForm';

export const Dialogs = () => {

  const messages = useAppSelector(state => state.dialogsPage.messages)
  const users = useAppSelector(state => state.dialogsPage.users)

  const dispatch = useAppDispatch()

  const addNewMessage = (data: IForm) => {
    dispatch(sendMessageAC(data.text));
    // alert(data.text)
  }

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
          <AddMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};
