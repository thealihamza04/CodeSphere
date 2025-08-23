import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LanCard = ({ Title, Summary, Details }) => {
  return (
    <div className='w-full md:w-80 mt-5 rounded-xl cursor-default group z-30'>
      <div className='card bg-base-100 border border-base-300 text-base-content transition-all duration-300 ease-in-out'>
        <div className='card-body'>
          <h2 className='card-title font-bold text-2xl'>{Title}</h2>
          <p className='text-[14px] text-base-content/80 mt-2 break-words'>{Summary}</p>
          <div className='card-actions justify-end mt-2'>
            <Link
              className='text-[10px] px-[12px] bg-blue-500 p-1 rounded-full text-white font-[400]'
              to={`/Frameworks?lang=${encodeURIComponent(Title)}`}
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

LanCard.propTypes = {
  Title: PropTypes.string.isRequired,
  Summary: PropTypes.string.isRequired,
  Details: PropTypes.array.isRequired,
};

export default LanCard;
