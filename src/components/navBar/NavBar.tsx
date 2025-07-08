import React from 'react';
import s from './NavBar.module.css'
import { NavLink } from 'react-router';
import { PATH } from '../../constans/constans';

export const NavBar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to={PATH.PROFILE} className = {({isActive}) => isActive ? s.active : s.item }>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={PATH.DIALOGS} className = {({isActive}) => isActive ? s.active : s.item }>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={PATH.NEWS} className = {({isActive}) => isActive ? s.active : s.item }>News</NavLink>
      </div>
      <div className={s.item}>
      <NavLink to={PATH.MUSIC} className = {({isActive}) => isActive ? s.active : s.item }>Music</NavLink>
      </div>
      <div className={s.item}>
      <NavLink to={PATH.SETTINGS} className = {({isActive}) => isActive ? s.active : s.item }>Settings</NavLink>
      </div>
    </nav>
  );
}