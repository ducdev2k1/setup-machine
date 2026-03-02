import type { Option } from "../types";
import OptionCard from "./OptionCard";

interface SectionPanelProps {
  title: string;
  icon: string;
  categoryId: string;
  items: Option[];
  onToggleSelection: (id: string, categoryId: string) => void;
}

const SectionPanel = ({
  title,
  icon,
  categoryId,
  items,
  onToggleSelection,
}: SectionPanelProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-300 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
          {icon}
        </span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <OptionCard
            key={item.id}
            item={item}
            onClick={() => onToggleSelection(item.id, categoryId)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionPanel;
