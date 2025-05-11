import React from "react";
import { Link } from "react-router-dom";

const LanCard = ({ Title, Summary, Details }) => {
  return (
    <div className='w-full md:w-80 mt-5 rounded-xl cursor-default group z-30'>
      <div className='card bg-white border border-gray-200   transition-all duration-300 ease-in-out '>
        <div className='card-body'>
          <h2 className='card-title font-bold text-2xl'>{Title}</h2>
          <p className='text-[14px] opacity-80 mt-2 break-words'>{Summary}</p>
          <div className='card-actions justify-end mt-2'>
            <Link
              className='text-[10px] px-[12px] bg-blue-500 p-1 rounded-full text-white font-[400]'
              to='/Frameworks'
              state={{ Frameworks: Details }}
            >
              Frmwrks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanCard;
