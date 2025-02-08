'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

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
    orderDate: string;
    totalAmount: number;
    items: OrderItem[];
}

export default function UserProfile() {
    const { user, protectRoute } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]); // ✅ Fixed typing issue

    useEffect(() => {
        protectRoute(); // Ensure the user is logged in
    }, [protectRoute]);

    // Use useCallback to memoize the fetchOrders function
    const fetchOrders = useCallback(async () => {
        if (!user?.email) return;

        try {
            const res = await fetch(`/api/orders?email=${user.email}`);
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }, [user?.email]); // Dependency on user's email

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user, fetchOrders]); // Now, fetchOrders won't change on every render

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
                    <p className="text-gray-600 mb-6">Email: {user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}

            <h2 className="text-2xl font-semibold mt-8 text-gray-700">Your Orders</h2>
            {orders.length > 0 ? (
                <ul className="mt-4 space-y-4">
                    {orders.map((order) => (
                        <li key={order._id} className="border p-4 rounded-lg shadow-sm bg-white">
                            <p className="text-lg font-medium text-gray-900">Order ID: {order._id}</p>
                            <p className="text-sm text-gray-600">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p className="text-lg font-bold mt-2 text-green-600">Total: ${order.totalAmount}</p>

                            <h3 className="text-md font-semibold mt-4 text-gray-800">Items:</h3>
                            <ul className="list-disc list-inside">
                                {order.items.map((item, index) => (
                                    <li key={index} className="mt-1">
                                        <span className="font-semibold">{item.title}</span> - {item.quantity} x ${item.price}
                                    </li>
                                ))}
                            </ul>

                            {/* Order Tracking Details */}
                            <div className="mt-4 p-3 border rounded-lg bg-gray-50">
                                <p className="text-sm text-gray-700">
                                    <strong>Tracking ID:</strong> {order.trackingId || "Not Available"}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Estimated Delivery:</strong> {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : "Not Available"}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Status:</strong>{" "}
                                    <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-500'}`}>
                                        {order.status}
                                    </span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-gray-500">No orders found. Start shopping now!</p>
            )}
        </div>
    );
}
