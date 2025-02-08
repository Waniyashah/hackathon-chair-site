"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: cartState, dispatch: cartDispatch } = useCart();

  // Check if product is in wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(
      wishlistState.items.some((item) => item._id === product._id)
    );
  }, [wishlistState.items, product._id]);

  // Add to Cart Function
  const handleAddToCart = () => {
    // Add quantity to the product when dispatching to the cart
    const productWithQuantity = { ...product, quantity: 1 };
    cartDispatch({ type: "ADD_TO_CART", payload: productWithQuantity });
  };

  // ✅ Find product in cart and get quantity
  const cartItem = cartState.items.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // ✅ Increase quantity function
  const increaseQuantity = () => {
    const productWithQuantity = { ...product, quantity: 1 };
    cartDispatch({ type: "ADD_TO_CART", payload: productWithQuantity });
  };

  // ✅ Decrease quantity function
  const decreaseQuantity = () => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: product._id });
  };

  // Toggle Wishlist Function
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden max-w-xs hover:scale-105 transition-transform duration-300 bg-white">
      {/* Product Image & Wishlist Button */}
      <div className="relative">
        <Link href={`/product/${product._id}`}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 text-2xl"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500 hover:text-red-500" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h4 className="font-semibold text-lg text-gray-800 mb-1">
          {product.title}
        </h4>
        <p className="text-gray-600 font-medium">{`$${product.price}`}</p>
      </div>

      {/* ✅ Quantity Section and Cart Button in One Row */}
      <div className="p-4 flex items-center justify-between space-x-4">
        {/* Quantity Section */}
        <div className="flex items-center space-x-2">
          <button
            className="text-red-500 hover:text-red-700 text-xl px-3 py-1 border border-gray-400 rounded"
            onClick={decreaseQuantity}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="text-green-500 hover:text-green-700 text-xl px-3 py-1 border border-gray-400 rounded"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>

        {/* Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center bg-teal-500 text-white w-10 h-10 rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          <CiShoppingCart className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
}
