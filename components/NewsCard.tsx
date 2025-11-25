import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="bg-white/90 border border-[#d4e2dd] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[180px]">
      <div>
        <h3 className="mt-0 mb-3 text-base font-bold text-[#0a3d35] border-b border-[#e5f2ed] pb-2">
          {news.title}
        </h3>
        <p className="text-sm text-[#2a573d] leading-relaxed">
          {news.description}
        </p>
      </div>
      <button className="self-start mt-4 px-3 py-1.5 bg-[#1f655c] text-white text-xs font-medium rounded hover:bg-[#0a3d35] transition-colors">
        Leer más
      </button>
    </div>
  );
};

export default NewsCard;