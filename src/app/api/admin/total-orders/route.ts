import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
    try {
        const orders = await client.fetch(`*[_type == "order"]`);
        return NextResponse.json({ totalOrders: orders.length, orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching total orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
