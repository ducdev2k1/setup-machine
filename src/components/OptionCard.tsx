import type { Option } from "../types";

interface OptionCardProps {
  item: Option;
  onClick: () => void;
}

const OptionCard = ({ item, onClick }: OptionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 rounded-xl border relative overflow-hidden group cursor-pointer ${
        item.selected ? "selected" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-white group-hover:text-indigo-200 transition-colors">
          {item.name}
        </h3>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            item.selected
              ? "border-indigo-400 bg-indigo-500"
              : "border-gray-500"
          }`}
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
      <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
    </div>
  );
};

export default OptionCard;
