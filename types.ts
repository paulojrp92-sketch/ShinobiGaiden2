import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  view: 'home' | 'war'; // Defines which page this tab belongs to/activates
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
}

export interface CardItem {
  id: number;
  title: string;
  icon: LucideIcon;
}

export interface SectionData {
  id: string;
  title: string;
  items: CardItem[];
}