import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const LanCard = ({
  Title,
  Summary,
  Details,
  Libraries, // eslint-disable-line no-unused-vars
  LanguageURL,
  animationDelay,
}) => {
  return (
    <div
      className='z-30 w-full rounded-sm cursor-default md:w-80 group '
      data-aos='fade-up'
      data-aos-delay={animationDelay}
    >
      <div className='transition-all duration-150 ease-in-out border !rounded-3xl  card bg-base-200 border-base-300 text-base-content '>
        <div className='p-[24px] card-body'>
          <h2 className='text-[15px] font-extrabold card-title'>
            <a href={LanguageURL ?? ''} target="_blank">
              {Title}
            </a>
          </h2>
          <p className='text-[14px] text-base-content/80  text-pretty  '>{Summary}</p>

          <div className='justify-end pt-3 card-actions'>
            <div className='flex flex-wrap items-center justify-end w-full gap-2'>
              <Link
                className='text-[12px] px-[12px] py-1 rounded-full text-base-content font-medium border border-base-300 hover:bg-base-300/30 transition-colors'
                to={`/Frameworks?lang=${encodeURIComponent(Title)}`}
                state={{ Frameworks: Details }}
              >
                Frameworks
              </Link>
              <Link
                className='text-[12px] px-[12px] py-1 rounded-full text-base-content bg-neutral  font-medium border border-base-300 '
                to={`/libraries?lang=${encodeURIComponent(Title)}`}
              >
                Libraries
              </Link>
            </div>
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
  Libraries: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Summary: PropTypes.string.isRequired,
      URL: PropTypes.string.isRequired,
    })
  ),
  LanguageURL: PropTypes.string,
  animationDelay: PropTypes.number,
};

LanCard.defaultProps = {
  Libraries: [],
  LanguageURL: "",
  animationDelay: 0,
};

export default LanCard;
