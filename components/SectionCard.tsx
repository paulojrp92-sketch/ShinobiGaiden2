import React from 'react';
import { CardItem } from '../types';

interface SectionCardProps {
  item: CardItem;
}

const SectionCard: React.FC<SectionCardProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="bg-white/90 border border-[#d4e2dd] rounded-lg p-5 flex items-center gap-4 min-h-[100px] shadow-sm hover:shadow-md hover:bg-white transition-all cursor-pointer group">
      <div className="w-10 h-10 rounded-full bg-[#1f655c] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-200">
        <Icon size={20} />
      </div>
      <h3 className="m-0 text-base font-semibold text-[#0a3d35]">{item.title}</h3>
    </div>
  );
};

export default SectionCard;