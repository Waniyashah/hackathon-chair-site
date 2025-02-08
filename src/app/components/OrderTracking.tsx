import React, { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  status: string;
  trackingId?: string;
  estimatedDelivery?: string;
  items: OrderItem[];
}

const OrderTracking = ({ email }: { email: string }) => {
  const [orders, setOrders] = useState<Order[]>([]); // ✅ Fixed type issue

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?email=${email}`);
        const data = await response.json();
        setOrders(data.orders || []); // ✅ Ensuring it handles empty arrays properly
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Order Tracking</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-3 mb-3 rounded bg-white shadow-sm">
            <p className="text-lg font-semibold">Order ID: {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Tracking ID:</strong> {order.trackingId || "Not Available"}</p>
            <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : "Not Available"}</p>
            <h3 className="text-md font-semibold mt-3">Items:</h3>
            <ul className="list-disc pl-5">
              {order.items.map((item, index) => (
                <li key={index}>{item.title} - {item.quantity} x ${item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderTracking;
