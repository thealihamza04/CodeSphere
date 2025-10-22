import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdNavigateNext } from "react-icons/md";
import { motion } from "motion/react";


const LanCard = ({ Title, Summary, Details }) => {
  return (
    <div className='z-30 w-full rounded-sm cursor-default md:w-80 group '>
      <div className='transition-all duration-150 ease-in-out border !rounded-3xl  card bg-base-200 border-base-300 text-base-content '>
        <div className='p-[24px] card-body'>
          <h2 className='text-[15px] font-extrabold card-title'>{Title}</h2>
          <p className='text-[14px] text-base-content/80  text-pretty  '>{Summary}</p>
          <div className='justify-end card-actions'>
            <Link
              className='text-[12px] px-[12px] p-1 rounded-full text-base-content font-[400] flex  items-center group underline-offset-2  underline'
              to={`/Frameworks?lang=${encodeURIComponent(Title)}`}
              state={{ Frameworks: Details }}
            >
              <span>
                Frmwrks
              </span>
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
