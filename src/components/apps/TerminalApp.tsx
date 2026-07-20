import React, { useState, useRef, useEffect } from 'react';
import { DEVELOPER_INFO, PROJECTS_DATA, SKILLS_DATA } from '../../data/portfolioData';

import { useOSStore } from '../../store/useOSStore';
import type { AppId } from '../../types/os';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const { openApp } = useOSStore();

  const [inputVal, setInputVal] = useState('');
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const devfetchOutput = (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 font-mono text-xs py-1">
      <img src="/profile.png" alt="developer" className="w-56 h-56 rounded-xl object-cover shrink-0" />
      <div className="space-y-0.5 text-[#cdd6f4]">
        <p><span className="text-[#89b4fa] font-bold">joshi@dev-os</span></p>
        <p className="text-[#585b70]">-------------------</p>
        <p><span className="text-[#fab387]">Name:</span> {DEVELOPER_INFO.name}</p>
        <p><span className="text-[#fab387]">Handle:</span> {DEVELOPER_INFO.handle}</p>
        <p><span className="text-[#fab387]">Role:</span> {DEVELOPER_INFO.role}</p>
        <p><span className="text-[#fab387]">Location:</span> {DEVELOPER_INFO.location}</p>
        <p><span className="text-[#fab387]">Email:</span> {DEVELOPER_INFO.email}</p>
        <p><span className="text-[#fab387]">GitHub:</span> {DEVELOPER_INFO.github}</p>
        <p><span className="text-[#fab387]">LinkedIn:</span> {DEVELOPER_INFO.linkedin}</p>
        <p><span className="text-[#fab387]">Facebook:</span> {DEVELOPER_INFO.facebook}</p>
        <p><span className="text-[#fab387]">Instagram:</span> {DEVELOPER_INFO.instagram}</p>
        <p><span className="text-[#fab387]">Twitter:</span> {DEVELOPER_INFO.twitter}</p>
        <p><span className="text-[#fab387]">Interests:</span> {DEVELOPER_INFO.interests.join(', ')}</p>
      </div>
    </div>
  );

  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'welcome-1',
      type: 'system',
      content: 'Joshi OS Interactive Terminal v2.0 (x86_64-pc-linux-gnu)',
    },
    {
      id: 'welcome-2',
      type: 'system',
      content: 'Type "help" for commands list or "devfetch" for developer info.',
    },
    { id: 'devfetch-input', type: 'input', content: 'devfetch' },
    { id: 'devfetch-output', type: 'output', content: devfetchOutput },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length === 0) return;
      const nextIdx = historyIndex < cmdHistoryList.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdStr = inputVal.trim();
    if (!cmdStr) return;

    setCmdHistoryList((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    const parts = cmdStr.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now() + '-input', type: 'input', content: cmdStr },
    ];

    switch (command) {
      case 'help':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: (
            <div className="space-y-1 text-[#cdd6f4]">
              <p className="text-[#a6e3a1] font-bold">GNU bash, version 5.2.15-release (x86_64-pc-linux-gnu)</p>
              <p className="text-[#bac2de]">These shell commands are defined internally. Type "help" to see this list.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs pt-1">
                <div><span className="text-[#cba6f7] font-bold">devfetch</span> - Display developer info & ASCII art portrait</div>
                <div><span className="text-[#cba6f7] font-bold">profile</span> - Print developer bio summary</div>
                <div><span className="text-[#cba6f7] font-bold">projects</span> - List portfolio repositories</div>
                <div><span className="text-[#cba6f7] font-bold">skills</span> - Display tech matrix</div>
                <div><span className="text-[#cba6f7] font-bold">ls</span> - List directory contents</div>
                <div><span className="text-[#cba6f7] font-bold">cat [file]</span> - Display file contents</div>
                <div><span className="text-[#cba6f7] font-bold">contact</span> - Display email & socials</div>
                <div><span className="text-[#cba6f7] font-bold">clear</span> - Clear terminal screen</div>
                <div><span className="text-[#cba6f7] font-bold">gui [app]</span> - Launch window application</div>
                <div><span className="text-[#cba6f7] font-bold">open [app]</span> - Alias for gui command</div>
                <div><span className="text-[#cba6f7] font-bold">apps</span> - List all available apps</div>
              </div>
            </div>
          ),
        });
        break;

      case 'devfetch':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: devfetchOutput,
        });
        break;

      case 'profile':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: `${DEVELOPER_INFO.name} - ${DEVELOPER_INFO.role}\n${DEVELOPER_INFO.bio}`,
        });
        break;

      case 'projects':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: (
            <div className="space-y-1">
              <p className="text-[#89b4fa] font-bold">Featured Repositories:</p>
              {PROJECTS_DATA.map((p, i) => (
                <div key={i} className="text-xs pl-2 border-l border-[#cba6f7]/40">
                  <span className="text-[#fab387] font-bold">{p.title}</span> - {p.description} [{p.technologies.join(', ')}]
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'skills':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: (
            <div className="space-y-1">
              <p className="text-[#a6e3a1] font-bold">Technical Matrix:</p>
              {SKILLS_DATA.map((cat, i) => (
                <div key={i} className="text-xs">
                  <span className="text-[#89b4fa] font-bold">{cat.category}:</span>{' '}
                  {cat.skills.map((s) => `${s.name} (${s.level}%)`).join(', ')}
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'ls':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: 'Profile.md   Skills.json   Projects/   ContactInfo.txt   Resume.pdf',
        });
        break;

      case 'cat':
        const fileName = args[0]?.toLowerCase();
        if (!fileName) {
          newHistory.push({ id: Date.now() + '-err', type: 'error', content: 'cat: missing file argument' });
        } else if (fileName.includes('profile')) {
          newHistory.push({ id: Date.now() + '-out', type: 'output', content: DEVELOPER_INFO.bio });
        } else if (fileName.includes('contact')) {
          newHistory.push({ id: Date.now() + '-out', type: 'output', content: `Email: ${DEVELOPER_INFO.email}\nGitHub: ${DEVELOPER_INFO.github}` });
        } else {
          newHistory.push({ id: Date.now() + '-err', type: 'error', content: `cat: ${args[0]}: No such file or directory` });
        }
        break;

      case 'contact':
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: `Email: ${DEVELOPER_INFO.email}\nGitHub: ${DEVELOPER_INFO.github}\nLinkedIn: ${DEVELOPER_INFO.linkedin}`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'gui':
      case 'open': {
        const targetApp = args[0]?.toLowerCase() as AppId;
        const validApps: AppId[] = ['profile', 'projects', 'terminal', 'files', 'chatbot', 'settings', 'contact', 'network-info'];
        if (validApps.includes(targetApp)) {
          openApp(targetApp);
          newHistory.push({ id: Date.now() + '-out', type: 'output', content: `Opened: ${targetApp}` });
        } else {
          newHistory.push({ id: Date.now() + '-err', type: 'error', content: `app "${args[0] || ''}" not found. Type "apps" for available apps.` });
        }
        break;
      }

      case 'apps': {
        const appList = [
          { id: 'profile', label: 'Profile', desc: 'Developer bio & info' },
          { id: 'projects', label: 'Projects', desc: 'Portfolio showcase' },
          { id: 'terminal', label: 'Terminal', desc: 'CLI interface' },
          { id: 'files', label: 'Files', desc: 'File explorer' },
          { id: 'chatbot', label: 'AI Chat', desc: 'AI assistant' },
          { id: 'settings', label: 'Settings', desc: 'System preferences' },
          { id: 'contact', label: 'Contact', desc: 'Send a message' },
          { id: 'network-info', label: 'Network Info', desc: 'IP, location & safety' },
        ];
        newHistory.push({
          id: Date.now() + '-out',
          type: 'output',
          content: (
            <div className="space-y-1">
              <p className="text-[#89b4fa] font-bold">Available Applications:</p>
              {appList.map((app, i) => (
                <div key={i} className="text-xs pl-2 border-l border-[#cba6f7]/40">
                  <span className="text-[#fab387] font-bold">{app.id}</span> - {app.desc}
                </div>
              ))}
              <p className="text-[#a6adc8] text-[10px] pt-1">Use: gui &lt;app&gt; or open &lt;app&gt;</p>
            </div>
          ),
        });
        break;
      }

      case 'sudo':
        newHistory.push({
          id: Date.now() + '-err',
          type: 'error',
          content: 'sudo: Permission denied. User is not in the sudoers file. This incident will be reported to Joshi.',
        });
        break;

      default:
        newHistory.push({
          id: Date.now() + '-err',
          type: 'error',
          content: `bash: ${command}: command not found. Type "help" for commands list.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div 
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full w-full font-mono text-xs text-[#a6e3a1] bg-transparent overflow-y-auto cursor-text select-text pr-1"
    >
      <div className="space-y-1">
        {history.map((line) => (
          <div key={line.id}>
            {line.type === 'input' && (
              <div className="flex items-center space-x-1 text-[#cdd6f4]">
                <span className="text-[#cba6f7] font-bold">joshi@dev-os:~$</span>
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="text-[#bac2de] leading-relaxed whitespace-pre-wrap pl-1">{line.content}</div>
            )}
            {line.type === 'system' && (
              <p className="text-[#a6adc8] italic">{line.content}</p>
            )}
            {line.type === 'error' && (
              <p className="text-[#f38ba8]">{line.content}</p>
            )}
          </div>
        ))}

        {/* Inline Active Command Prompt Line */}
        <form onSubmit={handleCommand} className="flex items-center space-x-1 pt-0.5">
          <span className="text-[#cba6f7] font-bold shrink-0">joshi@dev-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#a6e3a1] font-mono caret-[#cba6f7] p-0 focus:ring-0 shadow-none text-xs"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
