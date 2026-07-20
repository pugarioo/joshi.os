import React from 'react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { Cpu, CheckCircle2, Zap } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  return (
    <div className="space-y-6 text-[#cdd6f4]">
      {/* Header Banner */}
      <div className="glass-card p-4 rounded-xl flex items-center space-x-3 border-l-4 border-l-[#cba6f7]">
        <div className="p-2.5 bg-[#cba6f7]/20 rounded-lg text-[#cba6f7]">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Technical Skills & Matrix</h2>
          <p className="text-xs text-[#a6adc8]">Proficiency level based on hands-on enterprise production projects & systems architecture.</p>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-6">
        {SKILLS_DATA.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#a6adc8] flex items-center space-x-2 border-b border-[#313244] pb-1">
              <Zap className="w-3.5 h-3.5 text-[#fab387]" />
              <span>{cat.category}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="glass-card p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a6e3a1]" />
                      <span>{skill.name}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-[#a6adc8] bg-white/10 px-2 py-0.5 rounded">
                        {skill.experience}
                      </span>
                      <span className="font-mono text-[#cba6f7] font-semibold">{skill.level}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#11111b]/80 rounded-full h-2 overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] h-full rounded-full transition-all duration-500 shadow-sm shadow-[#cba6f7]/50"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
