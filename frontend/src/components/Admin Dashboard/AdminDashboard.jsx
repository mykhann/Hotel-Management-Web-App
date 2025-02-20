import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaUserDoctor, FaUsersViewfinder } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import LatestDoctors from "./LatestDoctors";
import LatestAppointments from "./LatestAppointments";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {doctors=[]}=useSelector(store=>store.doctors)
  const {appointmentsAdmin=[]}=useSelector(store=>store.appointments)

  const handleLogout = async () => {
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-gray-900 min-h-screen">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-5xl text-white font-extrabold mx-auto -mt-2">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 text-white mr-4 px-4 h-10 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt className="mr-2 w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Adjust margin to move cards higher */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 -mt-9">
            {/* Add Doctor Card */}
            <Link to="/admin/add-doctor">
              <div className="flex flex-col bg-green-200 text-green-900 p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <FaPlus className="text-5xl mb-4 self-center text-green-700" />
                <h2 className="text-2xl font-extrabold text-center">
                  Add Doctor
                </h2>
                <p className="text-lg text-center mt-1">Add a new Doctor</p>
              </div>
            </Link>

            {/* View Doctors Card */}
            <Link to="/admin/view-doctors">
              <div className="flex flex-col bg-blue-200 text-blue-900 p-6  shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <FaUserDoctor className="text-5xl mb-4 self-center text-blue-700" />
                <h2 className="text-2xl font-extrabold text-center">Doctors ({doctors?.length})</h2>
                <p className="text-lg text-center mt-1">
                  Manage and track all Doctors.
                </p>
              </div>
            </Link>

            {/* All Appointments Card */}
            <Link to="/admin/view-appointments">
              <div className="flex flex-col bg-red-200 text-red-900 p-6  shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <FaUsersViewfinder className="text-5xl mb-4 self-center text-red-700" />
                <h2 className="text-2xl font-extrabold text-center">
                  All Appointments ({appointmentsAdmin.length})
                </h2>
                <p className="text-lg text-center mt-1">
                  View all appointments for all doctors
                </p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Latest Doctors Table */}
            <LatestDoctors />
            {/* Latest Appointments Table */}
            <LatestAppointments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
