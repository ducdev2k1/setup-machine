import { useState } from "react";

interface ScriptPreviewProps {
  script: string;
  onDownload: () => void;
}

const ScriptPreview = ({ script, onDownload }: ScriptPreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="glass-panel rounded-2xl p-6 sticky top-8 flex flex-col items-center">
      <button
        onClick={onDownload}
        className="w-full mb-6 py-4 px-6 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg border border-white/10 hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 text-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download Script
      </button>

      <div className="w-full">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="w-full flex items-center justify-between py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-teal-300 font-semibold"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs">
              📝
            </span>
            Script Preview
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              showPreview ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showPreview && (
          <div className="mt-4 bg-black/40 rounded-xl p-4 overflow-y-auto max-h-[60vh] font-mono text-xs text-green-400 border border-white/5 shadow-inner">
            <pre className="whitespace-pre-wrap break-all">{script}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptPreview;
