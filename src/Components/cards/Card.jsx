import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ Title, Summary, URL, Tools, Lib, RTNIT, PrevPath }) => {
  return (
    <div className='z-30 w-full rounded-sm cursor-default md:w-80 group'>
      <div className='transition-all duration-150 ease-in-out border !rounded-3xl card bg-base-200 border-base-300 text-base-content'>
        <div className='p-[24px] card-body'>
          <h2 className='text-[15px] font-extrabold card-title'>{Title}</h2>
          <p className='text-[14px] text-base-content/80 text-pretty'>{Summary}</p>
          <a
            className='text-[12px] text-base-content/60 underline-offset-2 '
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open
          </a>
          <div className='justify-end card-actions'>
            <Link
              className='text-[12px] px-[12px] p-1 rounded-full text-base-content font-[400] flex items-center underline-offset-2  border border-base-300'
              to={`/Frameworks/${encodeURIComponent(Title)}/tools`}
              state={{ tools: Tools, ReturnIT: RTNIT, PrevPath }}
            >
              Tools
            </Link>
            <Link
              className='text-[12px] px-[12px] p-1 rounded-full text-base-content font-[400] flex items-center underline-offset-2  bg-base-300'
              to={`/Frameworks/${encodeURIComponent(Title)}/libraries`}
              state={{ Libraries: Lib, ReturnIT: RTNIT, PrevPath }}
            >
              Lib
            </Link>
          </div>
        </div>
      </div>
    </div>
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
