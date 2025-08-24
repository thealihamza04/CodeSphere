import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ Title, Summary, URL, Tools, Lib, RTNIT, PrevPath }) => {
  return (
    <>
      <div className="w-full sm:w-80 pt-5 rounded-xl cursor-default">
        <div className="card bg-base-200 shadow-sm border border-base-300 text-base-content hover:shadow-md transition-all duration-500 ease-linear">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">{Title}</h2>
            <p className="text-[13px] text-base-content/80 mt-2">
              {Summary}
            </p>
            <a
              className="text-base-content/25 mt-0 break-words text-xs delay-75"
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-center">Open</span>
            </a>

            <div className="card-actions justify-end mt-1">
              <Link
                className="text-[10px] border px-[10px] border-blue-500 p-1 rounded-full text-blue-500 font-medium"
                to={`/Frameworks/${encodeURIComponent(Title)}/tools`}
                state={{ tools: Tools, ReturnIT: RTNIT, PrevPath }}
              >
                Tools
              </Link>
              <Link
                className="text-[10px] px-[10px] bg-blue-500 p-1 rounded-full text-white font-medium"
                to={`/Frameworks/${encodeURIComponent(Title)}/libraries`}
                state={{ Libraries: Lib, ReturnIT: RTNIT, PrevPath }}
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

Card.propTypes = {
  Title: PropTypes.string.isRequired,
  Summary: PropTypes.string.isRequired,
  URL: PropTypes.string.isRequired,
  Tools: PropTypes.array.isRequired,
  Lib: PropTypes.array.isRequired,
  RTNIT: PropTypes.array.isRequired,
  PrevPath: PropTypes.string.isRequired,
};

export default Card;
