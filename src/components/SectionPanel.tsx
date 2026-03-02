import type { Category, Option } from "../types";
import OptionCard from "./OptionCard";

interface SectionPanelProps {
  title: string;
  items: Option[];
  category: Category;
  onToggleSelection: (id: string, category: Category) => void;
}

const SectionPanel = ({
  title,
  items,
  category,
  onToggleSelection,
}: SectionPanelProps) => {
  return (
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
          <OptionCard
            key={item.id}
            item={item}
            onClick={() => onToggleSelection(item.id, category)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionPanel;
