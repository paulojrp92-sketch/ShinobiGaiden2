import React from 'react';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';

interface SubNavProps {
  currentView: 'home' | 'war';
  onNavigate: (view: 'home' | 'war') => void;
}

const SubNav: React.FC<SubNavProps> = ({ currentView, onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault(); // Prevents the browser from jumping to anchors (e.g., #guerra)
    
    // Only trigger navigation if the view actually changes
    if (item.view !== currentView) {
      onNavigate(item.view);
    }
    
    // Optional: Smooth scroll to top when switching views
    if (item.view !== currentView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-[60px] left-0 w-full bg-[#f7faf9] border-b border-[#789d8d] z-[999] shadow-sm overflow-x-auto">
      <ul className="flex list-none gap-6 px-5 py-3 m-0 whitespace-nowrap min-w-max md:min-w-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a 
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              className={`text-sm font-semibold transition-colors relative group block
                ${item.view === currentView && item.view === 'war' ? 'text-[#1f655c]' : 'text-[#0a3d35]'}
                hover:text-[#1f655c] cursor-pointer
              `}
            >
              {item.label}
              <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-[#1f655c] transition-all duration-300 group-hover:w-full
                ${item.view === currentView && item.view === 'war' && item.label === 'Guerra' ? 'w-full' : 'w-0'}
                ${item.view === currentView && item.label === 'Inicio' ? 'w-full' : ''}
              `}></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNav;