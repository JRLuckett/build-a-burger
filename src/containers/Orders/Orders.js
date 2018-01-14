import React, {Component} from 'react'
import axiosHandler from '../../axios-orders'
import Order from '../../components/Order/Order'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axiosHandler.get('/orders.json')
    .then(res => {
      let orderArray = []
      for(let key in res.data) {
        orderArray.push({
          ...res.data[key],
          id: key
        })
      }
      this.setState({loading: false, orders: orderArray})
      console.log(this.state.orders);
    })
    .catch( err => {
      this.setState({loading: false})
      console.log(err);
    })
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              customer={order.orderData.name}
              type={order.orderData.delivery}
              delivery={order.orderData.street}
              ingredient={order.ingredients}
              price={order.price}
            />
          )
        })}
      </div>
    )
  }
}
export default Orders
