import { useMemo, useState } from "react";
import Instructions from "./components/Instructions";
import ScriptPreview from "./components/ScriptPreview";
import SectionPanel from "./components/SectionPanel";
import databasesData from "./data/databases.json";
import devToolsData from "./data/dev-tools.json";
import utilitiesData from "./data/utilities.json";
import "./index.css";
import type { Category, Option } from "./types";

function App() {
  const [devTools, setDevTools] = useState<Option[]>(devToolsData);
  const [databases, setDatabases] = useState<Option[]>(databasesData);
  const [utilities, setUtilities] = useState<Option[]>(utilitiesData);

  const toggleSelection = (id: string, category: Category) => {
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
              <SectionPanel
                title="Developer Tools"
                items={devTools}
                category="devTools"
                onToggleSelection={toggleSelection}
              />
              <SectionPanel
                title="Databases"
                items={databases}
                category="databases"
                onToggleSelection={toggleSelection}
              />
              <SectionPanel
                title="Utilities & Themes"
                items={utilities}
                category="utilities"
                onToggleSelection={toggleSelection}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ScriptPreview
                script={generatedScript}
                onDownload={downloadScript}
              />
              <Instructions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
