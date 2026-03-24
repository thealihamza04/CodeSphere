import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[85vh] bg-[#dcd0bc] dark:bg-[#1a1715] flex flex-col items-center justify-center relative perspective-[1200px] font-serif py-16 md:py-0 overflow-x-hidden">
      
      {/* Decorative background planes simulating Analytic Cubism multi-perspective */}
      <div className="absolute inset-0 flex items-center justify-center filter drop-shadow-2xl opacity-80 dark:opacity-40">
        <div className="absolute w-[60%] h-[70%] bg-[#c1af95] dark:bg-[#3d3731] transform rotate-12 -translate-x-[20%] skew-x-6 origin-center opacity-70 border border-[#917d60] mix-blend-multiply" />
        <div className="absolute w-[50%] h-[60%] bg-[#a39077] dark:bg-[#2b2520] transform -rotate-6 translate-x-[15%] -translate-y-[10%] skew-y-6 opacity-60 border-l-[8px] border-[#5a4d3f] mix-blend-color-burn" />
        <div className="absolute w-[45%] h-[50%] bg-[#776654] dark:bg-[#13110e] transform rotate-45 translate-x-[30%] translate-y-[20%] opacity-40 border-t-[12px] border-[#3e3428] mix-blend-darken" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 gap-[4px] w-[90%] max-w-5xl transform-style-3d group hover:gap-4 transition-all duration-1000">
        
        {/* Fragment 1: The First '4' */}
        <div className="bg-[#e8decb] dark:bg-[#2d2824] p-8 md:p-16 flex items-center justify-center transform transition-all duration-700 -rotate-2 hover:translate-x-2 hover:-rotate-1 hover:-translate-y-2 hover:scale-[1.02] hover:z-20 shadow-[-10px_10px_30px_rgba(0,0,0,0.1)] border-r-2 border-b-2 border-[#817260] dark:border-[#423930] origin-bottom-right">
          <h1 className="text-8xl sm:text-[10rem] md:text-[14rem] font-bold text-[#4a3c2e] dark:text-[#c4b69d] leading-none mb-0 tracking-tighter">
            4
          </h1>
        </div>
        
        {/* Fragment 2: The '0' and skewed info */}
        <div className="bg-[#c4b59f] dark:bg-[#221e1a] p-8 md:p-16 flex flex-col items-end justify-center transform transition-all duration-700 rotate-1 -translate-y-2 hover:-translate-y-6 hover:rotate-3 hover:scale-[1.03] hover:z-20 shadow-[10px_10px_30px_rgba(0,0,0,0.15)] border-l-[6px] border-[#504437] dark:border-[#6a5e4d] origin-top-left relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[#3e3428] opacity-5 transform rotate-45 scale-150"></div>
           <h1 className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tight text-[#2d2319] dark:text-[#dfccae] leading-none mix-blend-multiply dark:mix-blend-screen relative z-10">
            0
          </h1>
          <span className="text-xl md:text-2xl font-black text-[#5e4b39] dark:text-[#a08e75] uppercase tracking-[0.3em] transform -rotate-90 origin-bottom-right absolute right-4 bottom-12 opacity-80 mix-blend-multiply dark:mix-blend-plus-lighter">
             Missing
          </span>
        </div>

        {/* Fragment 3: The Second '4' and description text */}
        <div className="bg-[#b3a18a] dark:bg-[#342e27] p-8 md:p-12 flex flex-col justify-end transform transition-all duration-700 -skew-x-[4deg] hover:skew-x-0 group-hover:-translate-x-3 group-hover:translate-y-3 origin-top-left border-t-[8px] border-r-4 border-[#3a2d20] shadow-[15px_-5px_25px_rgba(0,0,0,0.2)]">
          <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold text-[#e1d5c0] dark:text-[#181512] leading-none absolute top-4 left-4 opacity-50 mix-blend-overlay">
            4
          </h1>
          <p className="mt-20 md:mt-24 text-lg md:text-xl text-[#292015] dark:text-[#c7baa4] font-medium leading-relaxed max-w-sm ml-auto text-right border-r-2 border-[#76634d] pr-4 shadow-sm">
            Reality fractured. The perspective you seek has been fragmented into disparate planes.
          </p>
        </div>

        {/* Fragment 4: Action / Button */}
        <div className="bg-[#867562] dark:bg-[#433b31] p-8 md:p-16 flex items-center justify-center md:justify-start transform transition-all duration-700 rotate-[3deg] translate-y-2 hover:translate-y-0 hover:-rotate-1 group-hover:translate-x-2 border-l border-t border-[#f0ebd9] dark:border-[#53493e] shadow-inner">
          <Link
            to="/"
            className="group/btn relative inline-flex items-center justify-center px-8 py-6 bg-[#261f17] dark:bg-[#e1d5c0] text-[#e8decb] dark:text-[#261f17] transform transition-all duration-500 hover:rotate-[-4deg] shadow-[10px_10px_0px_#47392a] dark:shadow-[10px_10px_0px_#14110d] active:translate-x-2 active:translate-y-2 active:shadow-none font-bold tracking-[0.25em] text-sm md:text-base"
          >
            RESTORE PERSPECTIVE
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#c4b59f] dark:bg-[#685949] transform rotate-45" />
            <span className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#685949] dark:bg-[#867562] transform rotate-12" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
