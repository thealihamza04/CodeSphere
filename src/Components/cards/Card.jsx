import React from "react";
import { Link } from "react-router-dom";

const Card = ({ Title, Summary, URL, Tools, Lib, RTNIT }) => {
  return (
    <>
      <div className="w-full sm:w-80 pt-5 rounded-xl cursor-default">
        <div className="card bg-white shadow-sm border-[1px] border-gray-200 hover:shadow-md transition-all duration-500 ease-linear ">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">{Title}</h2>
            <p className="text-[13px] opacity-80 mt-2">
              {Summary}
            </p>
            <a
              className="opacity-25 mt-0 break-words text-xs delay-75"
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-center">Open</span>
            </a>

            <div className="card-actions justify-end mt-1">
              <Link
                className="text-[10px] border-[1px] px-[10px] border-blue-500 p-1 rounded-full text-blue-500 font-medium"
                to="ToLib"
                state={{ tools: Tools, ReturnIT: RTNIT }}
              >
                Tools
              </Link>
              <Link
                className="text-[10px] px-[10px]   bg-blue-500 p-1 rounded-full text-white font-medium"
                to="ToLib"
                state={{ Libraries: Lib, ReturnIT: RTNIT }}
              >
                Lib
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
