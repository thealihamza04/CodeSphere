import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import {
  LuBrain,
  LuSparkles,
  LuLightbulb,
  LuInfo,
  LuWorkflow,
  LuCircleCheck,
  LuX,
} from "react-icons/lu";
import data from "../Data/RAGData.json";
import useSEO from "./Hooks/useSEO";

const PAGE_URL = "https://codes-sphere.vercel.app/rag";
const { Definition, Stages } = data;

// Downward Sketchy Arrow for Mobile
const SketchyDownArrow = () => (
  <div className="flex justify-center my-2 select-none">
    <svg viewBox="0 0 24 40" className="w-6 h-10 text-neutral-900 dark:text-neutral-400">
      <path
        d="M 12 2 C 11 14, 13 24, 12 35 M 4 25 C 8 30, 11 33, 12 36 C 13 33, 16 30, 20 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// ==========================================
// MODAL / SHEET DETAIL COMPONENT
// Gestures-compliant (Emil Kowalski guidelines):
// - Mobile: Bottom Sheet with 1:1 drag tracking, rubber-banding, velocity-aware dismissal, touch-action: none.
// - Desktop: Centered Dialog with spring transition, backdrop blur, Escape and click-outside dismissal.
// ==========================================
const RAGDetailSheetOrDialog = ({ stage, onClose }) => {
  useEffect(() => {
    if (!stage) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [stage, onClose]);

  return (
    <AnimatePresence>
      {stage && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

      {/* 1. Mobile Bottom Sheet (block md:hidden) */}
      <motion.div
        key="mobile-sheet"
        className="block md:hidden relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t-4 border-x-4 border-neutral-900 dark:border-neutral-700 bg-base-100 p-5 shadow-[0px_-8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_-8px_0px_0px_rgba(255,255,255,0.15)]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 100 || info.velocity.y > 400) {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label={stage.title}
      >
        {/* Drag Handle with touch-action: none and >= 44px hit target */}
        <div
          className="flex items-center justify-center -mt-2 mb-3 py-3 w-full cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: "none" }}
        >
          <div className="w-12 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-base-300">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-content font-black text-sm">
              {stage.number}
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                {stage.phase}
              </span>
              <h3 className="text-lg font-black text-base-content tracking-tight">
                {stage.title}
              </h3>
            </div>
          </div>
          {/* Close Button with >= 44x44px hitbox */}
          <button
            onClick={onClose}
            className="size-11 flex items-center justify-center rounded-xl bg-base-200 hover:bg-base-300 text-base-content transition-colors cursor-pointer"
            aria-label="Close sheet"
          >
            <LuX className="size-5" />
          </button>
        </div>

        {/* Body Content */}
        <p className="mt-4 text-sm font-semibold text-base-content/90 leading-relaxed">
          {stage.summary}
        </p>

        <div className="space-y-3 mt-4">
          <div className="p-3.5 rounded-xl bg-base-200/60 border border-base-300">
            <h4 className="text-xs font-bold uppercase text-base-content/70 mb-1 flex items-center gap-1.5">
              ⚙️ Under the Hood
            </h4>
            <p className="text-xs text-base-content/85 leading-relaxed">
              {stage.details.whatHappens}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-base-200/60 border border-base-300">
            <h4 className="text-xs font-bold uppercase text-base-content/70 mb-1 flex items-center gap-1.5">
              <LuLightbulb className="size-3.5 text-warning" /> Pro Tip
            </h4>
            <p className="text-xs text-base-content/85 leading-relaxed">
              {stage.details.proTip}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-base-300">
          <span className="text-xs font-bold text-base-content/80 block mb-2">Key Tools:</span>
          <div className="flex flex-wrap gap-1.5">
            {stage.details.keyTools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-md font-mono text-[11px] font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Desktop Dialog Modal (hidden md:block) */}
      <motion.div
        key="desktop-dialog"
        className="hidden md:block relative z-10 w-full max-w-xl mx-4 rounded-3xl border-4 border-neutral-900 dark:border-neutral-700 bg-base-100 p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)]"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        role="dialog"
        aria-modal="true"
        aria-label={stage.title}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-base-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-9 rounded-xl bg-primary text-primary-content font-black text-sm">
              {stage.number}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {stage.phase}
              </span>
              <h3 className="text-xl font-black text-base-content tracking-tight">
                {stage.title}
              </h3>
            </div>
          </div>
          {/* Close button with >= 44x44px hitbox */}
          <button
            onClick={onClose}
            className="size-11 flex items-center justify-center rounded-xl bg-base-200 hover:bg-base-300 text-base-content transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <LuX className="size-5" />
          </button>
        </div>

        {/* Body Content */}
        <p className="mt-4 text-base font-semibold text-base-content/90 leading-relaxed">
          {stage.summary}
        </p>

        <div className="grid grid-cols-2 gap-3.5 mt-5">
          <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300">
            <h4 className="text-xs font-bold uppercase text-base-content/70 mb-1.5 flex items-center gap-1.5">
              ⚙️ Under the Hood
            </h4>
            <p className="text-xs text-base-content/85 leading-relaxed">
              {stage.details.whatHappens}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300">
            <h4 className="text-xs font-bold uppercase text-base-content/70 mb-1.5 flex items-center gap-1.5">
              <LuLightbulb className="size-4 text-warning" /> Pro Tip
            </h4>
            <p className="text-xs text-base-content/85 leading-relaxed">
              {stage.details.proTip}
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3.5 flex flex-wrap items-center gap-1.5 border-t border-base-300">
          <span className="text-xs font-bold text-base-content/80 mr-1">Key Tools:</span>
          {stage.details.keyTools.map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-1 rounded-md font-mono text-[11px] font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};

RAGDetailSheetOrDialog.propTypes = {
  stage: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

// ==========================================
// 1. MOBILE VERTICAL SKETCHY PIPELINE
// ==========================================
const MobileVerticalSketchyPipeline = ({ activeStageId, onOpenStage }) => {
  return (
    <div className="block md:hidden space-y-2">
      {/* Phase 1 Header */}
      <div className="p-3 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border-2 border-dashed border-slate-400 dark:border-slate-600 mb-3 text-center">
        <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
          ✏️ Phase 1: Offline Ingestion Pipeline
        </span>
      </div>

      {/* Step 1: Documents */}
      <div
        onClick={() => onOpenStage("documents")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "documents"
            ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 shadow-[5px_5px_0px_0px_rgba(37,99,235,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-primary font-black text-xs font-mono">01. Documents</span>
          <span className="text-[11px] font-mono font-bold text-red-500">PDF • MD • SQL</span>
        </div>
        <div className="flex items-center justify-center gap-3 py-2 bg-base-200/50 rounded-xl border border-base-300">
          <div className="w-16 h-20 bg-white dark:bg-slate-800 rounded border-2 border-red-500/60 p-1.5 shadow flex flex-col justify-between -rotate-3">
            <span className="text-[8px] font-black text-red-600 bg-red-100 rounded px-1 w-fit">PDF</span>
            <div className="space-y-1">
              <div className="h-1 bg-slate-300 rounded w-full" />
              <div className="h-1 bg-slate-300 rounded w-4/5" />
            </div>
            <span className="text-[7px] text-slate-400 font-mono">doc.pdf</span>
          </div>
          <div className="w-18 h-22 bg-white dark:bg-slate-800 rounded border-2 border-blue-600 p-2 shadow-md flex flex-col justify-between scale-105">
            <span className="text-[8px] font-black text-blue-600 bg-blue-100 rounded px-1 w-fit">MD</span>
            <div className="space-y-1">
              <div className="h-1 bg-blue-300 rounded w-full" />
              <div className="h-1 bg-slate-300 rounded w-5/6" />
              <div className="h-1 bg-slate-300 rounded w-3/4" />
            </div>
            <span className="text-[7px] text-blue-600 font-mono font-bold">wiki.md</span>
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Extract raw enterprise data & remove boilerplate markup
        </p>
      </div>

      <SketchyDownArrow />

      {/* Step 2: Chunking */}
      <div
        onClick={() => onOpenStage("chunking")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "chunking"
            ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 shadow-[5px_5px_0px_0px_rgba(245,158,11,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-warning font-black text-xs font-mono">02. Chunking</span>
          <span className="text-[11px] font-mono font-bold text-amber-600">Overlap: 15%</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 flex items-center justify-center gap-3">
          <div className="w-28 p-2 bg-white dark:bg-slate-800 rounded border-2 border-amber-500 shadow text-[9px] font-mono">
            <div className="text-amber-600 font-bold mb-1">Chunk #01</div>
            <div className="h-1 bg-slate-300 rounded w-full mb-1" />
            <div className="h-1 bg-amber-400 rounded w-full" />
          </div>
          <span className="text-amber-500 font-black text-sm">✂️</span>
          <div className="w-28 p-2 bg-white dark:bg-slate-800 rounded border-2 border-amber-500 shadow text-[9px] font-mono">
            <div className="text-amber-600 font-bold mb-1">Chunk #02</div>
            <div className="h-1 bg-amber-400 rounded w-full mb-1" />
            <div className="h-1 bg-slate-300 rounded w-full" />
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Partition documents into token windows with boundary overlap
        </p>
      </div>

      <SketchyDownArrow />

      {/* Step 3: Embeddings */}
      <div
        onClick={() => onOpenStage("embedding")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "embedding"
            ? "border-purple-600 bg-purple-50/60 dark:bg-purple-950/30 shadow-[5px_5px_0px_0px_rgba(147,51,234,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-secondary font-black text-xs font-mono">03. Embeddings</span>
          <span className="text-[11px] font-mono font-bold text-purple-600">1536 Dimensions</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 flex items-center justify-around">
          <span className="text-xs font-mono font-bold text-base-content/70">&quot;Text Passage&quot;</span>
          <span className="text-purple-600 font-bold text-sm">&rarr; [Encoder] &rarr;</span>
          <div className="p-2 bg-white dark:bg-slate-800 rounded border-2 border-purple-500 font-mono text-[9px] text-purple-600 font-bold shadow">
            [+0.84, -0.32, +0.15]
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Convert text into dense geometric vectors capturing semantic meaning
        </p>
      </div>

      <SketchyDownArrow />

      {/* Step 4: Vector Database */}
      <div
        onClick={() => onOpenStage("vectordb")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "vectordb"
            ? "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-[5px_5px_0px_0px_rgba(5,150,105,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-success font-black text-xs font-mono">04. Vector Store</span>
          <span className="text-[11px] font-mono font-bold text-emerald-600">HNSW K-NN Index</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 flex items-center justify-around">
          <div className="w-20 h-20 rounded-xl bg-emerald-500/10 border-2 border-emerald-600 p-2 flex flex-col justify-between items-center shadow">
            <div className="w-14 h-4 rounded-full bg-emerald-500 border border-emerald-600" />
            <div className="flex gap-1">
              <span className="size-2 rounded-full bg-blue-500" />
              <span className="size-2 rounded-full bg-pink-500" />
              <span className="size-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[8px] font-black text-emerald-700 dark:text-emerald-300 uppercase">Qdrant/Pinecone</span>
          </div>
          <div className="text-left font-mono text-[10px] space-y-1 text-base-content/80">
            <div>• Cosine Metric Search</div>
            <div>• Sub-millisecond ANN</div>
            <div className="text-emerald-600 font-bold">• Top-K Retrieval Ready</div>
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Persist indexed vectors for real-time high-speed similarity search
        </p>
      </div>

      {/* Phase 2 Header */}
      <div className="p-3 rounded-xl bg-blue-100/60 dark:bg-blue-950/60 border-2 border-dashed border-blue-400 dark:border-blue-600 my-4 text-center">
        <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
          ⚡ Phase 2: Real-Time Runtime Query Flow
        </span>
      </div>

      {/* Step 5: User Query */}
      <div
        onClick={() => onOpenStage("query")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "query"
            ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 shadow-[5px_5px_0px_0px_rgba(37,99,235,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-primary font-black text-xs font-mono">05. User Query</span>
          <span className="text-[11px] font-mono font-bold text-blue-600">HyDE Rewrite</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 flex items-center gap-3">
          <img
            src="/comics/peep-standing-9.svg"
            alt="User questioning"
            className="h-20 w-auto object-contain shrink-0"
          />
          <div className="p-2.5 bg-white text-neutral-900 rounded-xl border-2 border-neutral-900 text-xs font-bold shadow-sm">
            &ldquo;What is our company refund policy?&rdquo;
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          User asks prompt; query is expanded to match stored document vocabulary
        </p>
      </div>

      <SketchyDownArrow />

      {/* Step 6: Hybrid Retrieval & Reranker */}
      <div
        onClick={() => onOpenStage("retrieval")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "retrieval"
            ? "border-orange-500 bg-orange-50/60 dark:bg-orange-950/30 shadow-[5px_5px_0px_0px_rgba(249,115,22,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-accent font-black text-xs font-mono">06. Hybrid Search</span>
          <span className="text-[11px] font-mono font-bold text-orange-600">Cross-Encoder</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold font-mono">
            <span className="text-blue-600">Dense Vector (Semantic)</span>
            <span className="text-amber-600">+ BM25 (Keywords)</span>
          </div>
          <div className="p-2 bg-emerald-500 text-white rounded-lg text-center font-bold text-xs uppercase tracking-wider shadow">
            &darr; Cross-Encoder Reranker Filter &darr;
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Searches Vector DB and scores top candidates to remove false positives
        </p>
      </div>

      <SketchyDownArrow />

      {/* Step 7: Prompt Augmentation */}
      <div
        onClick={() => onOpenStage("augmentation")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "augmentation"
            ? "border-purple-600 bg-purple-50/60 dark:bg-purple-950/30 shadow-[5px_5px_0px_0px_rgba(147,51,234,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-secondary font-black text-xs font-mono">07. Augmented Prompt</span>
          <span className="text-[11px] font-mono font-bold text-purple-600">Context Injection</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 font-mono text-[10px] space-y-1">
          <div className="text-purple-600 font-bold">&lt;system&gt; Answer strictly from context &lt;/system&gt;</div>
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold">
            &lt;context id=1&gt; 30-day refund window policy... &lt;/context&gt;
          </div>
          <div className="text-blue-600 font-bold">&lt;query&gt; What is our refund policy? &lt;/query&gt;</div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Packages verified factual excerpts into prompt template for the LLM
        </p>
      </div>

      <SketchyDownArrow />

      {/* Step 8: LLM Generation */}
      <div
        onClick={() => onOpenStage("generation")}
        className={`p-4 rounded-2xl border-4 transition-all cursor-pointer ${
          activeStageId === "generation"
            ? "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-[5px_5px_0px_0px_rgba(5,150,105,1)]"
            : "border-neutral-900 dark:border-neutral-700 bg-base-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-success font-black text-xs font-mono">08. Grounded LLM</span>
          <span className="text-[11px] font-mono font-bold text-emerald-600">0% Hallucination</span>
        </div>
        <div className="p-3 bg-base-200/50 rounded-xl border border-base-300 flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl shrink-0 shadow">
            🧠
          </div>
          <div className="p-2.5 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 rounded-xl border-2 border-emerald-500 text-xs font-bold leading-tight">
            &ldquo;Refunds are issued within 30 days <span className="bg-emerald-600 text-white px-1 rounded text-[9px]">[1]</span>.&rdquo;
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-base-content/80 text-center">
          Synthesizes answer grounded in provided context with verifiable citations
        </p>
      </div>
    </div>
  );
};

MobileVerticalSketchyPipeline.propTypes = {
  activeStageId: PropTypes.string.isRequired,
  onOpenStage: PropTypes.func.isRequired,
};

// ==========================================
// 2. DESKTOP HORIZONTAL SKETCHY CANVAS
// ==========================================
const DesktopSketchyRAGDiagram = ({ activeStageId, onHoverStage, onOpenStage }) => {
  const isSel = (id) => activeStageId === id;

  return (
    <div className="hidden md:block w-full overflow-x-auto rounded-3xl bg-[#faf8f5] dark:bg-[#1a1b26] p-6 border-4 border-neutral-900 dark:border-neutral-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] select-none">
      <svg
        viewBox="0 0 1000 720"
        className="w-full h-auto min-w-[850px]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "'Patrick Hand', 'Comic Sans MS', 'Chalkboard', cursive, sans-serif" }}
      >
        <defs>
          <pattern id="sketchHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.35" />
          </pattern>
          <pattern id="sketchHatchGreen" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.35" />
          </pattern>
          <pattern id="sketchHatchPurple" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.35" />
          </pattern>
          <marker id="sketchArrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 1 2 C 4 5, 7 5.5, 10 6 C 7 6.5, 4 7, 1 10 C 3 6, 3 6, 1 2" fill="#1e293b" className="dark:fill-slate-300" strokeWidth="1" />
          </marker>
          <marker id="sketchArrowGreen" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 1 2 C 4 5, 7 5.5, 10 6 C 7 6.5, 4 7, 1 10 C 3 6, 3 6, 1 2" fill="#10b981" strokeWidth="1" />
          </marker>
        </defs>

        {/* PHASE 1: INGESTION PIPELINE */}
        <g transform="translate(30, 20)">
          <path
            d="M 5,8 C 250,5 600,10 935,6 C 942,75 938,155 940,225 C 650,228 300,225 5,225 C 2,155 7,75 5,8 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="dark:stroke-slate-600"
          />
          <text x="25" y="28" className="text-[14px] font-bold fill-slate-500 dark:fill-slate-400 tracking-wider">
            ✏️ PHASE 1: OFFLINE INGESTION PIPELINE (Preparation)
          </text>

          {/* Node 1: Documents */}
          <g
            transform="translate(30, 42)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("documents")}
            onClick={() => onOpenStage("documents")}
          >
            <g className={`transition-transform duration-200 ${isSel("documents") ? "scale-105" : "group-hover:scale-102"}`}>
              <path d="M 16 12 L 110 8 L 126 128 L 32 132 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
              <path
                d="M 6 4 C 40 2, 75 5, 102 3 L 116 28 L 114 122 C 80 125, 45 122, 6 124 Z"
                fill={isSel("documents") ? "#eff6ff" : "#ffffff"}
                stroke={isSel("documents") ? "#2563eb" : "#1e293b"}
                strokeWidth={isSel("documents") ? "3.5" : "2.5"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <path d="M 102 3 L 102 28 L 116 28 Z" fill="#cbd5e1" stroke="#1e293b" strokeWidth="2" className="dark:fill-slate-700" />
              <path d="M 20 30 Q 55 28 85 30 M 20 45 Q 60 44 95 45 M 20 60 Q 50 62 80 60 M 20 75 Q 65 73 90 75" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <rect x="20" y="90" width="70" height="20" rx="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
              <text x="55" y="104" textAnchor="middle" className="text-[12px] font-bold fill-red-600">PDF / MD</text>
              <text x="60" y="145" textAnchor="middle" className={`text-[14px] font-bold ${isSel("documents") ? "fill-blue-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                1. Documents
              </text>
            </g>
          </g>

          <path d="M 175 102 C 195 98, 205 106, 230 102" stroke="#334155" strokeWidth="2.5" fill="none" markerEnd="url(#sketchArrow)" className="dark:stroke-slate-400" />

          {/* Node 2: Chunking */}
          <g
            transform="translate(245, 42)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("chunking")}
            onClick={() => onOpenStage("chunking")}
          >
            <g className={`transition-transform duration-200 ${isSel("chunking") ? "scale-105" : "group-hover:scale-102"}`}>
              <path
                d="M 12 10 C 45 8, 90 12, 128 8 L 126 55 C 90 52, 40 56, 10 54 Z"
                fill={isSel("chunking") ? "#eff6ff" : "#ffffff"}
                stroke={isSel("chunking") ? "#2563eb" : "#1e293b"}
                strokeWidth={isSel("chunking") ? "3" : "2"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <path d="M 22 25 H 105 M 22 38 H 85" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="65" x2="140" y2="65" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 4" />
              <g transform="translate(132, 54)">
                <circle cx="5" cy="5" r="4.5" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="5" cy="18" r="4.5" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <line x1="8" y1="8" x2="20" y2="15" stroke="#f59e0b" strokeWidth="2" />
                <line x1="8" y1="15" x2="20" y2="8" stroke="#f59e0b" strokeWidth="2" />
              </g>
              <path
                d="M 10 75 C 50 78, 85 73, 128 76 L 126 122 C 85 125, 45 120, 12 124 Z"
                fill={isSel("chunking") ? "#fef3c7" : "#ffffff"}
                stroke={isSel("chunking") ? "#f59e0b" : "#1e293b"}
                strokeWidth={isSel("chunking") ? "3" : "2"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <path d="M 22 92 H 110 M 22 105 H 90" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <text x="70" y="145" textAnchor="middle" className={`text-[14px] font-bold ${isSel("chunking") ? "fill-blue-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                2. Chunking
              </text>
            </g>
          </g>

          <path d="M 400 102 C 420 98, 435 106, 460 102" stroke="#334155" strokeWidth="2.5" fill="none" markerEnd="url(#sketchArrow)" className="dark:stroke-slate-400" />

          {/* Node 3: Embeddings */}
          <g
            transform="translate(475, 38)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("embedding")}
            onClick={() => onOpenStage("embedding")}
          >
            <g className={`transition-transform duration-200 ${isSel("embedding") ? "scale-105" : "group-hover:scale-102"}`}>
              <path
                d="M 15 15 C 60 10, 110 18, 150 12 C 155 50, 152 90, 150 128 C 110 132, 60 126, 12 130 C 10 90, 14 50, 15 15 Z"
                fill={isSel("embedding") ? "#f3e8ff" : "#ffffff"}
                stroke={isSel("embedding") ? "#9333ea" : "#1e293b"}
                strokeWidth={isSel("embedding") ? "3" : "2.5"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <path d="M 26 30 H 20 V 110 H 26" stroke="#9333ea" strokeWidth="2.5" fill="none" />
              <path d="M 136 30 H 142 V 110 H 136" stroke="#9333ea" strokeWidth="2.5" fill="none" />
              <text x="40" y="52" className="text-[13px] font-mono font-bold fill-blue-600">+0.84</text>
              <text x="90" y="52" className="text-[13px] font-mono font-bold fill-red-500">-0.32</text>
              <text x="40" y="80" className="text-[13px] font-mono font-bold fill-emerald-600">+0.15</text>
              <text x="90" y="80" className="text-[13px] font-mono font-bold fill-blue-600">+0.69</text>
              <text x="65" y="105" className="text-[11px] font-mono font-bold fill-purple-600">1536-D</text>
              <text x="80" y="148" textAnchor="middle" className={`text-[14px] font-bold ${isSel("embedding") ? "fill-purple-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                3. Embeddings
              </text>
            </g>
          </g>

          <path d="M 645 102 C 670 98, 685 106, 715 102" stroke="#334155" strokeWidth="2.5" fill="none" markerEnd="url(#sketchArrow)" className="dark:stroke-slate-400" />

          {/* Node 4: Vector Store Cylinder */}
          <g
            transform="translate(730, 28)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("vectordb")}
            onClick={() => onOpenStage("vectordb")}
          >
            <g className={`transition-transform duration-200 ${isSel("vectordb") ? "scale-105" : "group-hover:scale-102"}`}>
              <path
                d="M 15 35 C 15 85, 18 115, 18 135 C 35 150, 125 150, 142 135 C 142 115, 145 85, 145 35 Z"
                fill={isSel("vectordb") ? "url(#sketchHatchGreen)" : "#ecfdf5"}
                stroke={isSel("vectordb") ? "#059669" : "#1e293b"}
                strokeWidth={isSel("vectordb") ? "3.5" : "2.5"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <path d="M 16 72 C 35 86, 125 86, 144 72" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 17 106 C 35 120, 125 120, 143 106" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
              <ellipse
                cx="80"
                cy="35"
                rx="65"
                ry="22"
                fill={isSel("vectordb") ? "#10b981" : "#34d399"}
                stroke={isSel("vectordb") ? "#047857" : "#1e293b"}
                strokeWidth="2.5"
              />
              <text x="80" y="40" textAnchor="middle" className="text-[13px] font-extrabold fill-white uppercase tracking-wider">
                Vector DB
              </text>
              <circle cx="50" cy="85" r="4.5" fill="#3b82f6" />
              <circle cx="68" cy="92" r="3.5" fill="#3b82f6" />
              <circle cx="105" cy="82" r="4" fill="#ec4899" />
              <circle cx="120" cy="95" r="3" fill="#ec4899" />
              <circle cx="85" cy="122" r="5" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
              <text x="80" y="160" textAnchor="middle" className={`text-[14px] font-bold ${isSel("vectordb") ? "fill-emerald-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                4. Vector Store
              </text>
            </g>
          </g>
        </g>

        {/* ========================================================
            OPEN CORRIDOR: INTER-PHASE VECTOR DB LOOKUP (Clean routing, NO overlapping)
        ======================================================== */}
        <g>
          {/* Smooth conduit connecting Hybrid Search to Vector DB */}
          <path
            d="M 390 420 C 390 325, 450 305, 520 305 L 680 305 C 780 305, 910 295, 910 200 C 910 140, 895 120, 880 120"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray="6 4"
            fill="none"
            markerEnd="url(#sketchArrowGreen)"
          />
          {/* Centered Pill Badge in the open corridor */}
          <g transform="translate(485, 291)">
            <rect
              x="0"
              y="0"
              width="230"
              height="28"
              rx="14"
              fill="#ffffff"
              stroke="#10b981"
              strokeWidth="2"
              className="dark:fill-slate-800"
            />
            <text
              x="115"
              y="19"
              textAnchor="middle"
              className="text-[12px] font-bold fill-emerald-600 dark:fill-emerald-400"
            >
              🔍 Cosine Similarity Top-K Match
            </text>
          </g>
        </g>

        {/* PHASE 2: RUNTIME INFERENCE FLOW */}
        <g transform="translate(30, 360)">
          <path
            d="M 8,8 C 280,4 620,12 935,7 C 940,85 935,220 938,320 C 620,324 310,318 8,322 C 5,220 10,85 8,8 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="8 5"
            className="dark:stroke-blue-400"
          />
          <text x="25" y="30" className="text-[14px] font-bold fill-blue-600 dark:fill-blue-400 tracking-wider">
            ⚡ PHASE 2: REAL-TIME RUNTIME FLOW
          </text>

          {/* Node 5: User Query */}
          <g
            transform="translate(25, 55)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("query")}
            onClick={() => onOpenStage("query")}
          >
            <g className={`transition-transform duration-200 ${isSel("query") ? "scale-105" : "group-hover:scale-102"}`}>
              <image
                href="/comics/peep-standing-9.svg"
                x="-10"
                y="55"
                width="100"
                height="150"
              />
              <g transform="translate(75, 5)">
                <path
                  d="M 10 5 C 60 2, 110 6, 150 4 C 158 25, 156 50, 155 70 C 110 74, 55 70, 10 72 L -5 85 L 5 65 C 2 45, 4 20, 10 5 Z"
                  fill={isSel("query") ? "#dbeafe" : "#ffffff"}
                  stroke={isSel("query") ? "#2563eb" : "#1e293b"}
                  strokeWidth="2.5"
                  className="dark:fill-slate-800 dark:stroke-slate-200"
                />
                <text x="80" y="32" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 dark:fill-slate-200">
                  &ldquo;What is our
                </text>
                <text x="80" y="50" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 dark:fill-slate-200">
                  refund policy?&rdquo;
                </text>
              </g>
              <text x="85" y="235" textAnchor="middle" className={`text-[14px] font-bold ${isSel("query") ? "fill-blue-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                5. User Query
              </text>
            </g>
          </g>

          <path d="M 235 130 C 255 125, 270 135, 295 130" stroke="#334155" strokeWidth="2.5" fill="none" markerEnd="url(#sketchArrow)" className="dark:stroke-slate-400" />

          {/* Node 6: Semantic Retrieval & Cross-Encoder Funnel */}
          <g
            transform="translate(305, 55)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("retrieval")}
            onClick={() => onOpenStage("retrieval")}
          >
            <g className={`transition-transform duration-200 ${isSel("retrieval") ? "scale-105" : "group-hover:scale-102"}`}>
              <path
                d="M 15 15 C 65 10, 105 12, 155 15 L 115 85 L 115 145 C 90 150, 75 148, 55 145 L 55 85 Z"
                fill={isSel("retrieval") ? "url(#sketchHatch)" : "#ffffff"}
                stroke={isSel("retrieval") ? "#2563eb" : "#1e293b"}
                strokeWidth={isSel("retrieval") ? "3" : "2.5"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <text x="85" y="42" textAnchor="middle" className="text-[11px] font-bold fill-blue-600">Dense Vector</text>
              <text x="85" y="58" textAnchor="middle" className="text-[10.5px] font-bold fill-amber-600">+ BM25 Keyword</text>
              <rect x="23" y="96" width="124" height="28" rx="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
              <text
                x="85"
                y="110"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10.5px] font-bold fill-white uppercase tracking-wider"
              >
                Cross-Encoder
              </text>
              <text x="85" y="175" textAnchor="middle" className={`text-[14px] font-bold ${isSel("retrieval") ? "fill-blue-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                6. Hybrid Rerank
              </text>
            </g>
          </g>

          <path d="M 480 130 C 505 125, 520 135, 545 130" stroke="#334155" strokeWidth="2.5" fill="none" markerEnd="url(#sketchArrow)" className="dark:stroke-slate-400" />

          {/* Node 7: Prompt Augmentation Clipboard */}
          <g
            transform="translate(555, 45)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("augmentation")}
            onClick={() => onOpenStage("augmentation")}
          >
            <g className={`transition-transform duration-200 ${isSel("augmentation") ? "scale-105" : "group-hover:scale-102"}`}>
              <path
                d="M 10 15 C 50 10, 110 12, 145 15 L 142 165 C 100 168, 50 162, 8 165 Z"
                fill={isSel("augmentation") ? "#ede9fe" : "#ffffff"}
                stroke={isSel("augmentation") ? "#7c3aed" : "#1e293b"}
                strokeWidth={isSel("augmentation") ? "3" : "2.5"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <rect x="50" y="5" width="55" height="18" rx="4" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
              <text x="25" y="45" className="text-[11px] font-mono font-bold fill-purple-600">&lt;system&gt;</text>
              <path d="M 25 55 H 125 M 25 68 H 105" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <text x="25" y="90" className="text-[11px] font-mono font-bold fill-emerald-600">&lt;context id=1&gt;</text>
              <rect x="22" y="96" width="108" height="35" rx="4" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" />
              <path d="M 28 110 H 118 M 28 122 H 95" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
              <text x="25" y="148" className="text-[11px] font-mono font-bold fill-blue-600">&lt;user query&gt;</text>
              <text x="75" y="188" textAnchor="middle" className={`text-[14px] font-bold ${isSel("augmentation") ? "fill-purple-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                7. Augmented Prompt
              </text>
            </g>
          </g>

          <path d="M 710 130 C 725 125, 740 135, 760 130" stroke="#334155" strokeWidth="2.5" fill="none" markerEnd="url(#sketchArrow)" className="dark:stroke-slate-400" />

          {/* Node 8: LLM Brain Core */}
          <g
            transform="translate(770, 45)"
            className="cursor-pointer group"
            onMouseEnter={() => onHoverStage("generation")}
            onClick={() => onOpenStage("generation")}
          >
            <g className={`transition-transform duration-200 ${isSel("generation") ? "scale-105" : "group-hover:scale-102"}`}>
              <circle
                cx="75"
                cy="55"
                r="45"
                fill={isSel("generation") ? "url(#sketchHatchPurple)" : "#f5f3ff"}
                stroke={isSel("generation") ? "#7c3aed" : "#1e293b"}
                strokeWidth={isSel("generation") ? "3.5" : "2.5"}
                className="dark:fill-slate-800 dark:stroke-slate-200"
              />
              <path d="M 75 2 C 75 -6 75 -6 75 -10 M 115 15 L 125 5 M 128 55 L 138 55 M 22 15 L 12 5 M 20 55 L 10 55" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
              <text x="75" y="65" textAnchor="middle" className="text-[32px]">🧠</text>
              <g transform="translate(15, 115)">
                <path
                  d="M 5 5 C 40 2, 85 4, 120 5 C 124 25, 122 45, 120 55 C 80 58, 40 54, 5 56 Z"
                  fill="#dcfce7"
                  stroke="#16a34a"
                  strokeWidth="2"
                />
                <text x="62" y="24" textAnchor="middle" className="text-[11px] font-bold fill-emerald-800">
                  Full refund in 30 days
                </text>
                <rect x="42" y="32" width="40" height="16" rx="4" fill="#16a34a" />
                <text x="62" y="44" textAnchor="middle" className="text-[10px] font-black fill-white">
                  [Ref 1]
                </text>
              </g>
              <text x="75" y="195" textAnchor="middle" className={`text-[14px] font-bold ${isSel("generation") ? "fill-purple-600 font-extrabold" : "fill-slate-800 dark:fill-slate-200"}`}>
                8. Grounded LLM
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

DesktopSketchyRAGDiagram.propTypes = {
  activeStageId: PropTypes.string.isRequired,
  onHoverStage: PropTypes.func.isRequired,
  onOpenStage: PropTypes.func.isRequired,
};

// ==========================================
// MAIN RAG GUIDE COMPONENT
// ==========================================
const RAGGuide = () => {
  const [activeStageId, setActiveStageId] = useState(Stages[0].id);
  const [openedStage, setOpenedStage] = useState(null);

  const handleOpenStage = (stageId) => {
    setActiveStageId(stageId);
    const found = Stages.find((s) => s.id === stageId);
    if (found) setOpenedStage(found);
  };

  useSEO({
    title: "RAG Architecture Guide: Retrieval-Augmented Generation — CodeSphere",
    description:
      "Interactive visual architecture guide to Retrieval-Augmented Generation (RAG): document chunking, vector embeddings, hybrid search, cross-encoder reranking, and grounded LLM generation.",
    keywords:
      "Retrieval Augmented Generation, RAG architecture, vector database, embeddings, LLM hallucination, semantic search, reranker, LangChain, LlamaIndex, visual RAG pipeline",
    canonical: PAGE_URL,
    og: {
      title: "RAG Architecture Guide: Retrieval-Augmented Generation — CodeSphere",
      description:
        "Interactive visual architecture guide to Retrieval-Augmented Generation (RAG): document chunking, vector embeddings, hybrid search, cross-encoder reranking, and grounded LLM generation.",
      url: PAGE_URL,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "RAG Architecture Guide: Retrieval-Augmented Generation — CodeSphere",
      description:
        "Interactive visual architecture guide to Retrieval-Augmented Generation (RAG): document chunking, vector embeddings, hybrid search, cross-encoder reranking, and grounded LLM generation.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Retrieval-Augmented Generation (RAG) Architecture Guide",
      name: "Retrieval-Augmented Generation (RAG) Architecture Guide",
      description:
        "Interactive visual architecture guide to Retrieval-Augmented Generation (RAG): document chunking, vector embeddings, hybrid search, cross-encoder reranking, and grounded LLM generation.",
      url: PAGE_URL,
      author: {
        "@type": "Person",
        name: "Ali Hamza",
        url: "https://github.com/thealihamza04",
      },
      publisher: {
        "@type": "Organization",
        name: "CodeSphere",
        url: "https://codes-sphere.vercel.app/",
      },
      inLanguage: "en-US",
      keywords: [
        "Retrieval-Augmented Generation",
        "RAG Architecture",
        "Vector Database",
        "Embeddings",
        "Semantic Search",
        "Cross-Encoder Reranking",
        "Hybrid Retrieval",
        "Grounded LLM Generation",
      ],
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div
      className="relative max-w-full min-h-screen bg-base-100"
      data-page-context={JSON.stringify(data)}
    >
      <div className="px-4 py-8 mx-auto max-w-5xl md:px-6">
        {/* Header */}
        <div className="pt-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2.5 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            <LuBrain className="size-4" /> AI Engineering & Architecture
          </div>
          <h1 className="text-3xl heading md:text-5xl text-base-content">
            RAG Pipeline Architecture
          </h1>
        </div>

        {/* 1. Core Definition (Top One-Liner Box) */}
        <section className="p-4 md:p-6 mb-8 border-4 rounded-2xl bg-base-200 border-neutral-900 dark:border-neutral-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-primary text-primary-content">
              <LuSparkles className="size-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase text-primary">
                {Definition.Label}: {Definition.Title}
              </h2>
            </div>
          </div>

          <blockquote className="text-base md:text-xl font-bold leading-snug tracking-tight text-base-content my-2">
            &ldquo;{Definition.OneLiner}&rdquo;
          </blockquote>

          <div className="inline-block px-3 py-1 rounded-lg bg-base-100 font-mono text-xs text-primary font-bold border border-base-300">
            {Definition.Formula}
          </div>

          {/* Key Architectural Benefits (AEO / GEO Entity Grounding) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-base-300">
            {Definition.KeyBenefits.map((b) => (
              <div key={b.Label} className="bg-base-100 p-2.5 rounded-xl border border-base-300">
                <p className="text-xs font-black text-primary flex items-center gap-1.5">
                  <LuCircleCheck className="size-3.5 shrink-0 text-emerald-500" />
                  {b.Label}
                </p>
                <p className="text-[11px] font-medium text-base-content/75 mt-0.5 leading-snug">
                  {b.Desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Visual Pipeline Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <LuWorkflow className="size-5 text-primary" />
              <h2 className="text-lg md:text-2xl font-black tracking-tight text-base-content">
                The Visual Pipeline
              </h2>
            </div>
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              <LuInfo className="size-3.5" /> Click any component for details
            </span>
          </div>

          {/* Desktop View: Horizontal Canvas */}
          <DesktopSketchyRAGDiagram
            activeStageId={activeStageId}
            onHoverStage={(id) => setActiveStageId(id)}
            onOpenStage={handleOpenStage}
          />

          {/* Mobile View: Vertical Step-by-Step Flow */}
          <MobileVerticalSketchyPipeline
            activeStageId={activeStageId}
            onOpenStage={handleOpenStage}
          />
        </section>
      </div>

      {/* 3. Gestures-Compliant Modal (Desktop Dialog / Mobile Bottom Sheet) */}
      <RAGDetailSheetOrDialog
        stage={openedStage}
        onClose={() => setOpenedStage(null)}
      />
    </div>
  );
};

export default RAGGuide;
