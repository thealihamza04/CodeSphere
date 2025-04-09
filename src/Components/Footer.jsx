import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className='bg-gray-900 text-white px-12 py-8'>
        <div>@All rights reserved</div>
        <div className='flex gap-4'>
          <Link to={"/TimeLine"}>TimeLine</Link>
          <Link to={"/"}>Home</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
