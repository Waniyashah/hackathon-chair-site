'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
type OrderItem = {
    title: string;
    quantity: number;
  };
  
  type Order = {
    _id: string;
    customerName: string;
    email: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    orderDate: string;  // or use Date if you prefer
  };

export default function AdminDashboard() {
    const { user, protectAdminRoute } = useAuth();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        protectAdminRoute();  // Protect this route for admins only

        if (user?.isAdmin) {
            fetchTotalUsers();
            fetchTotalOrders();
        }
    }, [user, protectAdminRoute]);

    const fetchTotalUsers = async () => {
        try {
            const res = await fetch('/api/admin/total-users');
            const data = await res.json();
            setTotalUsers(data.totalUsers);
        } catch (error) {
            console.error('Failed to fetch total users:', error);
        }
    };

    const fetchTotalOrders = async () => {
        try {
            const res = await fetch('/api/admin/total-orders');
            const data = await res.json();
            setTotalOrders(data.totalOrders);
            setOrders(data.orders); // Store orders for table display
        } catch (error) {
            console.error('Failed to fetch total orders:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome, {user?.name}!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Users Section */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Total Users</h2>
                    <p className="text-4xl font-bold text-blue-500">{totalUsers}</p>
                </div>

                {/* Total Orders Section */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Total Orders</h2>
                    <p className="text-4xl font-bold text-red-500">{totalOrders}</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h2>
                {orders.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order:Order) => (
                                <tr key={order._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{order.customerName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.items.map((item: OrderItem) => item.title).join(", ")}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.items.map((item: OrderItem) => item.quantity).join(", ")}</td>
                                    <td className="border border-gray-300 px-4 py-2">${order.totalAmount}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    );
}
