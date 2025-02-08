"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique keys
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutFlow() {
  const { state, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    shippingAddress: "",
  });

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle order submission to Sanity
  const handleSubmit = async () => {
    if (!state.items.length) {
      alert("Your cart is empty!");
      return;
    }

    // **Generate Unique `_key` for each ordered item**
    const orderItems = state.items.map((item) => ({
      _key: uuidv4(), // Generate unique key
      productId: item._id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      Image: item.imageUrl,
    }));

    const order = {
      _type: "order",
      ...formData,
      items: orderItems, // **Now each item has a unique `_key`**
      totalAmount: state.totalPrice,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await client.create(order); // Saving order to Sanity
      return response._id; // Return order ID after successfully storing in Sanity
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order");
      return null;
    }
  };

  // Handle Checkout with Stripe
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to load");
      return;
    }

    try {
      // First create the order in Sanity before processing the payment
      const orderId = await handleSubmit(); // This ensures order is created before payment
      if (!orderId) return; // Exit if order creation fails

      // Proceed with the payment session creation
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items, // Send cart items to the backend
        }),
      });

      const session = await response.json();

      if (session.error) {
        alert("Payment session creation failed!");
        return;
      }

      // Redirect user to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }

      // Clear cart after successful order
      dispatch({ type: "CLEAR_CART" });
      alert("Payment successful and order placed!");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold">Customer Information</h2>
          <form className="space-y-4 mt-4">
            <input
              type="text"
              name="customerName"
              placeholder="Name"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="shippingAddress"
              placeholder="Shipping Address"
              value={formData.shippingAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </form>
          <button
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
            onClick={() => setStep(2)}
          >
            Place Order
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold">Order Summary</h2>
          {state.items.map((item) => (
            <div key={item._id} className="flex justify-between py-2">
              <span className="font-semibold">{item.title}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <p className="font-bold mt-4">Total: ${state.totalPrice}</p>
          <button
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
            onClick={handleCheckout} // Calls handleCheckout to process payment and store order
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}
