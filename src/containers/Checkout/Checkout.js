import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import SummaryForm from '../../components/SummaryForm/SummaryForm'
import ContactData from './ContactData'

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    price: 3.99
  }
  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search)
    let ingredients = {}
    let price = 0
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients: ingredients, price: price})
    console.log(price);
  }
  checkoutCanceledHandler = () => {
    console.log('cancel clicked');
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    console.log('submit clicked');
    this.props.history.replace('/checkout/contact-data')
  }
  render() {
    return (
      <div>
        <SummaryForm
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          //'render' is passed a function with the `ContactData` component to be rendered.  Using  `rendeer` in place of `component` allows props tp be passed along with the component.  `{...props}` passes all props onto the `ContactData` component, allowing that component access to `props.history.push()`
          render={(props) => (<ContactData ingredients ={this.state.ingredients} price={this.state.price} {...props}/>)}
        />
      </div>
    )
  }
}

export default Checkout
