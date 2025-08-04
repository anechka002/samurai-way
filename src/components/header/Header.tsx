import { useEffect } from 'react';
import s from './Header.module.css'
import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setAuthUserDataAC } from '@/redux/auth-reducer';
import { authAPI } from '@/api/api';

export const Header = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const login = useAppSelector(state => state.auth.login)

  useEffect(() => {
    authAPI.me()
      .then((data) => {
        if(data.resultCode === 0) {
          let {id, email, login} = data.data
          dispatch(setAuthUserDataAC(id, email, login))
        }
      })
      .catch((error) => {
        console.error('Error fetching auth:', error);
      });
  }, [])

  return (
    <header className={s.header}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58cCGmmFdKjaaU_otro1uki2TonktrPrTYg&usqp=CAU"
        alt=""
      />
      <div className={s.loginBlock}>
        {isAuth ? login : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  );
}

