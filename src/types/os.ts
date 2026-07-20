export type AppId = 
  | 'profile' 
  | 'projects' 
  | 'showcase'
  | 'terminal' 
  | 'files' 
  | 'chatbot' 
  | 'settings' 
  | 'contact'
  | 'network-info';

export interface WindowState {
  id: AppId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppConfig {
  id: AppId;
  title: string;
  iconName: string;
  defaultWidth: number;
  defaultHeight: number;
  badge?: string | number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Fullstack' | 'Frontend' | 'AI / ML' | 'Systems / DevOps';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
  stars?: number;
  tag?: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon?: string; experience: string }[];
}

export interface FSNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FSNode[];
  icon?: string;
}

export type WallpaperId = 'abstract' | 'cat' | 'galaxy' | 'space' | 'tree';
