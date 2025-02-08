'use client';

import { createContext, useContext, useReducer } from "react";

// ✅ Product type define karo
type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
};

// ✅ Wishlist ka initial state
type WishlistState = {
  items: Product[];
};

// ✅ Initial empty wishlist
const initialState: WishlistState = {
  items: [],
};

// ✅ Define Action Types
type WishlistAction =
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }; // payload will be the product _id for removal

// ✅ Reducer function
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

// ✅ Context create karo
const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

// ✅ Wishlist Provider Component
export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom Hook for Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
