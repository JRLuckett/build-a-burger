import React, {Component} from 'react';
import Modal from '../components/UI/Modal'
import Aux from './Aux'

//error HOC wrapper that takes the wrapped component and axios which is passed in BurgerBuilder
const ErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component {
    state = {
      error: null
    }

    //When the the wrapped component is mounting 'reqInterceptor' and 'resInterceptor'are created
    componentWillMount() {
      this.reqInterceptor = axiosInstance.interceptors.request.use(request => {
        //when the component makes a new request 'error' is set to null
        this.setState({error: null})
        //the request must be returned to pass it to the wrapped component
        return request
      })
      this.resInterceptor = axiosInstance.interceptors.response.use(response => {
        //return response to component if no error
        return response
        //if error, set 'error' to the error object retured
      }, error => {
        this.setState({error: error})
      })
    }

    //When the wrapped compoenent is no longer mounted the interceptos are ejected so they don't continually create new unneccessary classes
    componentWillUnmount() {
      //eject request interceptor
      axiosInstance.interceptors.request.eject(this.reqInterceptor)
      //eject response interceptor
      axiosInstance.interceptors.response.eject(this.resInterceptor)
    }

    //Handdler to allow user to confirm error and set 'error' to null, erasing error message
    errorConfirmed= () => {
      this.setState({error: null})
    }
    render () {
      return (
        <Aux>
          {/* if error is true then modal is shown with error message
              if dackdrop on modal is clicked, 'errorConfirmed' erases error message
           */}
          <Modal show={this.state.error} closed={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          {/* all props are passed to wrapped component with spread operator */}
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default ErrorHandler
