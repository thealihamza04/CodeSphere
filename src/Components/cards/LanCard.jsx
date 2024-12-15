import React from "react";
import { Link } from "react-router-dom";

const LanCard = ({ Title, Summary, Details }) => {
  return (
    <div className="w-full sm:w-80 mt-5">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">{Title}</h2>
          <p className="text-sm sm:text-base text-justify mt-2">{Summary}</p>
          <div className="card-actions justify-end mt-4">
            <Link
              className="btn btn-outline btn-primary px-4 sm:px-5 text-sm sm:text-base"
              to="/Frameworks"
              state={{ Frameworks: Details }}
            >
              Frameworks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanCard;
