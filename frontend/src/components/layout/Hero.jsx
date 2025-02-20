import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/hotel-bg.jpg" // hotel background image
        alt="Luxury Hotel"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to Grand Horizon
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Experience unparalleled luxury and comfort at our world-class hotel. Your perfect getaway starts here.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link to="/doctors"> 
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform text-lg font-semibold">
              Explore Rooms
            </button>
          </Link>
          <Link to="/about"> 
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-gray-900 hover:scale-105 transition-transform text-lg font-semibold">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;