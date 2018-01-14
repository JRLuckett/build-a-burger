import * as actionsTypes from './actions'

//holds the price of each ingredient
const INGREDIENT_PRICES = {
  salad: .5,
  cheese: 1,
  bacon: 2,
  meat: 3
}

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  total: 3.99,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AddIngredient:
      return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        total: state.total + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionsTypes.RemoveIngredient:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      total: state.total - INGREDIENT_PRICES[action.ingredientName]
    }
    default:
      return state

  }
}

export default reducer
