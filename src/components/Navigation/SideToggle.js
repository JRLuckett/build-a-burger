import React from 'react';

const sideToggle = ( props ) => {
  return (
    <div onClick={props.clicked}>
      <i className="fa fa-bars" aria-hidden="true"></i>
    </div>
  )
}

export default sideToggle
