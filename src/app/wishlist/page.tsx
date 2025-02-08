"use client";
import React from "react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function WishlistPage() {
  const { state: wishlistState, dispatch } = useWishlist(); // ✅ Fetch wishlist from local state

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>
      {wishlistState.items.length > 0 ? (
        wishlistState.items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center space-x-4">
              <Image
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
                width={400}
                height={400}
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item._id })
              } // ✅ Remove using local state
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Your wishlist is empty.</p>
      )}

      <Link href="/product">
        <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded">
          Browse Products
        </button>
      </Link>
    </div>
  );
}
