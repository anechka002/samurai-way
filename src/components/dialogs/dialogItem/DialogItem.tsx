import { NavLink } from 'react-router';
import s from '../Dialogs.module.css';
import type { UsersType } from '@/redux/users-reducer';

type PropsType = {
  user: UsersType;
};

export const DialogItem = ({ user }: PropsType) => {
  let path = '/dialogs/' + user.id;
  return (
    <div className={s.dialogItem}>
      {/* <div className={s.dialogItem + ' ' + s.active}>{user.name}</div> */}
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.dialog} ${s.active}` : s.dialog
        }
        to={path}
      >
        {user.name}
      </NavLink>
    </div>
  );
};
