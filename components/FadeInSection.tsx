import React, { useState, useRef, useEffect } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: string; // Clase de delay opcional de tailwind (ej: delay-100)
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Actualizamos el estado basado en si el elemento intersecta con la vista
        setVisible(entry.isIntersecting);
      });
    }, {
      // Threshold 0.1 significa que la animación inicia cuando el 10% del elemento es visible
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Un pequeño margen para que no desaparezca demasiado pronto al bajar
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${delay} 
        ${isVisible 
          ? 'opacity-100 blur-0 translate-y-0 scale-100' 
          : 'opacity-0 blur-sm translate-y-8 scale-95'
        }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;