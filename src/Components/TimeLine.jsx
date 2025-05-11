import languagesTimeLine from "./TimeLine.js";
import { MdCircle } from "react-icons/md";
import Footer from "./Footer.jsx";
import { useEffect } from "react";

const TimeLine = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className=' min-h-screen px-12 py-20'>
        <h1 className='text-4xl font-bold py-12 text-center'>
          The TimeLine of Languages
        </h1>
        <div>
          <ul className='flex flex-col justify-center items-center  '>
            {Object.entries(languagesTimeLine).map(
              ([language, info], index) => (
                <li key={index} className='min-w-52 md:min-w-60  my-1'>
                  {/* vertical line */}
                  <div
                    className={`bg-gray-700 opacity-50 w-1 px rounded-full  ml-[43.9%] md:ml-[42.3%]`}
                    style={{ minHeight: `${info.gap * 20}px` }}
                  />
                  <div className='flex flex-row gap-5 '>
                    <h1 className='min-w-[25%] '>{info.released}</h1>
                    <MdCircle className='min-w-[20%] text-3xl text-slate-700 opacity-45' />{" "}
                    {/* Set width and height to 10 */}
                    <h1 className='min-w-[50%] '>{language}</h1>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TimeLine;
