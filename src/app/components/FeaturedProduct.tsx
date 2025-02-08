"use client";

import { useEffect, useState } from "react";
import { sanityfetch } from "@/sanity/lib/fetch";
import { featuredProductsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/app/components/ProductCard"; // Reusable product card component

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset the error on each fetch
      try {
        const data: Product[] = await sanityfetch({ query: featuredProductsQuery });
        setProducts(data); // Set fetched products
      } catch (error: unknown) {  // Using 'unknown' instead of 'any'
        if (error instanceof Error) {  // Type guard to check if error is an instance of Error
          setError(error.message);  // Set the error message
        } else {
          setError("Failed to load featured products. Please try again later.");
        }
        console.error(error); // Log error for debugging
      } finally {
        setLoading(false); // Set loading to false when fetch completes (success or failure)
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading featured products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p> // Display error message
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No featured products available.</p> // Fallback message if no products
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
