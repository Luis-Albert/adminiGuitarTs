import { useState, useEffect, useMemo } from "react"
import { Guitar, CartItem } from "../types"

export const useCart = () => {

  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  function addToCart(item: Guitar) {

    const itemsExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemsExist >= 0) {
      if (cart[itemsExist].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemsExist].quantity++
      setCart(updatedCart)
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }

  }

  function decreaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function increaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function removeFromCart(id: Guitar['id']) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  return {
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
    cart,
    isEmpty,
    cartTotal
  }
}