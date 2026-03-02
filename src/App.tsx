import { useMemo, useState } from "react";
import Instructions from "./components/Instructions";
import ScriptPreview from "./components/ScriptPreview";
import SectionPanel from "./components/SectionPanel";
import "./index.css";
import type { CategoryData, Option } from "./types";

// Dynamically load all JSON files in the data directory
const jsonModules = import.meta.glob("./data/*.json", { eager: true });
const initialCategories: CategoryData[] = Object.values(jsonModules).map(
  (mod: unknown) =>
    (mod as { default: CategoryData }).default || (mod as CategoryData),
);

// Optional: sort categories to maintain a specific order (devTools -> databases -> utilities)
const orderMap: Record<string, number> = {
  devTools: 1,
  databases: 2,
  utilities: 3,
};
initialCategories.sort(
  (a, b) => (orderMap[a.category] || 99) - (orderMap[b.category] || 99),
);

function App() {
  const [categories, setCategories] =
    useState<CategoryData[]>(initialCategories);

  const toggleSelection = (id: string, categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.category !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item,
          ),
        };
      }),
    );
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
      script += `echo "${step}. ${title.toUpperCase()}"\n`;
      script += `echo "=========================================="\n`;

      selected.forEach((item) => {
        script += `# --- Cài đặt ${item.name} ---\n`;
        script += `${item.script}\n\n`;
      });
      step++;
    };

    categories.forEach((cat) => {
      // Use custom titles for the default sections to maintain exact bash script output
      // where appropriate, or fallback to the JSON title
      const sectionTitle =
        cat.category === "devTools"
          ? "CÀI ĐẶT CÔNG CỤ PHÁT TRIỂN"
          : cat.category === "databases"
            ? "CÀI ĐẶT CƠ SỞ DỮ LIỆU"
            : cat.category === "utilities"
              ? "CÀI ĐẶT TIỆN ÍCH & GIAO DIỆN"
              : `CÀI ĐẶT ${cat.title}`;

      addSection(sectionTitle, cat.items);
    });

    script += `echo "=========================================="\n`;
    script += `echo "🎉 SETUP HOÀN TẤT!"\n`;
    script += `echo "=========================================="\n`;
    script += `echo "Lưu ý quan trọng sau khi cài xong:"\n`;
    script += `echo "1. Đăng xuất và Đăng nhập lại để Ibus-Bamboo hoạt động."\n`;
    script += `echo "2. Mở Settings > Region & Language > Input Sources > Thêm 'Vietnamese (Bamboo)'."\n`;
    script += `echo "3. Mở Terminal mới để NVM nhận Node 24."\n`;
    script += `echo "4. TimescaleDB đã sẵn sàng trên PostgreSQL 16 (User mặc định: postgres)."\n`;
    script += `echo "5. Mở 'Tweaks' -> 'Appearance' để chọn theme WhiteSur-Dark."\n`;
    script += `echo "=========================================="\n`;

    return script;
  }, [categories]);

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
            Tạo Script Cài Đặt
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tạo script cài đặt Ubuntu cá nhân hóa của bạn trong vài giây. Chọn
            các công cụ, cơ sở dữ liệu và tiện ích bạn cần. Thêm các file .json
            mới vào thư mục data để mở rộng thêm tùy chọn!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-panel rounded-2xl p-8">
              {categories.map((cat) => (
                <SectionPanel
                  key={cat.category}
                  title={cat.title}
                  icon={cat.icon}
                  categoryId={cat.category}
                  items={cat.items}
                  onToggleSelection={toggleSelection}
                />
              ))}
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
