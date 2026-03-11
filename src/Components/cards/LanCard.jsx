import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LuArrowUpRight } from "react-icons/lu";

const LanCard = ({
  Title,
  Summary,
  Details,
  Libraries,
  LanguageURL,
}) => {
  return (
    <div className='w-full md:w-80 h-full group'>
      <div className='card h-full bg-base-200/50 hover:bg-base-200 border border-base-300 rounded-[2rem] transition-all duration-300 group-hover:border-base-content/20'>
        <div className='p-8 card-body flex flex-col justify-between'>
          <div>
            {LanguageURL ? (
              <a
                href={LanguageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title inline-flex items-baseline gap-2"
              >
                <h2 className='text-xl font-bold text-base-content tracking-tight mb-3 group-hover/title:text-primary transition-colors'>{Title}</h2>
                <LuArrowUpRight className="size-3.5 opacity-0 text-primary transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
              </a>
            ) : (
              <h2 className='text-xl font-bold text-base-content tracking-tight mb-3'>{Title}</h2>
            )}
            <p className='text-[14px] leading-relaxed text-base-content/50 font-medium'>{Summary}</p>
          </div>

          <div className="space-y-6 pt-6">
            <div className='flex items-center gap-3'>
              <Link
                className='w-full py-2.5 rounded-xl border border-base-300 bg-base-200 hover:bg-base-300 text-[11px] font-bold uppercase tracking-wider text-center transition-all'
                to={`/Frameworks?lang=${encodeURIComponent(Title)}`}
                state={{ Frameworks: Details }}
              >
                Frameworks
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
  LanguageURL: PropTypes.string,
};

LanCard.defaultProps = {
  LanguageURL: "",
};

export default LanCard;
