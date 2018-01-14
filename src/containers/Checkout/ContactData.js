import React, {Component} from 'react'
import classes from './ContactData.css'
import Aux from '../../HOC/Aux'
import Button from '../../components/UI/Button'
import Spinner from '../../components/UI/LoadingSpinner'
import axiosInstance from '../../axios-orders'
import Input from '../../components/UI/Input'

class ContactData extends Component{
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Customer Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'cheapest', display: 'Cheapest'},
          ]
        },
        value: 'fastest',
        validation: {
          required: true
        },
        valid: true
      }
    },
    validForm: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // activates UI spinner
    this.setState({loading: true})
    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    // the .json node extension in the post is only necessary if using Firebase
    axiosInstance.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false})
        //this method was passed to this component through the `Route` `render` which passed all props with the spread operator
        this.props.history.push('/');
    // if error than the error wrapper will handle the message, this stops the UI spinner and hides the orderSummary UI modal
    }).catch(error => {
      this.setState({loading: false});
    })
  }

  checkValidation(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= 5 && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= 5 && isValid;
    }
    return isValid
  }

  inputChangehandler = (event, inputField) => {
    const newOrderForm = {
      ...this.state.orderForm
    }
    const newFormElement = {
      ...newOrderForm[inputField]
    }
    newFormElement.value = event.target.value
    newFormElement.valid = this.checkValidation(newFormElement.value, newFormElement.validation)
    newFormElement.touched = true
    newOrderForm[inputField] = newFormElement

    let formValid = true
    for (let key in newOrderForm) {
      formValid = newOrderForm[key].valid && formValid
    }
    console.log(this.state.validForm);
    this.setState({orderForm: newOrderForm, validForm: formValid})
  }


  render() {
    let inputFields = []
    for(let key in this.state.orderForm) {
      inputFields.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
      {inputFields.map((element => {
        return (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              invalid={!element.config.valid}
              touched={element.config.touched}
              changed={(event) => this.inputChangehandler(event,element.id)}
            />
        )
      }))}
      <Button disabled={!this.state.validForm}>Order</Button>
    </form>)
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Data</h4>
        {form}
      </div>

    )
  }
}
export default ContactData
