import React from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { useOSStore } from '../../store/useOSStore';
import { GraduationCap, User, BookOpen, Maximize2 } from 'lucide-react';

export const ProjectsApp: React.FC = () => {
  const { openShowcase } = useOSStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const categories = ['All', 'Frontend', 'Fullstack', 'AI / ML', 'Systems / DevOps'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const getTagBadgeStyle = (tag?: string) => {
    if (tag === 'Thesis Project') return 'bg-[#cba6f7]/20 text-[#cba6f7] border-[#cba6f7]/40';
    if (tag === 'School Project') return 'bg-[#fab387]/20 text-[#fab387] border-[#fab387]/40';
    if (tag === 'Personal Project') return 'bg-[#a6e3a1]/20 text-[#a6e3a1] border-[#a6e3a1]/40';
    return 'bg-[#89b4fa]/20 text-[#89b4fa] border-[#89b4fa]/40';
  };

  const getTagIcon = (tag?: string) => {
    if (tag === 'Thesis Project') return <BookOpen className="w-3 h-3 inline mr-1.5" />;
    if (tag === 'School Project') return <GraduationCap className="w-3 h-3 inline mr-1.5" />;
    if (tag === 'Personal Project') return <User className="w-3 h-3 inline mr-1.5" />;
    return null;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden text-[#cdd6f4]">

      {/* Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 no-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-[#cba6f7] text-[#11111b] border-[#cba6f7] font-bold shadow-lg shadow-[#cba6f7]/25'
                : 'glass-card text-[#bac2de] hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={(e) => { e.stopPropagation(); openShowcase(project.id); }}
              className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#cba6f7]/50 cursor-pointer flex flex-col justify-between border border-white/10"
            >
              {/* macOS App Window Mockup Header */}
              <div className="relative p-3 bg-gradient-to-b from-[#181825] to-[#11111b] border-b border-white/10">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[10px] font-mono text-[#a6adc8] ml-2 truncate max-w-[140px]">{project.title.toLowerCase()}.app</span>
                  </div>

                </div>

                {/* Image Canvas */}
                <div className="relative rounded-xl overflow-hidden bg-[#0d0e15] border border-white/10 shadow-xl group-hover:border-[#cba6f7]/40 transition duration-300 h-48 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain p-2 transform group-hover:scale-[1.03] transition duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#11111b]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-2 text-xs font-bold text-white">
                    <Maximize2 className="w-4 h-4 text-[#cba6f7]" />
                    <span>Inspect Showcase</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-white text-base group-hover:text-[#cba6f7] transition">
                      {project.title}
                    </h3>
                    {project.tag && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md shrink-0 flex items-center ${getTagBadgeStyle(project.tag)}`}>
                        {getTagIcon(project.tag)}
                        {project.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#bac2de] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] bg-[#313244]/80 border border-white/10 px-2.5 py-0.5 rounded-lg text-[#cdd6f4] font-mono">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-lg text-[#a6adc8] font-mono">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
