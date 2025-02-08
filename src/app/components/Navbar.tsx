// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FaCheck, FaRegHeart } from "react-icons/fa";
// import { CiCircleAlert } from "react-icons/ci";
// import { BsCartDash, BsList } from "react-icons/bs";
// import { FaUserLarge } from "react-icons/fa6";
// import { useWishlist } from "@/context/WishlistContext";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/hooks/useAuth";

// const Navbar = () => {
//   const { state: wishlistState } = useWishlist(); // ✅ Fetch wishlist from Sanity
//   const { state: cartState } = useCart();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header>
//       {/* Top Bar */}
//       <div className="w-full bg-[#272343] text-gray-200 px-4 py-2 flex flex-col sm:flex-row items-center justify-between">
//         <div className="text-sm flex items-center space-x-2">
//           <FaCheck className="text-green-400" />
//           <span>Free shipping on all orders over $50</span>
//         </div>
//         <div className="flex items-center space-x-6 text-sm">
//           <Link href="#" className="hover:underline">Eng</Link>
//           <Link href="/faq" className="hover:underline">FAQs</Link>
//           <div className="flex items-center space-x-1">
//             <CiCircleAlert size={16} />
//             <span className="hover:underline">Need Help</span>
//           </div>
//         </div>
//       </div>

//       {/* Middle Bar */}
//       <div className="bg-gray-100 shadow-md border-b border-gray-200 px-6 py-3">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <Image src="/images/logoicon.png" alt="Comforty logo" height={40} width={40} />
//             <span className="text-xl font-bold text-gray-700">Comforty</span>
//           </Link>

//           {/* Wishlist, Cart, and Profile Section */}
//           <div className="flex items-center space-x-6">
//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative flex items-center space-x-1">
//               <FaRegHeart className="text-xl text-gray-700 hover:text-red-500" />
//               <span className="text-sm">{wishlistState.items.length}</span> {/* ✅ Local Wishlist Count */}
//             </Link>
//             {/* Cart */}
//             <Link href="/cart" className="relative flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
//               <BsCartDash className="text-xl" />
//               <span className="ml-2">Cart</span>
//               {cartState.items.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-teal-600 text-white px-2 py-1 text-xs rounded-full">
//                   {cartState.items.length}
//                 </span>
//               )}
//             </Link>

//             {/* User Profile */}
//             {user ? (
//               <div className="flex items-center space-x-2">
//                 <Link href="/userprofile" className="flex items-center">
//                   <FaUserLarge className="text-xl text-gray-700 hover:text-teal-600" />
//                   <span className="ml-1 text-sm">{user.name}</span>
//                 </Link>
//                 <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link href="/auths/login" className="flex items-center">
//                 <FaUserLarge className="text-xl text-gray-700 hover:text-teal-600" />
//               </Link>
//             )}

//             {/* Mobile Menu Toggle Button */}
//             <button onClick={toggleMenu} className="sm:hidden text-gray-700 hover:text-teal-600 focus:outline-none">
//               <BsList className="text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <nav className="bg-white px-6 py-3">
//         <div className="container mx-auto flex flex-wrap justify-between items-center">
//           {/* Menu Links */}
//           <div className={`${isMenuOpen ? "block" : "hidden"} sm:flex sm:flex-wrap sm:space-x-4 text-gray-700 w-full sm:w-auto`}>
//             <Link href="/" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Home</Link>
//             <Link href="/shop" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Shop</Link>
//             <Link href="/product" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Product</Link>
//             <Link href="/contact" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Contact</Link>
//             <Link href="/about" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">About</Link>
//           </div>
//           {/* Contact Info */}
//           <div className="text-gray-700 text-sm mt-4 sm:mt-0">
//             Contact: (808) 555-0111
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaRegHeart } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";
import { BsCartDash, BsList } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { state: wishlistState } = useWishlist(); // ✅ Fetch wishlist from Sanity
  const { state: cartState } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="w-full bg-[#272343] text-gray-200 px-4 py-2 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm flex items-center space-x-2">
          <FaCheck className="text-green-400" />
          <span>Free shipping on all orders over $50</span>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <Link href="#" className="hover:underline">Eng</Link>
          <Link href="/faq" className="hover:underline">FAQs</Link>
          <div className="flex items-center space-x-1">
            <CiCircleAlert size={16} />
            <span className="hover:underline">Need Help</span>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="bg-gray-100 shadow-md border-b border-gray-200 px-6 py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logoicon.png" alt="Comforty logo" height={40} width={40} />
            <span className="text-xl font-bold text-gray-700">Comforty</span>
          </Link>

          {/* Wishlist, Cart, and Profile Section (Desktop Only) */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center space-x-1">
              <FaRegHeart className="text-xl text-gray-700 hover:text-red-500" />
              <span className="text-sm">{wishlistState.items.length}</span> {/* ✅ Local Wishlist Count */}
            </Link>
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
              <BsCartDash className="text-xl" />
              <span className="ml-2">Cart</span>
              {cartState.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white px-2 py-1 text-xs rounded-full">
                  {cartState.items.length}
                </span>
              )}
            </Link>

            {/* User Profile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/userprofile" className="flex items-center">
                  <FaUserLarge className="text-xl text-gray-700 hover:text-teal-600" />
                  <span className="ml-1 text-sm">{user.name}</span>
                </Link>
                <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auths/login" className="flex items-center">
                <FaUserLarge className="text-xl text-gray-700 hover:text-teal-600" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button onClick={toggleMenu} className="sm:hidden text-gray-700 hover:text-teal-600 focus:outline-none">
            <BsList className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white px-6 py-3">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          {/* Menu Links */}
          <div className={`${isMenuOpen ? "block" : "hidden"} sm:flex sm:flex-wrap sm:space-x-4 text-gray-700 w-full sm:w-auto`}>
            <Link href="/" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Home</Link>
            <Link href="/product" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Shop</Link>
            <Link href="/product" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Product</Link>
            <Link href="/contact" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">Contact</Link>
            <Link href="/about" className="block sm:inline-block hover:text-teal-600 py-2 sm:py-0">About</Link>
          </div>
          
          {/* Mobile Menu: Wishlist, Cart, and Profile Icons */}
          <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden flex items-center space-x-6 text-gray-700`}>
            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center space-x-1">
              <FaRegHeart className="text-xl text-gray-700 hover:text-red-500" />
              <span className="text-sm">{wishlistState.items.length}</span>
            </Link>
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
              <BsCartDash className="text-xl" />
              <span className="ml-2">Cart</span>
              {cartState.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white px-2 py-1 text-xs rounded-full">
                  {cartState.items.length}
                </span>
              )}
            </Link>

            {/* User Profile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/userprofile" className="flex items-center">
                  <FaUserLarge className="text-xl text-gray-700 hover:text-teal-600" />
                  <span className="ml-1 text-sm">{user.name}</span>
                </Link>
                <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auths/login" className="flex items-center">
                <FaUserLarge className="text-xl text-gray-700 hover:text-teal-600" />
              </Link>
            )}
          </div>

          {/* Contact Info */}
          <div className="text-gray-700 text-sm mt-4 sm:mt-0">
            Contact: (808) 555-0111
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
