import DesignPrinciplesData from "../Data/DesignPrinciples.json";
import { useEffect } from "react";
import useSEO from "./Hooks/useSEO";

const DesignPrincipleCard = ({ title, summary, practices, tools }) => (
    <div className='border !rounded-3xl card bg-base-200 border-base-300 text-base-content'>
        <div className='p-[24px] card-body'>
            <h2 className='text-[18px] font-extrabold card-title'>{title}</h2>
            <p className='text-[14px] text-base-content/80 text-pretty'>{summary}</p>
            
            <div className='mt-4'>
                <h3 className='text-xs font-bold uppercase tracking-widest text-base-content/50 mb-2'>Best Practices</h3>
                <ul className='list-disc list-inside text-[13px] space-y-1 text-base-content/70'>
                    {practices.map((practice, i) => (
                        <li key={i}>{practice}</li>
                    ))}
                </ul>
            </div>

            <div className='justify-end pt-4 card-actions'>
                <div className='flex flex-wrap items-center justify-end w-full gap-2'>
                    {tools.map((tool, i) => (
                        <a
                            key={i}
                            href={tool.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-[11px] px-[10px] py-1 rounded-full text-base-content font-medium border border-base-300 hover:bg-base-300/30'
                        >
                            {tool.Name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const DesignPrinciples = () => {
    useSEO({
        title: "UI/UX Design Principles | CodeSphere",
        description: "Essential UI/UX design principles every developer should know to build beautiful and functional interfaces.",
        keywords: "UI/UX, design principles, visual hierarchy, contrast, typography, accessibility, CodeSphere",
        canonical: "https://codes-sphere.vercel.app/design-principles",
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const def = "UI/UX design principles are the foundational guidelines that designers and developers follow to create products that are easy, enjoyable, and efficient for users to interact with. Mastering these ensures your applications aren't just functional, but also provide a premium user experience.";

    return (
        <div className='relative min-h-screen bg-base-100'>
            {/* Header Section */}
            <div className='relative z-10 mx-2 space-y-6 py-9 md:mx-8 lg:mx-16'>
                <h1 className='heading'>Design Principles</h1>
                <p className='px-4 text-sm leading-relaxed tracking-wider text-center md:px-20 text-base-content/70'>
                    {def}
                </p>
            </div>

            {/* Principles Cards */}
            <div className='flex flex-wrap items-stretch justify-center gap-6 px-4 pb-10 md:px-10 lg:px-8'>
                {DesignPrinciplesData.map((principle, index) => (
                    <div key={index} className="w-full md:w-80 flex">
                        <DesignPrincipleCard
                            title={principle.Principle}
                            summary={principle.Summary}
                            practices={principle.BestPractices}
                            tools={principle.CommonTools}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignPrinciples;
