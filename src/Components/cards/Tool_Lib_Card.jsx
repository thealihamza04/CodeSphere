import React from "react";

const Tool_Lib_Card = ({ Name, Summary, URL }) => {
  return (
    <div className="w-full sm:w-80 mt-5">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">{Name}</h2>
          <p className="text-sm sm:text-base text-justify mt-2">{Summary}</p>
          <a
            className="opacity-25 mt-4 break-words text-sm sm:text-base delay-75 flex items-center flex-row"
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            open
            <i className="material-icons text-sm">arrow_forward_ios</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tool_Lib_Card;
