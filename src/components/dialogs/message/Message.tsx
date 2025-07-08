import type { MessageType } from '@/redux/store';
import s from './Message.module.css';

type PropsType = {
  message: MessageType;
};

export const Message = ({ message }: PropsType) => {
  return <div className={s.message}>{message.text}</div>;
};
