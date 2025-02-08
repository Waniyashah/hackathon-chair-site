"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // To get category ID from route
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
};

export default function CategoryPage() {
  const { id } = useParams(); // Get category ID from the route
  const [products, setProducts] = useState<Product[]>([]); // Store products
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products of the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products" && category._ref == $categoryId] {
        _id,
        title,
        price,
        "imageUrl": image.asset->url
      }`;

      try {
        const data = await client.fetch(query, { categoryId: id });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products found for this category!</div>;

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center">
        Products for Selected Category
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <div
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg max-w-xs hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-auto h-72 object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col items-start">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                  {product.title}
                </h4>
                <p className="text-gray-500 text-sm mb-4">${product.price}</p>

                {/* Add to Cart Button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-4 8h18M7 13L5.4 5M10 21a1 1 0 102 0m-2 0a1 1 0 11-2 0m8 0a1 1 0 102 0m-2 0a1 1 0 11-2 0"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
