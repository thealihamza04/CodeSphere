import PropTypes from "prop-types";

const Tool_Lib_Card = ({ Name, Summary, URL, animationDelay }) => {
  return (
    <>
      <div
        className="w-full sm:w-80 pt-5 last:pb-5 rounded-xl cursor-default"
        data-aos='fade-up'
        data-aos-delay={animationDelay}
      >
        <div className="card bg-base-200 shadow-sm border border-base-300 text-base-content hover:shadow-md  transition-all duration-500 ease-linear">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">{Name}</h2>
            <p className="text-[13px] text-base-content/80 mt-2">
              {Summary}
            </p>
            <a
              className="text-base-content/25 mt-0 break-words text-xs delay-75"
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

Tool_Lib_Card.propTypes = {
  Name: PropTypes.string.isRequired,
  Summary: PropTypes.string.isRequired,
  URL: PropTypes.string.isRequired,
  animationDelay: PropTypes.number,
};

Tool_Lib_Card.defaultProps = {
  animationDelay: 0,
};

export default Tool_Lib_Card;
