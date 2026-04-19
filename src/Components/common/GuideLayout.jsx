import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useSEO from "../Hooks/useSEO";
import {
    LuArrowUpRight,
    LuLightbulb,
    LuWaypoints
} from "react-icons/lu";

const PrincipleItem = ({ title, onClick, isLast }) => (
    <>
        <button
            onClick={onClick}
            className="group flex items-center justify-between py-5 w-full text-left hover:pl-2 transition-[padding-left] duration-300"
        >
            <h3 className="text-[15px] font-bold tracking-tight text-base-content/80 group-hover:text-primary leading-none">{title}</h3>
            <div className="transition-transform duration-300 text-base-content/20 group-hover:text-primary group-hover:translate-x-1">
                <LuArrowUpRight className="size-4" />
            </div>
        </button>
        {!isLast && <hr className="border-t border-base-300/60" />}
    </>
);

PrincipleItem.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired
};

const GuideLayout = ({
    data = [],
    title,
    description,
    seoConfig,
    categoryIcons = {},
    defaultIcon: DefaultIcon = LuWaypoints,
    insightLabel = "Insight",
    footerNoteTitle = "Mastery",
    footerNoteText = "",
    footerNoteIcon: FooterNoteIcon = LuLightbulb
}) => {
    const [selectedPrinciple, setSelectedPrinciple] = useState(null);

    useSEO(seoConfig);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        const lockScroll = () => {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        };
        const unlockScroll = () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };

        if (selectedPrinciple) {
            lockScroll();
        } else {
            unlockScroll();
        }

        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedPrinciple(null);
        };

        if (selectedPrinciple) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            unlockScroll();
            window.removeEventListener("keydown", handleEsc);
        };
    }, [selectedPrinciple]);

    // Icon for the side sheet
    const SelectedCategoryIcon = selectedPrinciple ? (categoryIcons[selectedPrinciple.category] || DefaultIcon) : null;

    return (
        <div 
            className='relative max-w-full min-h-screen overflow-x-hidden bg-base-100'
            data-page-context={JSON.stringify(data)}
        >
            {/* Main Content Wrapper with Dynamic Blur */}
            <div className={`transition-all duration-500 ease-in-out ${selectedPrinciple ? 'blur-sm scale-[0.98] pointer-events-none brightness-75' : 'blur-0 scale-100'}`}>
                <div className="px-4 py-12 md:px-12 lg:px-24">
                    {/* Header Section */}
                    <div className='mb-20 space-y-4 text-center'>
                        <h1 className='text-4xl heading md:text-7xl'>{title}</h1>
                        <p className='max-w-2xl mx-auto text-sm font-medium leading-relaxed text-base-content/60 md:text-lg'>
                            {description}
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
                        {data.map((category, idx) => {
                            const CategoryIcon = categoryIcons[category.Category] || DefaultIcon;
                            return (
                                <div key={idx} className="bg-base-200/50 border border-base-300 rounded-[2.5rem] p-8 md:p-10 space-y-8 flex flex-col h-full shadow-sm hover:shadow-md">
                                    <div className="flex items-start gap-5">
                                        <div className="p-4 rounded-[1.25rem] bg-primary text-primary-content text-3xl shadow-lg shadow-primary/20 shrink-0">
                                            <CategoryIcon />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-black leading-none tracking-tighter uppercase text-base-content">{category.Category}</h2>
                                            <p className="text-[13px] text-base-content/60 font-semibold max-w-sm line-clamp-2">{category.Description}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-grow w-full pb-4 mt-4">
                                        {(category.Principles || category.Skills || []).map((item, pIdx, arr) => (
                                            <PrincipleItem
                                                key={pIdx}
                                                title={item.Title}
                                                isLast={pIdx === arr.length - 1}
                                                onClick={() => setSelectedPrinciple({ ...item, category: category.Category })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Note moves inside the blurred area */}
                {footerNoteText && (
                    <div className="mt-32 p-12 rounded-[3rem] bg-base-200 text-center border border-base-300 mx-4 md:mx-12 lg:mx-24 mb-20 shadow-sm">
                        <div className="inline-flex p-3 mb-6 rounded-2xl bg-primary/10 text-primary">
                            <FooterNoteIcon className="size-6" />
                        </div>
                        <h3 className="mb-4 text-2xl font-black tracking-tight uppercase">{footerNoteTitle || "Concept Summary"}</h3>
                        <p className="max-w-2xl mx-auto text-sm font-medium leading-relaxed md:text-base text-base-content/60">
                            {footerNoteText}
                        </p>
                    </div>
                )}
            </div>

            {/* Side Sheet Implementation */}
            {selectedPrinciple && (
                <div className="fixed inset-0 z-[100] flex justify-end bg-black/40" onClick={() => setSelectedPrinciple(null)}>
                    <div
                        data-lenis-prevent
                        className="flex flex-col w-full h-full max-w-lg gap-12 p-10 overflow-y-auto border-l shadow-2xl bg-base-100 md:p-12 border-base-300 custom-scrollbar animate-in slide-in-from-right"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-primary text-primary-content shadow-md shadow-primary/20">
                                        <SelectedCategoryIcon />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-black leading-none tracking-tighter md:text-5xl text-base-content">{selectedPrinciple.Title}</h2>
                            </div>
                            <button
                                className="transition-transform duration-300 border btn btn-md btn-circle btn-ghost border-base-300 hover:rotate-90"
                                onClick={() => setSelectedPrinciple(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-12">
                            <section className="space-y-4">
                                <p className="text-xl font-bold leading-snug tracking-tight md:text-2xl text-base-content/90">“{selectedPrinciple.Effect}”</p>
                            </section>

                            {selectedPrinciple.Example && (
                                <section className="space-y-4">
                                    <div className="p-8 rounded-[2rem] bg-accent/5 border border-accent/10 relative overflow-hidden group">
                                        <h4 className="text-[10px] uppercase font-black tracking-wider text-accent mb-4">Real-World Scenario</h4>
                                        <p className="text-[14px] font-medium text-base-content/70 leading-relaxed italic">
                                            “{selectedPrinciple.Example}”
                                        </p>
                                    </div>
                                </section>
                            )}

                            <section className="space-y-8">
                                <div className="p-8 rounded-[2rem] bg-base-200/50 border border-base-300">
                                    <h4 className="text-[10px] uppercase font-black tracking-wider text-primary mb-6">Strategic Focus</h4>
                                    <ul className="space-y-4">
                                        {selectedPrinciple.BestPractices.map((practice, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                                <span className="text-[14px] font-bold text-base-content/70 leading-relaxed">{practice}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex flex-wrap gap-2.5">
                                    {selectedPrinciple.Tools.map((tool, i) => (
                                        <div key={i} className="px-6 py-3 border border-base-300 rounded-2xl bg-base-200 text-base-content font-mono text-[12px] font-black shadow-sm">
                                            {tool}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {selectedPrinciple.Source && (
                                <section className="pt-4 space-y-4 border-t border-base-300/60">
                                    <h4 className="text-[10px] uppercase font-black tracking-wider text-base-content/40 mb-2">Scientific Source / Evidence</h4>
                                    <p className="text-[13px] text-base-content/50 font-medium leading-relaxed italic">
                                        {selectedPrinciple.Source}
                                    </p>
                                </section>
                            )}
                        </div>

                        <div className="pt-10 mt-auto">
                            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 transition-transform duration-300 text-primary/10 group-hover:scale-110">
                                    <DefaultIcon className="size-20" />
                                </div>
                                <p className="relative z-10 text-xs italic leading-relaxed text-base-content/60">
                                    {insightLabel}: <span className="font-black tracking-wider uppercase text-primary">{selectedPrinciple.Title}</span> is critical for long-term scalability and system integrity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

GuideLayout.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    seoConfig: PropTypes.object.isRequired,
    categoryIcons: PropTypes.object,
    defaultIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    insightLabel: PropTypes.string,
    footerNoteTitle: PropTypes.string,
    footerNoteText: PropTypes.string,
    footerNoteIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default GuideLayout;
