import React, {Component} from 'react';
import classes from './Layout.css';
import Aux from '../../HOC/Aux';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

class Layout extends Component {
  state= {
    show: false
  }
  handler= {
    sideDrawer: () => {
      this.state.show ? this.setState({show: false}) : this.setState({show: true})
    }
  }
  render () {
    return (
      <Aux >
        <Toolbar
          open={this.state.show}
          close={this.handler.sideDrawer}/>
        <SideDrawer
          open={this.state.show}
          close={this.handler.sideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }

}

export default Layout;
