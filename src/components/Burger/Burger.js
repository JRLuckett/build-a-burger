import React from 'react';
import {withRouter} from 'react-router-dom'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredient'

const burger = ( props ) => {
  //ingredient keys from the state are added to a new array and then mapped over
  let transformedIngredients = Object.keys( props.ingredients ).map((ingredientKey) => {
    //a new array with n number of indexes is created based on the value held by the key in the 'transformedIngredients' array
    return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
      //
      return <BurgerIngredients key={ingredientKey + i} type={ingredientKey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  };
  return (
    <div className = {classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  )
}


export default withRouter(burger);
