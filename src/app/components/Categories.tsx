"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { client } from "@/sanity/lib/client";

type Category = {
  _id: string;
  title: string;
  imageUrl: string;
  products: number;
};

const TopCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from Sanity
  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "categories"] {
        _id,
        title,
        "imageUrl": image.asset->url,
        products
      }`;
      const data = await client.fetch(query);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center">
        Top Categories
      </h2>

      {/* Categories Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category._id}`}>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Image
                src={category.imageUrl}
                alt={category.title}
                width={424}
                height={424}
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                <h3 className="font-bold text-lg">{category.title}</h3>
                <p>{category.products} Products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
