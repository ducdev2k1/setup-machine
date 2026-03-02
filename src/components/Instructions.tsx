const Instructions = () => {
  return (
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
  );
};

export default Instructions;
