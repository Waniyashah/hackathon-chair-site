"use client";

import { useState, useEffect } from "react";
import { sanityfetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries";
import ProductCard from "@/app/components/ProductCard"; // Import the reusable component

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]); // All products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products
  const [query, setQuery] = useState(""); // Search query

  // Fetch all products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await sanityfetch({ query: allProducts });
      setProducts(data);
      setFilteredProducts(data); // Initially show all products
    };
    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setQuery(searchValue);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  return (
    <section id="product" className="px-6 py-8">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a product..."
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Product Listing */}
      <h1 className="text-[#272343] font-sans text-[32px] mt-10 ml-11 font-semibold">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-11 mr-11 mt-12 mb-20">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found!
          </p>
        )}
      </div>
    </section>
  );
}
