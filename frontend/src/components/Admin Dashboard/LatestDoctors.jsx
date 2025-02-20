import React from "react";
import { useSelector } from "react-redux";
import useFetchAllDoctors from "../../customHooks/useFetchAllDoctors";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const LatestDoctors = () => {
  useFetchAllDoctors();
  const { doctors = [] } = useSelector((store) => store.doctors);

  if (!Array.isArray(doctors)) {
    return <div>Error: doctors is not an array.</div>;
  }

  const sortedDoctors = [...doctors].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latestDoctors = sortedDoctors.slice(0, 3);

  if (!doctors.length) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="bg-blue-200 text-blue-900 p-6 rounded-lg w-auto shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4">Latest Doctors</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full rounded-lg shadow-lg">
          <tbody>
            {latestDoctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b border-blue-300 transition-colors cursor-pointer hover:bg-blue-300"
              >
                <td className="py-1 px-4 text-left">
                  <Link
                    to={`/admin/doctor-info/${doctor._id}`}
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover object-top"
                      />
                      <span>{doctor.name}</span>
                    </div>
                  </Link>
                </td>
                <td className="py-1 px-4 ">
                  <div className=" space-x-4">
                    <span>{doctor.specialization}</span>
                  </div>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestDoctors;
