"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { state, dispatch } = useCart();

  // Add to Cart Handler (Increase Quantity)
  const increaseQuantity = (id: string) => {
    const product = state.items.find((item) => item._id === id);
    if (product) {
      // Increase quantity of the existing product
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: product.quantity + 1 } });
    }
  };

  // Remove from Cart Handler (Decrease Quantity or Remove Item)
  const decreaseQuantity = (id: string) => {
    const product = state.items.find((item) => item._id === id);
    if (product) {
      if (product.quantity === 1) {
        // Remove product entirely if quantity is 1
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
      } else {
        // Decrease quantity by 1
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between px-8 py-10">
      {/* Bag Section */}
      <div className="lg:w-2/3">
        <h1 className="text-2xl font-bold mb-6">Bag</h1>
        {state.items.length > 0 ? (
          state.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4 mb-6"
            >
              {/* Product Image */}
              <div className="flex items-center space-x-4">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                  width={96}
                  height={96}
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-500 text-sm">
                    Ashen Slate/Cobalt Bliss
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              {/* Product Price and Actions */}
              <div className="text-right">
                <p className="text-lg font-semibold">{`MRP: $${item.price}`}</p>
                <div className="flex items-center justify-end mt-2 space-x-4">
                  <button
                    className="text-green-500 hover:text-green-700 text-xl"
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your bag is empty.</p>
        )}
      </div>

      {/* Summary Section */}
      <div className="lg:w-1/4 bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-6">Summary</h2>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-semibold">{`$${state.totalPrice.toFixed(2)}`}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">Estimated Delivery & Handling</p>
          <p className="font-semibold">Free</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>{`$${state.totalPrice.toFixed(2)}`}</p>
        </div>
        <Link href="/checkout">
          <button className="bg-teal-500 text-white px-4 py-2 rounded">Checkout</button>
        </Link>
      </div>
    </div>
  );
}
