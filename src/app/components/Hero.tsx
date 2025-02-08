import { heropage } from "@/sanity/lib/queries";
import { sanityfetch } from "@/sanity/lib/fetch";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type Hero = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default async function Herocont() {
  // Fetch hero content from Sanity
  const hero: Hero | null = await sanityfetch({ query: heropage });

  // Handle case when `hero` is null
  if (!hero) {
    return (
      <section className="w-full h-auto bg-gray-100 mx-auto px-4 py-8 flex items-center justify-center">
        <p className="text-xl font-bold text-red-500">Hero content is unavailable.</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1250px] h-auto min-h-[850px] bg-gray-100 mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side Content */}
      <div className="md:pl-7 max-w-md text-left space-y-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {hero.title}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
          {hero.description }
        </h1>
        <Link href="/product">
          <button className="mt-6 px-8 py-3 bg-teal-500 text-white font-medium rounded-md shadow-md hover:bg-teal-600 transition-all">
            Shop Now <span className="ml-2">→</span>
          </button>
        </Link>
      </div>

      {/* Right Side Image */}
      <div className="mt-8 md:mt-0 w-full md:w-auto">
        <Image
          src={hero.image} // Fallback to default image
          alt={hero.title}
          priority
          width={400}
          height={500}
          className="object-cover w-full h-auto max-w-md md:max-w-lg"
        />
      </div>
    </section>
  );
}
