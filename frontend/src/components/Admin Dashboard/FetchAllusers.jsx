import React, { useEffect, useState } from "react";
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Navbar from "../shared/Navbar";
import Footer from "../layout/Footer";
import axios from "axios";

const FetchAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/admin/users", {
          withCredentials: true,
        });
        console.log("API Response:", response.data); 
        setUsers(response.data.allusers || []); 
      } catch (err) {
        console.error("Error fetching users:", err); 
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          All Users
        </h1>

        {loading && <p className="text-gray-400 text-center">Loading...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {!loading && !error && users.length === 0 && (
          <p className="text-gray-400 text-center">No users found.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Users Section */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Users</h2>
              {users
                .filter((user) => user.role === "user") 
                .map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
            </div>

            {/* Admins Section */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Admins</h2>
              {users
                .filter((user) => user.role === "admin") 
                .map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
            </div>

            {/* Hotel Owners Section */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Hotel Owners</h2>
              {users
                .filter((user) => user.role === "hotelOwner") 
                .map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const UserCard = ({ user }) => {
  console.log("User Data:", user);
  return (
    <div className="flex bg-gray-700 text-white shadow-md rounded-lg overflow-hidden mb-4 p-3 hover:border-yellow-500 border-2 border-transparent transition-all duration-300">
      <UserIcon className="w-10 h-10 text-gray-400 mr-4" />
      <div>
        <h3 className="text-lg font-semibold">{user.name || user.username}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-300">
          <EnvelopeIcon className="w-4 h-4 text-blue-500" />
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default FetchAllUsers;