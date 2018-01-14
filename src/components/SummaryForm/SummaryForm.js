import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../UI/Button'
import classes from './SummaryForm.css'

const summaryForm = (props) => {
  return (
    <div className={classes.SummaryForm}>
      <div style={{
        width: '300px',
        height: '300px',
        margin: 'auto'
      }}>
        <Burger ingredients={props.ingredients} />
        <h3>Is this what you would like to order?</h3>
      </div>
      <Button
        clicked = {props.checkoutCanceled}
        buttonType="Danger"
      >
        Cancel
      </Button>
      <Button
        clicked = {props.checkoutContinued}
        buttonType="Success"
      >
        Submit
      </Button>
    </div>
  )
}
export default summaryForm
