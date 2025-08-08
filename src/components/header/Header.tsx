import s from './Header.module.css'
import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutTC } from '@/redux/auth-reducer';

export const Header = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const login = useAppSelector(state => state.auth.login)

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <header className={s.header}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58cCGmmFdKjaaU_otro1uki2TonktrPrTYg&usqp=CAU"
        alt=""
      />
      <div>
        {isAuth 
          ? <div className={s.loginBlock}>{login} <button onClick={logoutHandler}>Logout</button></div>  
          : <NavLink className={s.loginBlock} to={'/login'}><button >Login</button></NavLink>}
      </div>
    </header>
  );
}

