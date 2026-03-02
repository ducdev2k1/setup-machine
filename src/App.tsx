import { useMemo, useState } from "react";
import databasesData from "./data/databases.json";
import devToolsData from "./data/dev-tools.json";
import utilitiesData from "./data/utilities.json";
import "./index.css";

type Option = {
  id: string;
  name: string;
  description: string;
  script: string;
  selected: boolean;
};

function App() {
  const [devTools, setDevTools] = useState<Option[]>(devToolsData);
  const [databases, setDatabases] = useState<Option[]>(databasesData);
  const [utilities, setUtilities] = useState<Option[]>(utilitiesData);

  const toggleSelection = (
    id: string,
    category: "devTools" | "databases" | "utilities",
  ) => {
    const updateState = (prevState: Option[]) =>
      prevState.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      );

    if (category === "devTools") setDevTools(updateState);
    if (category === "databases") setDatabases(updateState);
    if (category === "utilities") setUtilities(updateState);
  };

  const generatedScript = useMemo(() => {
    let script = `#!/bin/bash

# Dừng script ngay nếu có lỗi xảy ra
set -e

echo "=========================================="
echo "CHÀO MỪNG $USER! BẮT ĐẦU QUÁ TRÌNH SETUP..."
echo "1. CẬP NHẬT HỆ THỐNG & CÀI CÁC GÓI CƠ BẢN"
echo "=========================================="
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget gnupg apt-transport-https software-properties-common lsb-release
`;

    let step = 2;
    const addSection = (title: string, items: Option[]) => {
      const selected = items.filter((i) => i.selected);
      if (selected.length === 0) return;

      script += `\necho "=========================================="\n`;
      script += `echo "${step}. ${title}"\n`;
      script += `echo "=========================================="\n`;

      selected.forEach((item) => {
        script += `# --- Cài đặt ${item.name} ---\n`;
        script += `${item.script}\n\n`;
      });
      step++;
    };

    addSection("CÀI ĐẶT CÔNG CỤ PHÁT TRIỂN", devTools);
    addSection("CÀI ĐẶT CƠ SỞ DỮ LIỆU", databases);
    addSection("CÀI ĐẶT TIỆN ÍCH & GIAO DIỆN", utilities);

    script += `echo "=========================================="\n`;
    script += `echo "🎉 SETUP HOÀN TẤT!"\n`;
    script += `echo "=========================================="\n`;

    return script;
  }, [devTools, databases, utilities]);

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: "text/x-sh" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "setup_machine.sh";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSection = (
    title: string,
    items: Option[],
    category: "devTools" | "databases" | "utilities",
  ) => (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-300 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
          {category === "devTools"
            ? "🛠"
            : category === "databases"
              ? "🗄"
              : "✨"}
        </span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleSelection(item.id, category)}
            className={`glass-card p-5 rounded-xl border relative overflow-hidden group ${item.selected ? "selected" : ""}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-white group-hover:text-indigo-200 transition-colors">
                {item.name}
              </h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${item.selected ? "border-indigo-400 bg-indigo-500" : "border-gray-500"}`}
              >
                {item.selected && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen p-6 md:p-12 relative">
      {/* Decorative gradient orbs bg */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-600/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300 drop-shadow-sm">
            Setup Builder
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Build your personalized Ubuntu setup script in seconds. Select the
            tools, databases, and utilities you need.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-panel rounded-2xl p-8">
              {renderSection("Developer Tools", devTools, "devTools")}
              {renderSection("Databases", databases, "databases")}
              {renderSection("Utilities & Themes", utilities, "utilities")}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel rounded-2xl p-6 sticky top-8 flex flex-col items-center">
              <button
                onClick={downloadScript}
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
                    className={`w-5 h-5 transition-transform duration-300 ${showPreview ? "rotate-180" : ""}`}
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
                    <pre className="whitespace-pre-wrap break-all">
                      {generatedScript}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 mt-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
                  🚀
                </span>
                Hướng dẫn chạy Script
              </h2>
              <div className="text-sm text-gray-300 space-y-3">
                <p>1. Mở Terminal tại thư mục chứa file tải về.</p>
                <p>2. Cấp quyền thực thi cho file script:</p>
                <div className="bg-black/40 p-3 rounded-lg font-mono text-green-400 text-xs border border-white/5">
                  chmod +x setup_machine.sh
                </div>
                <p>3. Chạy file script để bắt đầu cài đặt:</p>
                <div className="bg-black/40 p-3 rounded-lg font-mono text-green-400 text-xs border border-white/5">
                  ./setup_machine.sh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
