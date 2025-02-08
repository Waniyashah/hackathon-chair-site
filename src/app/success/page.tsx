import Link from "next/link";

export default function SuccessPage() {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-green-500">Payment Successful! 🎉</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">Go to Home</Link>
      </div>
    );
  }
  