import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem'

const navItems = ( props ) => {
  return (
    <ul className={classes.NavItems}>
      <NavItem link='/' >Builder</NavItem>
      <NavItem link='/orders'>Orders</NavItem>
    </ul>
  )
}
export default navItems
