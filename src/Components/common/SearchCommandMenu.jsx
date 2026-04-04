import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const pageGroups = [
  {
    group: "Core Guides",
    items: [
      { label: 'Programming Languages', path: '/' },
      { label: 'Frameworks', path: '/Frameworks' },
      { label: 'Programming Timeline', path: '/TimeLine' },
    ]
  },
  {
    group: "Roadmaps",
    items: [
      { label: 'Machine Learning Roadmap', path: '/ml-roadmap' },
      { label: 'AI Engineer Roadmap', path: '/ai-roadmap' },
      { label: 'Software Engineer Roadmap', path: '/swe-roadmap' },
    ]
  },
  {
    group: "Engineering & Architecture",
    items: [
      { label: 'System Design', path: '/system-design' },
      { label: 'Design Patterns', path: '/design-patterns' },
      { label: 'DevOps', path: '/devops' },
    ]
  },
  {
    group: "Experience & Design",
    items: [
      { label: 'Design Principles', path: '/design-principles' },
      { label: 'Animations Guide', path: '/animations-guide' },
      { label: 'Motion Design', path: '/motion-design' },
      { label: 'Design Styles', path: '/design-styles' },
    ]
  },
  {
    group: "Human Intelligence",
    items: [
      { label: 'Developer Essential Skills', path: '/developer-essential-skills' },
      { label: 'Civic Sense', path: '/civic-sense' },
      { label: 'Social Intelligence', path: '/social-intelligence' },
    ]
  },
  {
    group: "Resources",
    items: [
      { label: 'Project Checklist', path: '/project-checklist' },
    ]
  }
];

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    if (open) lockScroll();
    else unlockScroll();

    return () => unlockScroll();
  }, [open]);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 btn btn-ghost top-4 right-16"
        aria-label="Search"
      >
        <LuSearch className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/50" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg border bg-base-100 border-base-300" onClick={(e) => e.stopPropagation()}>
            <Command className="flex flex-col h-full">
              <div className="flex items-center px-4 border-b border-base-300 h-14">
                <Command.Input
                  autoFocus
                  placeholder="Where should we go?"
                  className="w-full text-sm font-medium bg-transparent outline-none placeholder:text-base-content/30"
                />
              </div>

              <Command.List data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                <Command.Empty className="py-12 text-sm text-center text-base-content/40">No results found.</Command.Empty>

                {pageGroups.map((group) => (
                  <Command.Group
                    key={group.group}
                    heading={group.group}
                    className="px-0 pt-4  text-[10px] font-bold uppercase  text-base-content/70"
                  >
                    {group.items.map((page) => (
                      <Command.Item
                        key={page.path}
                        value={page.label}
                        onSelect={() => runCommand(() => navigate(page.path))}
                        className="px-8 py-3 cursor-pointer aria-selected:bg-primary aria-selected:text-white"
                      >
                        <span className="text-[14px] font-bold tracking-tight">{page.label}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCommand;
