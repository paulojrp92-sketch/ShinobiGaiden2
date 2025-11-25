import React from 'react';
import { Bell, ShoppingCart, Link as LinkIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[60px] bg-[#0a3d35] flex items-center justify-between px-5 z-[1000] text-white shadow-md">
      <div className="text-xl font-bold tracking-wider">Shinobi Gaiden 2.0</div>
      
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-green-200 transition-colors text-sm">
          <Bell size={18} />
          <span className="hidden sm:inline">Notificaciones</span>
        </div>
        
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-green-200 transition-colors text-sm">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Tienda</span>
        </div>
        
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-green-200 transition-colors text-sm">
          <LinkIcon size={18} />
          <span className="hidden sm:inline">Enlaces rápidos</span>
        </div>
        
        <div className="w-8 h-8 bg-[#789d8d] rounded-full flex items-center justify-center text-[#0a3d35] font-bold shadow-inner">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;