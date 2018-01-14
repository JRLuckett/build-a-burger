import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../HOC/Aux';
import Backdrop from './Backdrop'

class Modal extends Component{
  //this updates the modal only if its 'show' prop changes or the modal's child changes, otherwise the modal is not re-rendered and `OrderSummary`, a child of the modal, is not updated
  //this saves the application from unneccessary work 
  shouldComponentUpdate(nextProps, nextState) {
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.closed}/>
        <div
          className={classes.Modal}
          style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? '1' : '0'}}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal
