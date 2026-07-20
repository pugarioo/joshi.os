import React from 'react';
import { DEVELOPER_INFO } from '../../data/portfolioData';
import { useOSStore } from '../../store/useOSStore';
import { 
  MapPin, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Award,
  Terminal,
  Code
} from 'lucide-react';

const SocialIcons = {
  LinkedIn: () => (
    <svg className="w-4 h-4 fill-current text-[#89b4fa]" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.65 1.65 0 0 0-1.66 1.65c0 .9.74 1.65 1.66 1.65.91 0 1.65-.75 1.65-1.65C9.5 7.44 8.77 6.7 7.86 6.7Z" />
    </svg>
  ),
  Facebook: () => (
    <svg className="w-4 h-4 fill-current text-[#89b4fa]" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.73 5.6c1.07 0 2.19.19 2.19.19v2.41h-1.23c-1.23 0-1.61.77-1.61 1.56V12h2.72l-.43 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8Z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-4 h-4 fill-current text-[#f38ba8]" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  GitHub: () => (
    <svg className="w-4 h-4 fill-current text-[#cba6f7]" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ),
};

export const ProfileApp: React.FC = () => {
  const { openApp } = useOSStore();

  const socialLinks = [
    { name: 'LinkedIn', url: DEVELOPER_INFO.linkedin, icon: <SocialIcons.LinkedIn /> },
    { name: 'Facebook', url: DEVELOPER_INFO.facebook, icon: <SocialIcons.Facebook /> },
    { name: 'Instagram', url: DEVELOPER_INFO.instagram, icon: <SocialIcons.Instagram /> },
    { name: 'GitHub', url: DEVELOPER_INFO.github, icon: <SocialIcons.GitHub /> },
  ];

  return (
    <div className="space-y-6 text-[#cdd6f4]">
      {/* Header Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 glass-card p-5 rounded-2xl">
        {/* Real GitHub Avatar */}
        <div className="relative group shrink-0">
          <img 
            src={DEVELOPER_INFO.avatar} 
            alt={DEVELOPER_INFO.name} 
            className="w-24 h-24 rounded-2xl object-cover shadow-xl border-2 border-white/30 transform group-hover:scale-105 transition duration-300"
          />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#a6e3a1] border-2 border-[#181825] rounded-full" title="Active" />
        </div>

        {/* Details */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{DEVELOPER_INFO.name}</h1>
              <span className="text-xs font-mono text-[#a6adc8]">{DEVELOPER_INFO.handle}</span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#cba6f7]/20 text-[#cba6f7] border border-[#cba6f7]/40 font-bold inline-block w-fit mx-auto sm:mx-0 backdrop-blur-md">
              {DEVELOPER_INFO.badge}
            </span>
          </div>
          <p className="text-sm font-medium text-[#89b4fa]">{DEVELOPER_INFO.role}</p>
          <p className="text-xs text-[#a6adc8] flex items-center justify-center sm:justify-start space-x-1 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#f38ba8]" />
            <span>{DEVELOPER_INFO.location}</span>
          </p>

          {/* Social Links Row */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 pt-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl transition flex items-center justify-center"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack & Interests Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#cba6f7]">Tech Stack</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {DEVELOPER_INFO.stack.map((tech, i) => (
              <span key={i} className="text-xs bg-[#cba6f7]/20 text-[#cba6f7] border border-[#cba6f7]/30 px-3 py-1 rounded-xl font-mono font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#89b4fa]">Interests & Focus</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {DEVELOPER_INFO.interests.map((item, i) => (
              <span key={i} className="text-xs bg-[#89b4fa]/20 text-[#89b4fa] border border-[#89b4fa]/30 px-3 py-1 rounded-xl font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={(e) => { e.stopPropagation(); openApp('projects'); }}
          className="flex-1 sm:flex-none px-4 py-2.5 bg-[#89b4fa]/90 hover:bg-[#89b4fa] text-[#11111b] rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#89b4fa]/30 transition cursor-pointer backdrop-blur-md"
        >
          <Code className="w-4 h-4" />
          <span>View Projects</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); openApp('terminal'); }}
          className="flex-1 sm:flex-none px-4 py-2.5 glass-card text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-[#a6e3a1]" />
          <span>Launch CLI</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); openApp('contact'); }}
          className="flex-1 sm:flex-none px-4 py-2.5 glass-card text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <Mail className="w-4 h-4 text-[#f38ba8]" />
          <span>Contact Me</span>
        </button>
      </div>

      {/* Experience & Education Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Work Experience */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-[#313244] pb-2">
            <Briefcase className="w-4 h-4 text-[#89b4fa]" />
            <span>Experience & Leadership</span>
          </h3>
          <div className="space-y-3">
            {DEVELOPER_INFO.experience.map((exp, i) => (
              <div key={i} className="glass-card p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{exp.role}</span>
                  <span className="text-[10px] text-[#a6adc8] bg-white/10 px-2 py-0.5 rounded-full">{exp.period}</span>
                </div>
                <div className="text-[11px] text-[#89b4fa] font-medium">{exp.company}</div>
                <p className="text-[11px] text-[#bac2de] leading-relaxed pt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Honors */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-[#313244] pb-2">
            <GraduationCap className="w-4 h-4 text-[#fab387]" />
            <span>Education & Honors</span>
          </h3>
          <div className="space-y-3">
            {DEVELOPER_INFO.education.map((edu, i) => (
              <div key={i} className="glass-card p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{edu.degree}</span>
                  <span className="text-[10px] text-[#a6adc8] bg-white/10 px-2 py-0.5 rounded-full">{edu.year}</span>
                </div>
                <div className="text-[11px] text-[#fab387] font-medium">{edu.institution}</div>
                <p className="text-[11px] text-[#bac2de] pt-1 flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-[#a6e3a1]" />
                  <span>{edu.honors}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
