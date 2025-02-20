import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1C1C1C] p-6">

      <div className="flex flex-row flex-wrap items-center justify-center gap-y-4 gap-x-8 text-center md:justify-between">
        <Link to="/">
          {/* <div>
            <img
              src="/logo.png"
              alt="logo-ct"
              className="w-36 h-36 object-contain hover:scale-105 transition-transform"
            />
          </div> */}
        </Link>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-6">
          <Link to="/about">
            <li>
              <Typography
                as="a"
                className="font-normal text-gray-300 hover:text-white hover:scale-105 transition-all transform text-lg"
              >
                About Us
              </Typography>
            </li>
          </Link>

          <Link to="/rooms">
            <li>
              <Typography
                as="a"
                className="font-normal text-gray-300 hover:text-white hover:scale-105 transition-all transform text-lg"
              >
                Rooms
              </Typography>
            </li>
          </Link>

          <Link to="/hotels">
            <li>
              <Typography
                as="a"
                className="font-normal text-gray-300 hover:text-white hover:scale-105 transition-all transform text-lg"
              >
                Hotels
              </Typography>
            </li>
          </Link>

          <Link to="/contact">
            <li>
              <Typography
                as="a"
                className="font-normal text-gray-300 hover:text-white hover:scale-105 transition-all transform text-lg"
              >
                Contact
              </Typography>
            </li>
          </Link>
        </ul>
      </div>
      <hr className="my-4 border-gray-700" />
      <Typography className="text-center text-gray-300 font-bold text-lg">
        &copy; 2024  . All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;