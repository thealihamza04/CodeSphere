import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { PiGithubLogoDuotone } from "react-icons/pi";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className='bg-base-200'>
      <footer className='container p-10 mx-auto footer text-base-content'>
        <nav>
          <h6 className='footer-title'>Explore</h6>
          <Link to={"/"} className='link link-hover '>
            Home
          </Link>
          <Link to={"/Frameworks"} className='link link-hover '>
            Frameworks
          </Link>
          <Link to={"/libraries"} className='link link-hover '>
            Libraries
          </Link>
        </nav>
        <nav>
          <h6 className='footer-title'>Roadmaps</h6>
          <Link to={"/swe-roadmap"} className='link link-hover '>
            Software Engineering
          </Link>
          <Link to={"/ml-roadmap"} className='link link-hover '>
            Machine Learning
          </Link>
          <Link to={"/ai-roadmap"} className='link link-hover '>
            AI Engineering
          </Link>
        </nav>
        <nav>
          <h6 className='footer-title'>Resources</h6>
          <Link to={"/TimeLine"} className='link link-hover '>
            Evolution Timeline
          </Link>
          <Link to={"/developer-essential-skills"} className='link link-hover '>
            Essential Skills
          </Link>
          <Link to={"/design-principles"} className='link link-hover '>
            Design Principles
          </Link>
        </nav>
        <nav>
          <h6 className='footer-title'>Social</h6>
          <div className='grid grid-flow-col gap-4'>
            <a
              className='fill-current'
              target='_blank'
              href='https://www.linkedin.com/in/contact-with-alihamza'
            >
              <FaLinkedinIn className='size-5' />
            </a>
            <a
              className='fill-current'
              target='_blank'
              href='https://github.com/thealihamza04'
            >
              <PiGithubLogoDuotone className='size-6' />
            </a>
            <a
              href='https://mail.google.com/mail/?view=cm&fs=1&to=ah0681988@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
              className='fill-current'
            >
              <SiGmail className='size-5' />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
