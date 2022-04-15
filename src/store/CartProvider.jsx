import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initCartReducer = {
  items: [],
  totalAmount: 0,
  totalItemAmount: 0,
};

const cartReducer = (state = initCartReducer, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const totalItemAmount =
        Number(state.totalItemAmount) + Number(action.item.amount);

      let updatedItems;
      const existingItemIndex = state.items.findIndex(
        (e) => e.id === action.item.id
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        const newItem = {
          ...existingItem,
          amount: Number(existingItem.amount) + Number(action.item.amount),
        };

        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = newItem;
      } else {
        updatedItems = [...state.items, action.item];
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalItemAmount,
      };
    case "DELETE":
      break;
    default:
      break;
  }

  return initCartReducer;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initCartReducer);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCart({ type: "DELETE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalItemAmount: cartState.totalItemAmount,
    addItems: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
