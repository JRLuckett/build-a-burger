import React from 'react';
import classes from './Toolbar.css'
import Logo from '../UI/Logo'
import NavItems from './NavItems'
import SideToggle from './SideToggle';

const toolbar = ( props ) => {
  return ( props.open ?
    <header className={classes.Toolbar}>
        <Logo height='80%'/>
        <nav className={classes.Desktop}>
          <NavItems />
        </nav>
      </header>
      :
      <header className={classes.Toolbar}>
        <SideToggle clicked={props.close}/>
        <Logo height='80%'/>
        <nav className={classes.Desktop}>
          <NavItems />
        </nav>
      </header>
  )
}

export default toolbar
