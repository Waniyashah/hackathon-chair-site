import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <main>
        <footer className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2 text-teal-500">
                    <Image
                      src="/images/logoicon.png"
                      alt="comfortylogo"
                      width={24}
                      height={24}
                    >
                    </Image>
                  </span>
                  Comforty
                </h3>
                <p className="text-gray-600 text-sm">
                  Vivamus tristique odio sit amet velit semper, eu posuere
                  turpis interdum. <br /> Oras egestas purus.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  {/* Social Icons */}
                  <a
                    href="#"
                    className="text-gray-600 hover:text-teal-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-teal-500 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-teal-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <BiLogoInstagramAlt />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-teal-500 transition-colors"
                    aria-label="pinterest"
                  >
                    <FaPinterest />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-teal-500 transition-colors"
                    aria-label="youtube"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>

              {/* Category Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Category
                </h4>

                <ul className="text-gray-600 space-y-2">
                  <li>
                    <Link href="#" className="hover:underline">
                      Sofa
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Armchair
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Wing Chair
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Desk Chair
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Wooden Chair
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Park Bench
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Support
                </h4>

                <ul className="text-gray-600 space-y-2">
                  <li>
                    <Link href="/help-support" className="hover:underline">
                      Help & Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions" className="hover:underline">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="hover:underline">
                      Help
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Newsletter
                </h4>
                <form className="space-y-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    autoComplete="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam tincidunt erat enim.
                </p>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t pt-4 text-sm text-gray-600 flex justify-between">
              <span>
                &copy; 2021 – Biogy - Designed & Developed by Zakirsoft
              </span>
              <div className="flex space-x-2 ">
                <Image
                  src="/images/PayPal.png"
                  alt="paypal"
                  width={100}
                  height={100}
                  className="w-auto h-auto"
                ></Image>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Footer;
