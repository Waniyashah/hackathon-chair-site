"use client";
import React from "react";
import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; 
import { useWishlist } from "@/context/WishlistContext"; 
import { client } from "@/sanity/lib/client";
import { productById } from "@/sanity/lib/queries";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import Image from "next/image";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductDetailPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fix: Use `useCart` correctly
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Product = await client.fetch(productById, { id });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsWishlisted(wishlistState.items.some((item) => item._id === product._id));
    }
  }, [wishlistState.items, product]);

  if (loading)
    return <div className="text-center text-gray-600 mt-10">Loading product details...</div>;

  if (!product)
    return <div className="text-center text-red-500 mt-10">Product not found!</div>;

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

  // ✅ Wishlist toggle function
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-4">
            <Image
              src={product.imageUrl}
              alt={product.title}
              className="rounded-lg object-cover w-full h-full shadow"
              width={400}
              height={400}
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-semibold text-gray-700 mb-6">${product.price}</p>
            </div>

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

            {/* ✅ Quantity Section (Above Add to Cart Button) */}
            <div className="flex items-center justify-center mt-2 space-x-4">
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

            {/* Add to Cart Button */}
            <button
              onClick={increaseQuantity}
              className="flex items-center justify-center bg-teal-500 text-white py-3 px-4 rounded-md shadow hover:bg-teal-600 transition mt-4"
            >
              <BsCartPlus className="text-white text-2xl mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
