'use client';

import { createContext, useContext, useReducer } from "react";

// ✅ Product type define karo
type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;  // Add quantity field here
};

// ✅ Cart ka initial state
type CartState = {
  items: Product[];
  totalPrice: number;
};

// ✅ Initial empty cart
const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

// ✅ Define Action Types
type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string } // payload will be the product _id for removal
  | { type: "CLEAR_CART" }; // New action to clear the cart

// ✅ Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.items.find((item) => item._id === action.payload._id);
      let updatedItems;
      if (existingProduct) {
        updatedItems = state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Recalculate total price dynamically
      const updatedTotalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = state.items
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      // Recalculate total price dynamically
      const updatedTotalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [], totalPrice: 0 }; // Clear the cart and reset totalPrice

    default:
      return state;
  }
};

// ✅ Context create karo
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// ✅ Cart Provider Component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook for Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
