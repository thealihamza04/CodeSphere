import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiStar, FiCheck, FiX, FiTrash2, FiCopy, FiHelpCircle } from "react-icons/fi";
import { SiOpenai, SiAnthropic, SiPerplexity } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import useSEO from "./Hooks/useSEO";
import checklistData from "../Data/ProjectChecklist.json";

const ProjectChecklist = () => {
  const canUseStorage = typeof window !== "undefined" && typeof localStorage !== "undefined";

  // Persistence states
  const [selectedAddons, setSelectedAddons] = useState(() => {
    if (!canUseStorage) return [];
    const saved = localStorage.getItem("codesphere_checklist_addons");
    return saved ? JSON.parse(saved) : [];
  });

  const [checkedTaskIds, setCheckedTaskIds] = useState(() => {
    if (!canUseStorage) return [];
    const saved = localStorage.getItem("codesphere_checklist_checked");
    return saved ? JSON.parse(saved) : [];
  });

  const [hasShownWarning, setHasShownWarning] = useState(() => {
    if (!canUseStorage) return false;
    return localStorage.getItem("codesphere_checklist_warning_shown") === "true";
  });

  // UI state
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showAICategoryModal, setShowAICategoryModal] = useState(false);
  const [hoveredAddon, setHoveredAddon] = useState(null);

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

  // Persistence effects
  useEffect(() => {
    if (!canUseStorage) return;
    localStorage.setItem("codesphere_checklist_addons", JSON.stringify(selectedAddons));
  }, [canUseStorage, selectedAddons]);

  useEffect(() => {
    if (!canUseStorage) return;
    localStorage.setItem("codesphere_checklist_checked", JSON.stringify(checkedTaskIds));
  }, [canUseStorage, checkedTaskIds]);

  useEffect(() => {
    if (!canUseStorage) return;
    if (hasShownWarning) {
      localStorage.setItem("codesphere_checklist_warning_shown", "true");
    }
  }, [canUseStorage, hasShownWarning]);

  const toggleAddon = (addonKey) => {
    setSelectedAddons((prev) =>
      prev.includes(addonKey)
        ? prev.filter((key) => key !== addonKey)
        : [...prev, addonKey]
    );
  };

  const toggleTask = (taskId) => {
    if (!hasShownWarning && !checkedTaskIds.includes(taskId)) {
      setShowWarningModal(true);
      return;
    }

    setCheckedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const clearAllProgress = () => {
    setCheckedTaskIds([]);
    setShowClearConfirm(false);
  };

  const phases = useMemo(() => {
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

  const totalTasks = useMemo(() => {
    let count = 0;
    phases.forEach(phase => {
      phase.sections.forEach(section => {
        count += section.tasks.length;
      });
    });
    return count;
  }, [phases]);

  const completedTasks = useMemo(() => {
    // We only count tasks that actually exist in current view (phases)
    let count = 0;
    const currentTaskIds = new Set();
    phases.forEach(phase => {
      phase.sections.forEach(section => {
        section.tasks.forEach(task => currentTaskIds.add(task.id));
      });
    });

    checkedTaskIds.forEach(id => {
      if (currentTaskIds.has(id)) count++;
    });
    return count;
  }, [phases, checkedTaskIds]);

  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const renderTags = (tags, isChecked) => {
    if (!tags || tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => {
          let badgeClass = "text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 border flex items-center gap-1.5 font-sans ";
          let Icon = FiInfo;
          
          if (tag === "must") {
            if (isChecked) {
              badgeClass += "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 transition-all duration-300";
              Icon = FiCheckCircle;
            } else {
              badgeClass += "border-neutral-900 text-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:text-neutral-100 dark:bg-neutral-800";
              Icon = FiCheckCircle;
            }
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
    <div 
      className="max-w-full overflow-x-hidden min-h-screen bg-[#fdfdfc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-serif selection:bg-neutral-200 dark:selection:bg-neutral-800 pb-32"
      data-page-context={JSON.stringify(checklistData)}
    >
      
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
             <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-900 dark:text-neutral-100 font-sans flex items-center gap-3">
              Domain Configurations
              <button 
                onClick={() => setShowAICategoryModal(true)}
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                title="Help categorizing your project"
              >
                <FiHelpCircle className="w-4 h-4" />
              </button>
            </h2>
          </div>
          <div className="flex justify-between items-start mb-8 gap-4 flex-wrap">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-serif italic max-w-2xl">
              Select the specific modules below to append domain requirements to the standard procedure.
            </p>
            {checkedTaskIds.length > 0 && (
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest transition-colors font-sans border-b border-transparent hover:border-red-500"
              >
                <FiTrash2 className="w-3 h-3" /> Clear Progress
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-6">
            {Object.keys(checklistData.addons).map((key) => {
              const isSelected = selectedAddons.includes(key);
              const addon = checklistData.addons[key];
              return (
                <div key={key} className="relative group/tooltip">
                  <button
                    onClick={() => toggleAddon(key)}
                    onMouseEnter={() => setHoveredAddon(key)}
                    onMouseLeave={() => setHoveredAddon(null)}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-all font-sans border flex items-center gap-3 ${
                      isSelected
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                        : "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full border ${isSelected ? 'bg-white dark:bg-neutral-900 border-white dark:border-neutral-900' : 'border-neutral-400 dark:border-neutral-600'}`}></span>
                    {key.replace("_", " ")}
                  </button>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredAddon === key && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 bottom-full left-0 mb-4 w-64 p-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-2xl pointer-events-none"
                      >
                        <div className="text-[10px] uppercase font-bold tracking-widest mb-2 opacity-60">Project Tags</div>
                        <p className="text-xs font-serif leading-relaxed italic">
                          {addon.tooltip || "General project requirements."}
                        </p>
                        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-neutral-900 dark:bg-neutral-100 rotate-45"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informational Content Flow */}
        <div className="space-y-24">
          {phases.map((phase) => (
            <div key={phase.id} className="group">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                
                {/* Phase Number Indicator */}
                <div className="md:w-32 shrink-0">
                  <div className="text-[80px] leading-none font-normal text-neutral-100 dark:text-neutral-900 font-serif mr-4 select-none transition-colors duration-500">
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
                          {section.tasks.map((task) => {
                            const isChecked = checkedTaskIds.includes(task.id);
                            return (
                              <li 
                                key={task.id} 
                                onClick={() => toggleTask(task.id)}
                                className="flex gap-4 group/task cursor-pointer select-none"
                              >
                                <div className={`mt-1 shrink-0 w-4 h-4 border transition-all duration-300 flex items-center justify-center ${
                                  isChecked 
                                    ? "bg-neutral-900 border-neutral-900 dark:bg-neutral-100 dark:border-neutral-100" 
                                    : "border-neutral-400 dark:border-neutral-600 group-hover/task:border-neutral-900 dark:group-hover/task:border-neutral-100"
                                }`}>
                                  {isChecked && <FiCheck className="w-3 h-3 text-white dark:text-neutral-900" />}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-[15px] leading-relaxed font-serif transition-colors duration-300 ${
                                    isChecked 
                                      ? "text-neutral-400 dark:text-neutral-600 line-through decoration-neutral-900/10 dark:decoration-neutral-100/10" 
                                      : "text-neutral-800 dark:text-neutral-300 group-hover/task:text-neutral-900 dark:group-hover/task:text-neutral-100"
                                  }`}>
                                    {task.text}
                                  </p>
                                  {renderTags(task.tags, isChecked)}
                                </div>
                              </li>
                            );
                          })}
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

      {/* Sticky Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 shrink-0">
             <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 font-sans">Progress</div>
             <div className="font-serif italic text-neutral-900 dark:text-neutral-100 font-medium">
              {completedTasks}<span className="text-[10px] font-sans opacity-40 mx-1">/</span>{totalTasks}
            </div>
          </div>
          
          <div className="flex-1 relative h-1 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="absolute top-0 left-0 h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-500 ease-out"
            />
          </div>

          <div className="shrink-0 text-right">
            <div className="text-xl font-serif italic text-neutral-900 dark:text-neutral-100">{progressPercentage}%</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showWarningModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWarningModal(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-neutral-900 border border-neutral-900 dark:border-neutral-100 p-8 md:p-12 max-w-lg w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-900 dark:border-neutral-100">
                  <FiAlertTriangle className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                </div>
                <button onClick={() => setShowWarningModal(false)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-2xl font-serif uppercase tracking-tight mb-4">Storage Information</h3>
              <p className="text-neutral-600 dark:text-neutral-400 italic font-serif leading-relaxed mb-8">
                Your checklist progress is stored exclusively on your local browser. It is not saved to a server or accessible from other devices. Clearing your browser data will reset your progress.
              </p>
              <button 
                onClick={() => {
                  setHasShownWarning(true);
                  setShowWarningModal(false);
                }}
                className="w-full py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all font-sans"
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}

        {showClearConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-neutral-900 border border-red-500 p-8 md:p-12 max-w-lg w-full shadow-2xl"
            >
              <h3 className="text-2xl font-serif uppercase tracking-tight mb-4 text-red-500">Reset All Progress?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 italic font-serif leading-relaxed mb-10">
                This will permanently delete all checked tasks. This action cannot be undone. Are you sure you wish to proceed?
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-4 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs font-bold uppercase tracking-[0.2em] hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all font-sans"
                >
                  Cancel
                </button>
                <button 
                  onClick={clearAllProgress}
                  className="flex-1 py-4 bg-red-500 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-600 transition-all font-sans"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showAICategoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAICategoryModal(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white dark:bg-neutral-900 border border-neutral-900 dark:border-neutral-100 p-8 md:p-10 max-w-xl w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h2 className="text-xl font-serif uppercase tracking-[0.1em] text-neutral-900 dark:text-neutral-100">
                    Category Assistant
                  </h2>
                  <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-400">
                    Prompt decoder for AI
                  </p>
                </div>
                <button onClick={() => setShowAICategoryModal(false)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 p-6">
                  <p className="text-[13px] font-mono leading-relaxed text-neutral-600 dark:text-neutral-400 select-all italic">
                    &quot;I am starting a software project called [Project Name]. Based on these categories—SaaS, Mobile, E-commerce, Internal Tool, Marketplace, AI/ML, Fintech, Healthcare—which one fits best? Here is my project description: [Paste description]&quot;
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      const prompt = `I am starting a software project. Based on these categories—SaaS, Mobile, E-commerce, Internal Tool, Marketplace, AI/ML, Fintech, Healthcare—which one fits best? Here is my project description: [Paste your project description here]`;
                      navigator.clipboard.writeText(prompt);
                      toast.success("Prompt copied!");
                    }}
                    className="w-full py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all font-sans flex items-center justify-center gap-3"
                  >
                    <FiCopy className="w-3.5 h-3.5" /> Copy Prompt
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-[1px] bg-neutral-100 dark:bg-neutral-800"></div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 px-2 font-sans">Open Directly In</span>
                    <div className="flex-1 h-[1px] bg-neutral-100 dark:bg-neutral-800"></div>
                  </div>

                  <div className="flex gap-2">
                    {(() => {
                      const basePrompt = `I am starting a software project. Based on these categories—SaaS, Mobile, E-commerce, Internal Tool, Marketplace, AI/ML, Fintech, Healthcare—which one fits best? Here is my project description: [Paste your project description here]`;
                      const encodedPrompt = encodeURIComponent(basePrompt);
                      const platforms = [
                        { name: "ChatGPT", icon: SiOpenai, url: `https://chatgpt.com/?q=${encodedPrompt}` },
                        { name: "Claude", icon: SiAnthropic, url: `https://claude.ai/?q=${encodedPrompt}` },
                        { name: "Perplexity", icon: SiPerplexity, url: `https://www.perplexity.ai/?q=${encodedPrompt}` },
                      ];
                      
                      return platforms.map((plat) => (
                        <a 
                          key={plat.name}
                          href={plat.url}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-100 dark:border-neutral-800 transition-colors text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                          title={plat.name}
                        >
                          <plat.icon className="size-3.5" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{plat.name}</span>
                        </a>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectChecklist;
