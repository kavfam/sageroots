import { writable, derived } from 'svelte/store'
//import localCart from '../localCart'

//cart
// const cart = writable([...localCart])
const cart = writable(getStorageCart())
//cart total
export const cartTotal = derived(cart, $cart => {
  let total = $cart.reduce((a, b) => a + b.amount * b.price, 0)
  return parseFloat(total.toFixed(2))
})
//local functions
const remove = (id, items) => {
  return items.filter(item => item.id !== id)
}
const toggleAmount = (id, items, amt) => {
  return items.map(item => {
    return item.id === id ? { ...item, amount: amt } : { ...item }
  })
}

//global functions
export const removeItem = id => {
  cart.update(storeValue => {
    return remove(id, storeValue)
  })
}
export const changeAmount = (id, amt) => {
  if (amt === 0) {
    removeItem(id)
  } else {
    cart.update(storeValue => {
      return toggleAmount(id, storeValue, amt)
    })
  }
}

export const addToCart = product => {
  cart.update(storeValue => {
    const { id, image, title, price } = product
    let item = storeValue.find(item => item.id === id)
    let cart
    if (item) {
      //item already exists in cart
      cart = toggleAmount(id, storeValue, item.amount + 1)
    } else {
      // add item to cart
      let newItem = { id, image, title, price, amount: 1 }
      cart = [...storeValue, newItem]
    }
    return cart
  })
}

//localStorage
function getStorageCart() {
  return localStorage.getItem('razorCart') ? JSON.parse(localStorage.getItem('razorCart')) : []
}

export function setStorageCart(cartValues) {
  localStorage.setItem('razorCart', JSON.stringify(cartValues))
}

export default cart
