import { NextResponse } from "next/server";
import Stripe from "stripe";

type Product = {
  title: string;
  price:number;
  quantity:number;
  Image: string;
};

// Correct Stripe API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Debugging logs
    console.log("Received items:", items);
    console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);

    const lineItems = items.map((item: Product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.Image], // Ensure the key matches your frontend
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Stripe session created:", session);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error },
      { status: 500 }
    );
  }
}
