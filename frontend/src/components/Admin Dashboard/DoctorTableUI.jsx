import React, { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetchAllDoctors from "../../customHooks/useFetchAllDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import { setDoctors } from "../../reduxStore/doctorsSlice";
import { FaSearch } from "react-icons/fa";

const DoctorTableUI = () => {
  const [showMore, setShowMore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFetchAllDoctors();

  const { doctors = [] } = useSelector((store) => store.doctors);
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMore = (index) => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const handleDelete = async (doctorId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/doctors/delete/${doctorId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setDoctors(doctors.filter((doctor) => doctor._id !== doctorId))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-400 flex justify-center">
      <div className="container p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="flex items-center">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button
            onClick={() => navigate("/admin/add-doctor")}
            className="ml-4"
          >
            Add a Doctor
          </Button>

          <div className="ml-auto flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to Search Doctors..."
              className="p-4 rounded-full border h-10 border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
            />
            <FaSearch className="w-6 h-6" />
          </div>
        </div>

        <div className="overflow-x-auto mt-9">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Specialization
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, index) => (
                <React.Fragment key={doctor._id}>
                  <tr className="border-t hover:bg-blue-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/doctor-info/${doctor._id}`}
                        className="flex items-center"
                      >
                        <img
                          className="w-16 h-16 rounded-full object-cover object-top"
                          src={doctor.avatar}
                          alt={doctor.name}
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {doctor.name}

                      <button
                        aria-label="Toggle more information"
                        className="ml-4 text-blue-500 hover:text-blue-600 md:hidden flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMore(index);
                        }}
                      >
                        {showMore === index ? (
                          <>
                            Show Less <ChevronUp className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            More <ChevronDown className="ml-1 w-4 h-4" />
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {doctor.specialization}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {doctor.email}
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="flex items-center text-red-500 mt-4 hover:text-red-600"
                        aria-label="Delete doctor"
                      >
                        <Trash2 className="w-5 h-5 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                  {showMore === index && (
                    <tr className="md:hidden">
                      <td colSpan={2} className="px-6 py-4">
                        <p>
                          <strong>Specialization:</strong>{" "}
                          {doctor.specialization}
                        </p>
                        <p>
                          <strong>Contact:</strong> {doctor.email}
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorTableUI;
