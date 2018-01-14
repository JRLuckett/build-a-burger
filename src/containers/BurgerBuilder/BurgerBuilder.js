import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionsTypes from '../../store/actions'
import Aux from '../../HOC/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/LoadingSpinner'
import ErrorHandler from '../../HOC/ErrorHandler'
import axiosInstance from '../../axios-orders'


class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    order: false,
    loading: false,
    error: false
  }

  //when mounting axios requests firebase for its 'ingredients' data
  componentDidMount() {
      //the .json node extension in the post is only necessary if using Firebase
      axiosInstance.get('/ingredients.json')
        .then(response => {
          //sets state 'ingredients' to response.data
          this.setState({ingredients: response.data})
        })
        .catch(error => {
          //if error, then 'error' in state is set to true
          this.setState({error: true})
        })
  }

  handler = {
    //when additional ingredients are added to the burger
    // addIngredient: ( type ) => {
    //   //the previous number of the ingredient 'type' clicked is stored
    //   const old = this.props.ings[type];
    //   //that stored number is incremented by 1
    //   const added = old + 1
    //   //a copy of the classes state is created with the spread operator
    //   const updatedIngredients = {
    //     ...this.props.ings
    //   };
    //   //the copied state ingredient being clicked is set equal to the updated quantity
    //   updatedIngredients[type] = added;
    //   //the price of the ingredient clicked is stored
    //   const price = INGREDIENT_PRICES[type]
    //   //the current state price is stored
    //   const oldPrice = this.props.price
    //   //the ingredients price is added to the total
    //   const newPrice = oldPrice + price;
    //   //both the state's price and number of ingredients are updated
    //   this.setState({
    //     total: newPrice, ingredients:updatedIngredients
    //   })
    //   //if the state's total is greater or equal to 4 then the burger checkout button is activated
    //   if (this.props.price >= 4) {
    //     this.setState({ purchasable: true })
    //   } else {
    //     this.setState({ purchasable: false })
    //   }
    // },

    //when ingredients are subtracted from the burger
    // subtractIngredient: ( type ) => {
    //   const old = this.props.ings[type];
    //   //if the number of the ingredient clicked is already 0 then the method is returned without further opperations or else the application breaks
    //   if (old <= 0) {
    //     return;
    //   }
    //   const subtracted = old - 1
    //   const updatedIngredients = {
    //     ...this.props.ings
    //   };
    //   updatedIngredients[type] = subtracted;
    //   const price = INGREDIENT_PRICES[type]
    //   const oldPrice = this.props.price
    //   const newPrice = oldPrice - price;
    //   this.setState({
    //     total: newPrice, ingredients:updatedIngredients
    //   })
    //   if (this.props.price >= 4 ) {
    //     this.setState({ purchasable: true})
    //   } else {
    //     this.setState({ purchasable: false})
    //   }
    // },

    updatePurchaseState ( ingredients ) {
      const sum = Object.keys( ingredients )
        .map( key => {
          return ingredients[key]
        })
        .reduce( (sum,el) => {
          return sum + el
        }, 0)
        return sum > 0
    },

    //shows 'checkout' UI modal
    purchaseBurger: () => {
      this.setState({
        order: true
      })
    },

    //hides 'checkout' UI modal
    cancelBurger: () => {
      this.setState({
        order: false
      })
    },

    //sends `ingredients` through the URL to the `checkout` path
    finishPurchase: () => {
      let queryParams = []
      //looping through the `ingredients` with for loop
      for (let i in this.props.ings) {
        //pushing each `ingredient` and the value to `queryParams` so in the array it is a string of `ingredient = amount`
        //the `encodeURIComponent` is a JS helper function that encodes any element passed to it so that it can be used in the URL
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
      }
      //adding the burger price to the `queryParam` array so that it can be passed in the URL
      queryParams.push('price='+ this.props.price)
      //joining each string in 'queryParams' with '&'
      const queryString = queryParams.join('&')
      //pushes the 'pathname' and 'search' values to the URL as `/checkout?salad=1&cheese=1&meat=1&bacon=0`
      this.props.history.push({
          pathname: '/checkout',
          search: '?' + queryString
      })
    }
  }

  render () {
    //coppies the ingredients from the state
    const disableinfo = {
      ...this.props.ings
    }
    for (let key in disableinfo) {
      disableinfo[key] = disableinfo[key] <= 0
    }
    //creates an 'orderSummary' variable that will change based the ingredients state
    let orderSummary = null;
    //if 'error'is true, then the message is printed, if false, then the UI spinner is mounted
    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients Can't Be Loaded.</p> : <Spinner />
    //if the ingredients are successfully returned by firebase
    if (this.props.ings) {
      //'burger' is now populated with 'Burger' component and 'BuildControls' component
      burger = (
        <Aux>
          {/* the component that shows the burger being built */}
          <Burger
            ingredients={this.props.ings}
          />
          {/* the component that shows the build controls */}
          <BuildControls
            ingredients={this.props.ings}
            price={this.props.price}
            purchasable={this.handler.updatePurchaseState(this.props.ings)}
            less={this.props.onIngredientRemoved}
            more={this.props.onIngredientAdded}
            disable={disableinfo}
            ordering={this.handler.purchaseBurger}
          />
        </Aux>
      );
      //'orderSummary' is no longer null
      orderSummary = <OrderSummary
                  ingredients={this.props.ings}
                  cancel={this.handler.cancelBurger}
                  finish={this.handler.finishPurchase}
                  price={this.props.price.toFixed(2)}
                />
    }
    //if 'loading' is true
    if (this.state.loading) {
      //'orderSummary' is UI spinner
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal show={this.state.order} closed={this.handler.cancelBurger}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionsTypes.AddIngredient, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionsTypes.RemoveIngredient, ingredientName: ingName})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(BurgerBuilder, axiosInstance));
