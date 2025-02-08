import "./globals.css";
import { CartProvider } from "@/context/CartContext"; 
import Navbar from "@/app/components/Navbar";  // Fix path
import Footer from "@/app/components/Footer";  // Fix path
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata = {
  title: "My E-commerce App",
  description: "Add to Cart Functionality",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <WishlistProvider>
        <CartProvider> 
           {/* WishlistProvider ko CartProvider ke andar wrap karo */}
            <Navbar /> {/* Ab Navbar WishlistProvider ke andar hai */}
            {children}  
            <Footer /> 
        </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
