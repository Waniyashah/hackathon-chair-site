"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Import your Sanity client
import { FaTruck, FaCheck } from 'react-icons/fa';
import { IoFileTrayOutline } from 'react-icons/io5';
import { BiSolidLeaf } from 'react-icons/bi';
import ProductCard from "../components/ProductCard"; // Make sure this is correctly imported

// Define a Product type
type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
};

const About = () => {
  // Define the products state with the proper type
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch the featured products for the About page
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const query = `*[_type == "products" && isFeaturedInAboutPage == true] {
        _id,
        title,
        price,
        "imageUrl": image.asset->url
      }`;

      const data = await client.fetch(query); // Fetch data from Sanity
      setProducts(data);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* About Section */}
      <section className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center bg-white mt-16 lg:mt-32 px-6 gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-[#007580] p-6 text-white flex flex-col justify-between rounded-md shadow-lg">
          <h1 className="text-2xl lg:text-4xl font-bold pt-8">About Us - Comforty</h1>
          <p className="text-lg lg:text-xl mt-4 mb-8">
            At Comforty, we believe that the right chair can transform your space and elevate your comfort.
            Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that
            seamlessly blend style with functionality.
          </p>
          <button className="bg-[#2e6a6d] px-6 py-3 text-sm lg:text-base font-medium rounded hover:bg-[#256b6b]">
            View Collection
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-96 mt-8 lg:mt-0 ml-10">
          <Image
            src="/images/picture2.png" // Change this to a dynamic image URL here
            alt="Comforty"
            width={600}
            height={400}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="max-w-screen-xl mx-auto mt-24 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">What Makes Our Brand Different</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Features */}
          <div className="bg-[#F9F9F9] p-6 text-center rounded shadow">
            <FaTruck className="text-[#007580] text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#007580]">Next day as standard</h3>
            <p className="text-sm mt-4 text-[#007580]">
              Order before 3pm and get your order the next day as standard.
            </p>
          </div>
          <div className="bg-[#F9F9F9] p-6 text-center rounded shadow">
            <FaCheck className="text-[#007580] text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#007580]">Made by true artisans</h3>
            <p className="text-sm mt-4 text-[#007580]">
              Handmade crafted goods made with real passion and craftsmanship.
            </p>
          </div>
          <div className="bg-[#F9F9F9] p-6 text-center rounded shadow">
            <IoFileTrayOutline className="text-[#007580] text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#007580]">Unbeatable prices</h3>
            <p className="text-sm mt-4 text-[#007580]">
              For our materials and quality, you won’t find better prices anywhere.
            </p>
          </div>
          <div className="bg-[#F9F9F9] p-6 text-center rounded shadow">
            <BiSolidLeaf className="text-[#007580] text-3xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#007580]">Recycled packaging</h3>
            <p className="text-sm mt-4 text-[#007580]">
              We use 100% recycled material to ensure our footprint is more manageable.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="max-w-screen-xl mx-auto mt-16 px-6">
        <h2 className="text-3xl font-semibold text-left mb-12">Our Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
