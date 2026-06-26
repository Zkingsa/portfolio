export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  degree: string;
  description: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  description: string;
  category: 'Competition' | 'Award' | 'Hackathon' | 'Leadership' | 'Academics';
}

export interface WorkExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  type: 'Full-time' | 'Internship' | 'Freelance' | 'Volunteer' | 'Leadership';
  logoPlaceholderText: string;
  responsibilities: string[];
  outcomes: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  stackCategory: 'AI Projects' | 'Front end' | 'Back-End' | 'Full Stack';
  overview: string;
  role: string;
  technologies: string[];
  outcomes: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skillsCode: string[];
  certificateImageUrl: string;
  externalLink?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}
