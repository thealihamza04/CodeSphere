import React from "react";

const Tool_Lib_Card = ({ Name, Summary, URL }) => {
  return (
    <>
      <div className="w-full sm:w-80 pt-5 last:pb-5 rounded-xl cursor-default">
        <div className="card bg-white shadow-sm border-[1px] border-gray-200 hover:shadow-md  transition-all duration-500 ease-linear ">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">{Name}</h2>
            <p className="text-[13px] opacity-80 mt-2">
              {Summary}
            </p>
            <a
              className="opacity-25 mt-0 break-words text-xs delay-75"
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-center">open</span>
              {/* <i className="material-icons text-xs text-center">arrow_forward_ios</i> */}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tool_Lib_Card;
