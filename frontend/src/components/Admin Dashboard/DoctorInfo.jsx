import React from "react";
import useFetchDoctorById from "../../customHooks/useFetchDoctorById";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const DoctorInfo = () => {
  const navigate = useNavigate();
  useFetchDoctorById();
  const { singleDoctor } = useSelector((store) => store.doctors);

  if (!singleDoctor) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-gray-900 min-h-screen flex items-center justify-center flex-col">
      <Button className="mb-4 self-start ml-80" onClick={() => navigate(-1)}>Back</Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-lg p-6 mb-4 gap-4 w-full max-w-4xl"> 
        {/* Doctor Image */}
        <img
          src={singleDoctor.avatar}
          alt={singleDoctor.name}
          className="w-full h-72 lg:h-80 rounded-lg object-cover object-top" 
        />
        {/* Doctor Info Box */}
        <div className="flex flex-col justify-center p-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {singleDoctor?.name}
          </h3>
          <p className="text-gray-600 mt-1">Email: {singleDoctor?.email}</p>
          <p className="text-gray-600 mt-1">
            Specialization: {singleDoctor?.specialization}
          </p>
          <p className="text-gray-700 mt-2">{singleDoctor?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
