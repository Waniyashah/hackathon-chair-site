"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { HiOutlineTrophy } from "react-icons/hi2";
import { MdOutlineVerified, MdOutlineSupportAgent } from "react-icons/md";
import { client } from "@/sanity/lib/client";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await client.create({
        _type: "contact",
        ...formData,
      });
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-center">Get In Touch With Us</h1>
      <p className="text-lg text-gray-600 text-center mt-4">
        Have questions? Feel free to drop us a message. Our team is happy to assist you!
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
        {/* Left Section: Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-teal-600 text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-medium">Address</h2>
              <p className="text-gray-700">236 5th SE Avenue, New York, NY10000</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaPhone className="text-teal-600 text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-medium">Phone</h2>
              <p className="text-gray-700">+1 (84) 546-6789</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <GoClockFill className="text-teal-600 text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-medium">Working Hours</h2>
              <p className="text-gray-700">Mon-Fri: 9:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject (Optional)"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg h-28"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {success && <p className="text-green-600 text-center">Message sent successfully!</p>}
          </form>
        </div>
      </div>

      {/* Extra Features Section */}
      <div className="bg-gray-100 mt-12 p-8 flex flex-col sm:flex-row justify-between space-y-6 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <HiOutlineTrophy className="text-teal-600 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">High Quality</h2>
            <p className="text-gray-600">Top-notch materials</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MdOutlineVerified className="text-teal-600 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">Warranty Protection</h2>
            <p className="text-gray-600">2+ years warranty</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MdOutlineSupportAgent className="text-teal-600 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold">24/7 Support</h2>
            <p className="text-gray-600">Dedicated assistance</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactus;
