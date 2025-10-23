import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const LanCard = ({ Title, Summary, Details, Libraries, LanguageURL }) => {
  return (
    <div className='z-30 w-full rounded-sm cursor-default md:w-80 group '>
      <div className='transition-all duration-150 ease-in-out border !rounded-3xl  card bg-base-200 border-base-300 text-base-content '>
        <div className='p-[24px] card-body'>
          <h2 className='text-[15px] font-extrabold card-title'>{Title}</h2>
          <p className='text-[14px] text-base-content/80  text-pretty  '>{Summary}</p>
          {Libraries.length > 0 && (
            <div className='mt-4 space-y-2'>
              <p className='text-[11px] font-semibold tracking-wide uppercase text-base-content/60'>Key Libraries</p>
              <div className='flex flex-wrap gap-2'>
                {Libraries.map((library) => (
                  <a
                    key={library.Name}
                    href={library.URL}
                    target='_blank'
                    rel='noopener noreferrer'
                    title={library.Summary}
                    className='px-3 py-1 text-[11px] font-medium transition-colors border rounded-full text-base-content/80 border-base-300 hover:text-base-content hover:bg-base-300/40'
                  >
                    {library.Name}
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className='justify-end card-actions'>
            <div className='flex flex-wrap items-center justify-end w-full gap-2'>
              <Link
                className='text-[12px] px-[12px] py-1 rounded-full text-base-content font-medium border border-base-300 hover:bg-base-300/30 transition-colors'
                to={`/Frameworks?lang=${encodeURIComponent(Title)}`}
                state={{ Frameworks: Details }}
              >
                Frameworks
              </Link>
              <Link
                className='text-[12px] px-[12px] py-1 rounded-full text-base-content font-medium border border-base-300 hover:bg-base-300/30 transition-colors'
                to={`/libraries?lang=${encodeURIComponent(Title)}`}
              >
                Libraries
              </Link>
              {LanguageURL && (
                <a
                  className='text-[12px] px-[12px] py-1 rounded-full text-base-content font-medium border border-base-300 hover:bg-base-300/30 transition-colors'
                  href={LanguageURL}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Language
                </a>
              )}
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
};

LanCard.defaultProps = {
  Libraries: [],
  LanguageURL: "",
};

export default LanCard;
