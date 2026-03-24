import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiStar } from "react-icons/fi";
import useSEO from "./Hooks/useSEO";
import checklistData from "../Data/ProjectChecklist.json";

const ProjectChecklist = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);

  useSEO({
    title: `${checklistData.title} | CodeSphere`,
    description: checklistData.description,
    keywords: "checklist, project management, software development, phases",
    og: {
      title: `${checklistData.title} | CodeSphere`,
      description: checklistData.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${checklistData.title} | CodeSphere`,
      description: checklistData.description,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAddon = (addonKey) => {
    setSelectedAddons((prev) =>
      prev.includes(addonKey)
        ? prev.filter((key) => key !== addonKey)
        : [...prev, addonKey]
    );
  };

  const phases = useMemo(() => {
    // Deep clone to avoid mutating original
    const clonedPhases = JSON.parse(JSON.stringify(checklistData.core.phases));

    selectedAddons.forEach((addonKey) => {
      const addon = checklistData.addons[addonKey];
      if (addon && addon.inject_into_phase) {
        Object.entries(addon.inject_into_phase).forEach(([phaseId, section]) => {
          const targetPhase = clonedPhases.find((p) => p.id === parseInt(phaseId));
          if (targetPhase) {
            targetPhase.sections.push(section);
          }
        });
      }
    });

    return clonedPhases;
  }, [selectedAddons]);

  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => {
          let badgeClass = "text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 border flex items-center gap-1.5 font-sans ";
          let Icon = FiInfo;
          
          if (tag === "must") {
            badgeClass += "border-neutral-900 text-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:text-neutral-100 dark:bg-neutral-800";
            Icon = FiCheckCircle;
          } else if (tag === "caution") {
            badgeClass += "border-neutral-500 text-neutral-700 bg-neutral-50 dark:border-neutral-400 dark:text-neutral-300 dark:bg-neutral-800/50";
            Icon = FiAlertTriangle;
          } else if (tag === "tip") {
            badgeClass += "border-neutral-300 text-neutral-600 bg-white dark:border-neutral-500 dark:text-neutral-400 dark:bg-neutral-900";
            Icon = FiStar;
          } else {
            badgeClass += "border-neutral-200 text-neutral-500 bg-white dark:border-neutral-600 dark:text-neutral-400 dark:bg-neutral-900";
          }
          
          return (
            <span key={tag} className={badgeClass}>
              <Icon className="w-2.5 h-2.5" />
              {tag}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-full overflow-x-hidden min-h-screen bg-[#fdfdfc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-serif selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Hero Header */}
      <div className="border-b-[3px] border-neutral-900 dark:border-neutral-100 pb-12 pt-16 md:pt-24 px-6 max-w-5xl mx-auto relative text-center">
        <div className="absolute top-0 left-0 mt-8">
          <Link
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-widest text-[11px] font-bold font-sans flex items-center gap-2 group"
            to="/"
          >
            <IoIosArrowBack className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
        </div>
        
        <div className="inline-block border border-neutral-900 dark:border-neutral-100 px-3 py-1 text-neutral-900 dark:text-neutral-100 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 font-sans">
          Vol. {checklistData.version}
        </div>
        <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-6 font-serif uppercase">
          {checklistData.title}
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 italic font-serif leading-relaxed max-w-2xl mx-auto">
          {checklistData.description}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-24">
        
        {/* Module Filter Section */}
        <div className="border border-neutral-300 dark:border-neutral-700 p-8 md:p-12 bg-white dark:bg-neutral-900 relative">
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-white dark:bg-neutral-900 px-4">
             <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-900 dark:text-neutral-100 font-sans">
              Domain Configurations
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-serif italic mb-8 max-w-2xl">
            Select the specific modules below to append domain requirements to the standard procedure.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {Object.keys(checklistData.addons).map((key) => {
              const isSelected = selectedAddons.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleAddon(key)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-all font-sans border flex items-center gap-3 ${
                    isSelected
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                      : "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full border ${isSelected ? 'bg-white dark:bg-neutral-900 border-white dark:border-neutral-900' : 'border-neutral-400 dark:border-neutral-600'}`}></span>
                  {key.replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Informational Content Flow */}
        <div className="space-y-16">
          {phases.map((phase) => (
            <div key={phase.id} className="group">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                
                {/* Phase Number Indicator */}
                <div className="md:w-32 shrink-0">
                  <div className="text-[80px] leading-none font-normal text-neutral-200 dark:text-neutral-800 font-serif mr-4 select-none">
                    {String(phase.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Phase Content */}
                <div className="flex-1 pt-4">
                  <div className="border-b-2 border-neutral-900 dark:border-neutral-100 pb-4 mb-8">
                    <h2 className="text-3xl font-normal font-serif uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
                      {phase.title.split('—')[1] || phase.title}
                    </h2>
                  </div>
                  
                  {phase.note && (
                    <div className="mb-10 px-6 py-5 border-l-4 border-neutral-900 dark:border-neutral-300 bg-neutral-50 dark:bg-neutral-900 flex items-start gap-4">
                      <FiInfo className="w-5 h-5 text-neutral-900 dark:text-neutral-300 shrink-0 mt-0.5" />
                      <p className="font-serif italic text-neutral-700 dark:text-neutral-400 leading-relaxed">{phase.note}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-12">
                    {phase.sections.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-6 font-sans">
                          {section.label}
                        </h3>
                        <ul className="space-y-6">
                          {section.tasks.map((task, taskIdx) => (
                            <li key={taskIdx} className="flex gap-4">
                              <div className="mt-1 shrink-0 w-3 h-3 border border-neutral-400 dark:border-neutral-600 flex items-center justify-center"></div>
                              <div className="flex-1">
                                <p className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-300 font-serif">
                                  {task.text}
                                </p>
                                {renderTags(task.tags)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ProjectChecklist;
