import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { PiGithubLogoDuotone } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import axios from "axios";

const Footer = () => {
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sendFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name =
      document.getElementById("name").value != ""
        ? "undefined"
        : document.getElementById("name").value;
    const message = document.getElementById("message").value;

    try {
      const response = await axios.post(
        "https://feed-backs.vercel.app/response/add",
        {
          webapp: "codes-sphere",
          senderName: name,
          senderEmail: "undefined",
          message: message,
        },
        { timeout: 4000 }
      );

      if (response.status == 200) {
        document.getElementById("name").value = "";
        document.getElementById("message").value = "";
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1500);
      } else {
        setIsError(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-200'>
      <div>
        <div
          role='alert'
          className={`alert ${
            isError ? "alert-error" : "alert-success"
          } fixed  right-4 w-80 z-50 ${
            showAlert ? "bottom-4" : "-bottom-24"
          } transition-all duration-500 ease-in-out`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 shrink-0 stroke-current'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>
            {isError ? "ops! Server down" : " Thanks for your feedback!"}
          </span>
        </div>
      </div>
      <footer className='footer  text-base-content p-10 container mx-auto'>
        <nav>
          <h6 className='footer-title'>Services</h6>
          <Link to={"/"} className='link link-hover '>
            Home
          </Link>
          <Link to={"/TimeLine"} className='link link-hover '>
            TimeLine
          </Link>
          <Link to={"/developer-essential-skills"} className='link link-hover '>
            Dev essential skills
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
          <h6 className='footer-title'>FeedBack</h6>
          <fieldset className='w-92 space-y-2'>
            <div className='flex flex-row gap-3'>
              <input
                id='name'
                type='text'
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
