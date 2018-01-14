import React from 'react'
import classes from './Input.css'

const Input = (props) => {
  let inputElement = null
  let inputClasses = [classes.InputElement]

if (props.invalid && props.touched) {
  inputClasses.push(classes.Invalid)
}

  switch (props.elementType) {
    case ('input'):
      inputElement = (
      <input
        onChange= {props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
      />)
    break;
    case ('select'):
      inputElement = (
        <select
          onChange= {props.changed}
          className={inputClasses}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            )
          })}
        </select>
      )
    break;
    case ('textarea'):
        inputElement = (
          <textarea
            onChange= {props.changed}
            className={inputClasses}
            {...props.elementConfig}
            value={props.value}
          />)
      break;
      default: inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
        />)
    }
    return (
      <div className={inputClasses}>
        <label>{props.label}</label>
        {inputElement}
      </div>
    )
}

export default Input
