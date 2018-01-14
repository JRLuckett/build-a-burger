import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './NavItem.css';

const navItem = ( props ) => {
  return (
    <li className={classes.NavItem}>
      <NavLink
        exact
        to={props.link}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  )
}
export default navItem
