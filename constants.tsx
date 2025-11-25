import { 
  ScrollText, 
  BookOpen, 
  Handshake, 
  Map as MapIcon, 
  UserPlus, 
  Library, 
  ClipboardList, 
  UserCog, 
  ShieldAlert, 
  Flame, 
  Droplets, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { NavItem, NewsItem, SectionData } from './types';

// Theme Colors Configuration
export const THEME = {
  darkGreen: '#0a3d35',
  mediumGreen: '#1f655c',
  lightGreen: '#e5f2ed',
  accentGreen: '#789d8d',
  white: '#ffffff',
};

// Image Assets
export const IMAGES = {
  // Pattern Background (Layer 1 - Fixed)
  cloudPattern: '769fe8ea-0909-4939-a67d-b5d2104f3e5a.png', 
  // Landscape Illustration (Layer 2 - Scrolled)
  landscape: '10d4c684-63ab-45eb-949c-54c83840c66f.png',
  // Map for War View (Fallback to Unsplash if local missing, but using reference logic)
  warMap: '10d4c684-63ab-45eb-949c-54c83840c66f.png', 
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio', view: 'home' },
  { label: 'Konoha', href: '#konoha', view: 'home' }, 
  { label: 'Kirigakure', href: '#kirigakure', view: 'home' }, 
  { label: 'Guerra', href: '#guerra', view: 'war' }, 
  { label: 'Ficha de Personaje', href: '#ficha', view: 'home' },
  { label: 'Técnicas', href: '#tecnicas', view: 'home' },
  { label: 'Moderaciones', href: '#moderaciones', view: 'home' },
  { label: 'Off-Rol', href: '#offrol', view: 'home' },
];

export const NEWS_ITEMS: NewsItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: 'Evento de Aldea: Exámenes Chunnin',
  description: 'Los kages se han reunido para determinar las nuevas fechas de los exámenes.',
}));

export const SECTIONS: SectionData[] = [
  {
    id: 'general',
    title: 'General',
    items: [
      { id: 1, title: 'Reglas Generales', icon: ScrollText },
      { id: 2, title: 'Guías', icon: BookOpen },
      { id: 3, title: 'Bienvenidas y Ausencias', icon: Handshake },
      { id: 4, title: 'Selección de Aldea', icon: MapIcon },
      { id: 5, title: 'Registro de Personaje', icon: UserPlus },
      { id: 6, title: 'Lore & Ambientación', icon: Library },
    ]
  },
  {
    id: 'personajes',
    title: 'Personajes',
    items: [
      { id: 1, title: 'Petición de Misiones', icon: ClipboardList },
      { id: 2, title: 'Perfiles y Creaciones', icon: UserCog },
      { id: 3, title: 'Moderaciones', icon: ShieldAlert },
    ]
  },
  {
    id: 'mundo',
    title: 'Mundo',
    items: [
      { id: 1, title: 'País del Fuego', icon: Flame },
      { id: 2, title: 'País del Agua', icon: Droplets },
    ]
  },
  {
    id: 'offrol',
    title: 'Off-Rol',
    items: [
      { id: 1, title: 'Afiliaciones', icon: Users },
      { id: 2, title: 'Sugerencias', icon: MessageSquare },
    ]
  }
];