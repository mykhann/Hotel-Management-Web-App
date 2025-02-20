import React from "react";
import { Button } from "@material-tailwind/react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const ProfilePage = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-semibold text-red-600">Please Login</h1>
        <Link to="/login" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-6">
        <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-white border border-white/20">
          
          {/* Buttons - Positioned Top Right */}
          <div className="absolute top-4 right-4 flex space-x-3">
            <Button
              onClick={() => navigate("/profile/bookings")}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2"
            >
              View Bookings
            </Button>
            <Button onClick={() => navigate("/edit-profile")} className="bg-red-600 hover:bg-red-700 transition px-4 py-2">
              <PencilIcon className="w-5 h-5 text-white" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start mt-8">
            <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-10 text-center lg:text-left">
              <h2 className="text-3xl font-semibold">{user.name}</h2>
              <p className="text-gray-300 mt-2">📧 {user.email}</p>
              <p className="text-gray-300 mt-1">📞 {user.phone || "Not Provided"}</p>
              <p className="text-gray-300 mt-1">👤 {user.role}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfilePage;
