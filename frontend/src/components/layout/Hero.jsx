import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/hotel-bg.jpg" // Replace with your image path
        alt="Luxury Hotel"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          Welcome to <span className="text-yellow-400">Grand Horizon</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 animate-fade-in-up delay-100">
          Experience unparalleled luxury and comfort at our world-class hotel. Your perfect getaway starts here.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <Link to="/hotels">
            <button className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-semibold">
              BOOK ROOM
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-400 hover:text-gray-900 hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-semibold">
              About Us
            </button>
          </Link>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;