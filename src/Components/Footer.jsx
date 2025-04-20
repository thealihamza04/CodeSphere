import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className='bg-gray-900/15 text-black px-12 py-8 pt-12 '>
        <div>
          Explore tools, libraries & the evolution of coding languages
          <br />
          all in one place.
        </div>
        <div className='flex gap-4'>
          <Link
            to={"/TimeLine"}
            className='btn btn-link  text-black opacity-70 '
          >
            TimeLine
          </Link>
          <Link to={"/"} className='btn btn-link text-black opacity-70 '>
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
