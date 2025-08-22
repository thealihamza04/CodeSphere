import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { PiGithubLogoDuotone } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import axios from "axios";
import toast from "react-hot-toast";

const Footer = () => {
  const [isLoading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sendFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://feed-backs.vercel.app/response/add",
        {
          webapp: "codes-sphere",
          senderName: feedback.name,
          senderEmail: "undefined",
          message: feedback.message,
        },
        { timeout: 4000 }
      );

      toast.success("Thanks for your feedback! We appreciate your input");
      setFeedback({
        name: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(" Oops! Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-200'>
      <footer className='footer  text-base-content p-10 container mx-auto'>
        <nav>
          <h6 className='footer-title'>Services</h6>
          <Link to={"/"} className='link link-hover '>
            Home
          </Link>
          <Link to={"/TimeLine"} className='link link-hover '>
            TimeLine
          </Link>
          <Link to={"/ml-roadmap"} className='link link-hover '>
            ML Roadmap
          </Link>
          <Link to={"/Frameworks"} className='link link-hover '>
            Frameworks
          </Link>
          <Link to={"/developer-essential-skills"} className='link link-hover '>
            Why Matters
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
        <form onSubmit={sendFeedback}>
          <h6 className='footer-title '>FeedBack</h6>
          <fieldset className='w-92 space-y-2'>
            <div className='flex flex-row gap-3'>
              <input
                id='name'
                type='text'
                value={feedback.name}
                onChange={(e) =>
                  setFeedback({ ...feedback, name: e.target.value })
                }
                placeholder='your Good Name'
                className='input input-sm focus:outline-none input-bordered'
              />
              <button
                type='submit'
                className={`btn btn-sm join-item relative ${
                  isLoading ? "btn-disabled" : ""
                } `}
              >
                <span
                  className={`${
                    isLoading ? "opacity-100" : "opacity-0"
                  } loading loading-infinity loading-md text-white absolute transition-all duration-500 ease-in-out`}
                ></span>{" "}
                <span
                  className={`${
                    isLoading ? "opacity-0" : "opacity-100"
                  } transition-all duration-500 ease-in-out`}
                >
                  Send
                </span>
              </button>
            </div>
            <textarea
              className='input input-lg focus:outline-none text-xs py-2 px-2 resize-none w-full '
              rows={3}
              id='message'
              onChange={(e) =>
                setFeedback({ ...feedback, message: e.target.value })
              }
              value={feedback.message}
              placeholder='share your thoughts *'
              required={true}
            ></textarea>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
