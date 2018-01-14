import React from 'react'
import classes from './Order.css'
const Order = (props) => {
  let ingredientsArray = []
  for (let key in props.ingredient) {
    console.log(key, props.ingredient[key]);
    ingredientsArray.push({name: key, amount: props.ingredient[key]})
  }
  const ingredientList = ingredientsArray.map((item) => {
    return (
      <span
        key={item.name}
      >
        <strong>
          {item.name}
        </strong>
        ({item.amount})
      </span>
    )
  })
  return (
    <div className={classes.Order}>
      <h3 style={{textTransform: 'capitalize'}}>{props.customer}</h3>
      <p>{props.delivery} <strong style={{textTransform: 'capitalize', color: 'red'}}>({props.type})</strong></p>
      <p>{ingredientList} </p>
      <p><strong>${parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}
export default Order
