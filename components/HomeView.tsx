import React from 'react';
import NewsCard from './NewsCard';
import SectionCard from './SectionCard';
import FadeInSection from './FadeInSection';
import { NEWS_ITEMS, SECTIONS, IMAGES } from '../constants';

const HomeView: React.FC = () => {
  return (
    <div className="bg-[#fdfdfd] shadow-2xl rounded-xl overflow-hidden min-h-[80vh]">
      {/* Hero Section */}
      <FadeInSection>
        <div className="w-full relative flex flex-col items-center justify-center text-center p-8 md:p-12 bg-gradient-to-b from-[#e5f2ed] to-[#fdfdfd]">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0a3d35] mb-8 drop-shadow-sm tracking-tight uppercase">
            Shinobi Gaiden 2.0
          </h1>
          
          <div className="w-full max-w-4xl mb-8 relative group">
             {/* Decorative border/glow effect */}
             <div className="absolute -inset-1 bg-gradient-to-r from-[#1f655c] to-[#789d8d] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
             <img 
               src={IMAGES.landscape} 
               alt="Paisaje Shinobi" 
               className="relative w-full h-auto rounded-lg shadow-md object-cover max-h-[400px]"
             />
          </div>

          <p className="text-lg md:text-xl text-[#0a3d35] font-semibold bg-white px-8 py-3 rounded-full shadow-sm border border-[#d4e2dd] max-w-2xl">
            Explora el mundo ninja y crea tu propia historia
          </p>
        </div>
      </FadeInSection>

      {/* Main Content Body */}
      <div className="p-6 md:p-12 space-y-12 bg-[#fdfdfd]">
        
        {/* News Section */}
        <FadeInSection>
          <section id="noticias">
            <div className="flex items-center gap-3 mb-6 border-b border-[#e5f2ed] pb-2">
              <div className="h-8 w-1.5 bg-[#1f655c] rounded-full"></div>
              <h2 className="text-2xl font-bold text-[#0a3d35]">
                Noticias Importantes
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {NEWS_ITEMS.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* Dynamic Sections */}
        {SECTIONS.map((section) => (
          <FadeInSection key={section.id}>
            <section id={section.id}>
              <div className="flex items-center gap-3 mb-6 border-b border-[#e5f2ed] pb-2">
                <div className="h-8 w-1.5 bg-[#1f655c] rounded-full"></div>
                <h2 className="text-2xl font-bold text-[#0a3d35]">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <SectionCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default HomeView;