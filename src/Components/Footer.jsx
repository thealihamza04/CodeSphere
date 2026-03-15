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
      title: "Catalog",
      links: [
        { name: "Home", path: "/" },
        { name: "Frameworks Catalog", path: "/Frameworks" },
        { name: "Language Timeline", path: "/TimeLine" },
      ],
    },

    {
      title: "Architecture",
      links: [
        { name: "System Design", path: "/system-design" },
        { name: "Design Patterns", path: "/design-patterns" },
        { name: "DevOps & Infrastructure", path: "/devops" },
      ],
    },
    {
      title: "Insights",
      links: [
        { name: "Design Principles", path: "/design-principles" },
        { name: "Motion Principles", path: "/motion-design" },
        { name: "Animation Systems", path: "/animations-guide" },
        { name: "Civic Sense", path: "/civic-sense" },
        { name: "Social Intelligence", path: "/social-intelligence" },
      ],
    },
  ];

  return (
    <footer className="bg-base-100 border-t border-base-300 pt-24 pb-12">
      <div className="container mx-auto px-6">

        {/* Main Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-24">
          {linkGroups.map((group, idx) => (
            <div key={idx} className="space-y-6">
              <h6 className="text-[11px] font-black uppercase tracking-widest text-base-content/40">
                {group.title}
              </h6>
              <ul className="space-y-3.5">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.path}
                      className="group/link text-[14px] font-medium text-base-content/70 hover:text-primary transition-all flex items-center gap-2"
                    >
                      {link.name}
                      <LuArrowUpRight className="size-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-[opacity,transform] duration-300 text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Branding & Socials Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-10 border-t border-base-200">
          
          {/* Copyright & Branding */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="text-[11px] font-black text-base-content/25 tracking-[0.3em] uppercase italic">
              CodeSphere
            </p>
            <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest sm:border-l border-base-200 sm:pl-8">
              &copy; {currentYear} &bull; Designed by Ali Hamza
            </p>
          </div>

          {/* Subtle Socials */}
          <div className="flex items-center gap-8">
            <a href="https://github.com/thealihamza04" target="_blank" rel="noreferrer" className="text-base-content/30 hover:text-primary hover:-translate-y-1 transition-all duration-300">
              <FaGithub className="size-5" />
            </a>
            <a href="https://www.linkedin.com/in/thealihamza04/" target="_blank" rel="noreferrer" className="text-base-content/30 hover:text-primary hover:-translate-y-1 transition-all duration-300">
              <FaLinkedinIn className="size-5" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=thealihamza0@gmail.com" target="_blank" rel="noreferrer" className="text-base-content/30 hover:text-primary hover:-translate-y-1 transition-all duration-300">
              <FaEnvelope className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
