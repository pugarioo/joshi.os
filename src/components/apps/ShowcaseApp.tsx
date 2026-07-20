import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { useOSStore } from '../../store/useOSStore';
import { ExternalLink, Maximize2 } from 'lucide-react';

export const ShowcaseApp: React.FC = () => {
  const { selectedProjectId } = useOSStore();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const project = PROJECTS_DATA.find((p) => p.id === selectedProjectId);

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center text-[#a6adc8] text-sm">
        No project selected.
      </div>
    );
  }

  const getTagBadgeStyle = (tag?: string) => {
    if (tag === 'Thesis Project') return 'bg-[#cba6f7]/20 text-[#cba6f7] border-[#cba6f7]/40';
    if (tag === 'School Project') return 'bg-[#fab387]/20 text-[#fab387] border-[#fab387]/40';
    if (tag === 'Personal Project') return 'bg-[#a6e3a1]/20 text-[#a6e3a1] border-[#a6e3a1]/40';
    return 'bg-[#89b4fa]/20 text-[#89b4fa] border-[#89b4fa]/40';
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden text-[#cdd6f4] space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          {project.tag && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTagBadgeStyle(project.tag)}`}>
              {project.tag}
            </span>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-5">

        {/* Hero Image */}
        <div className="relative group rounded-2xl overflow-hidden bg-[#0d0e15] border border-white/10 shadow-2xl flex items-center justify-center p-4">
          {/* macOS title bar dots */}
          <div className="absolute top-3 left-3 flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full max-h-72 object-contain rounded-xl cursor-zoom-in transition duration-300 group-hover:scale-[1.02]"
            onClick={() => setLightboxImage(project.image)}
          />
          <button
            onClick={() => setLightboxImage(project.image)}
            className="absolute bottom-4 right-4 bg-[#11111b]/80 hover:bg-[#cba6f7] text-[#cdd6f4] hover:text-[#11111b] px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border border-white/20 transition flex items-center space-x-1.5 cursor-pointer shadow-lg"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>
        </div>

        {/* Description */}
        <div className="glass-card rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#a6adc8]">About this Project</span>
          <p className="text-sm text-[#cdd6f4] leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#a6adc8]">Technologies & Architecture</span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-xs bg-[#313244]/80 text-[#cba6f7] px-3 py-1.5 rounded-xl border border-white/10 font-mono font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1 pb-2">
          <span className="text-xs text-[#a6adc8] font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            {project.category}
          </span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 bg-[#cba6f7] text-[#11111b] font-bold rounded-xl hover:bg-[#b4befe] transition flex items-center space-x-2 text-xs shadow-lg cursor-pointer"
            >
              <span>Open on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxImage && (
        <div
          className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center rounded-2xl"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer"
          >
            ✕
          </button>
          <img
            src={lightboxImage}
            alt="Fullscreen Preview"
            className="max-w-full max-h-[85%] object-contain rounded-2xl shadow-2xl border border-white/20"
          />
          <span className="text-xs font-mono text-[#a6adc8] mt-3">Click anywhere to close</span>
        </div>
      )}
    </div>
  );
};
