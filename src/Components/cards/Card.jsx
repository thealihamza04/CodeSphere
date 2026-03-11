import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LuArrowUpRight } from "react-icons/lu";

const Card = ({
  Title,
  Summary,
  URL,
  Tools,
  Lib,
  RTNIT,
  PrevPath,
}) => {
  return (
    <div className='w-full md:w-80 group h-full'>
      <div className='card h-full bg-base-200/50 hover:bg-base-200 border border-base-300 rounded-[2rem] transition-[transform,shadow] duration-300 group-hover:border-base-content/20'>
        <div className='p-8 card-body flex flex-col justify-between'>
          <div>
            {URL ? (
              <a
                href={URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title inline-flex items-baseline gap-2"
              >
                <h2 className='text-xl font-bold text-base-content tracking-tight mb-3 group-hover/title:text-primary'>{Title}</h2>
                <LuArrowUpRight className="size-3.5 opacity-0 text-primary transition-[opacity,transform] duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
              </a>
            ) : (
              <h2 className='text-xl font-bold text-base-content tracking-tight mb-3'>{Title}</h2>
            )}
            <p className='text-[14px] leading-relaxed text-base-content/50 font-medium'>{Summary}</p>
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
};

export default Card;
