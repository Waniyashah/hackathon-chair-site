// import { NextRequest, NextResponse } from 'next/server';
// import {client} from '@/sanity/lib/client'

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get('email');  // Get email from query

//     if (!email) {
//         return NextResponse.json({ error: 'Email is required' }, { status: 400 });
//     }

//     try {
//         // Sanity query to fetch orders by email
//         const query = `*[_type == "order" && email == $email]{
//             _id,
//             customerName,
//             email,
//             shippingAddress,
//             status,
//             totalAmount,
//             orderDate,
//             items[]{
//                 productId,
//                 title,
//                 quantity,
//                 price
//             }
//         } | order(orderDate desc)`;  // Sorting by latest order

//         const orders = await client.fetch(query, { email });

//         return NextResponse.json({ orders }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');  

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const query = `*[_type == "order" && email == $email]{
            _id,
            customerName,
            email,
            shippingAddress,
            status,
            totalAmount,
            orderDate,
            items[] {
                productId,
                title,
                quantity,
                price
            },
            trackingId,
            estimatedDelivery
        } | order(orderDate desc)`;

        const orders = await client.fetch(query, { email });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
