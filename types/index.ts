export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  slug: string;
  title: string;
  image: string;
  summary: string;
  tags: string[];
  result: string;
  overview: string;
  problem: string;
  approach: string;
  toolsUsed: string[];
  insight: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  focus: string;
}

export interface NavLink {
  label: string;
  href: string;
}