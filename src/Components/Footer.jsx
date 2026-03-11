import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";

const Footer = () => {
  useEffect(() => {
    // Optional: add any logic here if needed
  }, []);

  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: "Navigation",
      links: [
        { name: "Home", path: "/" },
        { name: "Frameworks", path: "/Frameworks" },
        { name: "Libraries Catalog", path: "/libraries" },
      ],
    },
    {
      title: "Roadmaps",
      links: [
        { name: "Software Eng.", path: "/swe-roadmap" },
        { name: "AI Engineering", path: "/ai-roadmap" },
        { name: "Machine Learning", path: "/ml-roadmap" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "System Design", path: "/system-design" },
        { name: "Design Patterns", path: "/design-patterns" },
        { name: "Infrastructure", path: "/devops" },
        { name: "Design Principles", path: "/design-principles" },
        { name: "Essential Skills", path: "/developer-essential-skills" },
      ],
    },
  ];

  return (
    <footer className="bg-base-100 border-t border-base-300 pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        {/* Main Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20 place-items-start">
          {linkGroups.map((group, idx) => (
            <div key={idx} className="space-y-6 w-full max-w-[150px]">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 italic">
                {group.title}
              </h6>
              <ul className="space-y-4">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.path} 
                      className="group/link text-[13px] font-bold text-base-content/60 hover:text-primary transition-all duration-300 flex items-center gap-1.5"
                    >
                      {link.name}
                      <LuArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Special Evolution Column */}
          <div className="space-y-6 w-full max-w-[150px]">
             <h6 className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 italic">
                Extra
              </h6>
              <ul className="space-y-4">
                <li>
                  <Link to="/animations-guide" className="group/link text-[13px] font-bold text-base-content/60 hover:text-primary transition-all duration-300 flex items-center gap-1.5">
                    Animations
                    <LuArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link to="/TimeLine" className="group/link text-[13px] font-bold text-base-content/60 hover:text-primary transition-all duration-300 flex items-center gap-1.5 italic">
                    Timeline
                    <LuArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </Link>
                </li>
              </ul>
          </div>
        </div>

        {/* Branding & Socials Strip */}
        <div className="flex flex-col items-start gap-8 pt-10 border-t border-base-200">
          
          {/* Subtle Socials */}
          <div className="flex items-center gap-6">
            <a href="https://github.com/thealihamza04" target="_blank" rel="noreferrer" className="text-base-content/40 hover:text-primary hover:scale-110 transition-all duration-300">
              <FaGithub className="size-5" />
            </a>
            <a href="https://www.linkedin.com/in/thealihamza04/" target="_blank" rel="noreferrer" className="text-base-content/40 hover:text-primary hover:scale-110 transition-all duration-300">
              <FaLinkedinIn className="size-5" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=thealihamza0@gmail.com" target="_blank" rel="noreferrer" className="text-base-content/40 hover:text-primary hover:scale-110 transition-all duration-300">
              <FaEnvelope className="size-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-left space-y-2">
            <p className="text-[11px] font-black text-base-content/25 tracking-[0.2em] uppercase italic">
              CodeSphere
            </p>
            <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider">
              &copy; {currentYear} &bull; Designed by Ali Hamza
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
