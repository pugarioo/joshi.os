import React, { useState } from 'react';
import { VIRTUAL_FILESYSTEM } from '../../data/portfolioData';
import type { FSNode } from '../../types/os';
import { 
  Folder, 
  FileText, 
  Code, 
  Mail, 
  ChevronRight, 
  FileCode, 
  ArrowLeft, 
  ArrowRight,
  LayoutGrid, 
  List, 
  Search, 
  Copy, 
  Check, 
  HardDrive,
  Eye,
  FileCode2,
  ExternalLink
} from 'lucide-react';

export const FileExplorerApp: React.FC = () => {
  const homeNode = VIRTUAL_FILESYSTEM.children?.[0]?.children?.[0]; // /home/joshi
  const [currentFolder, setCurrentFolder] = useState<FSNode>(homeNode || VIRTUAL_FILESYSTEM);
  const [folderHistory, setFolderHistory] = useState<FSNode[]>([homeNode || VIRTUAL_FILESYSTEM]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const [activeFile, setActiveFile] = useState<FSNode | null>(null);
  const [mdViewMode, setMdViewMode] = useState<'rendered' | 'raw'>('rendered');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('grid');
  const [copied, setCopied] = useState<boolean>(false);

  const navigateToFolder = (node: FSNode) => {
    if (node.type !== 'folder') return;
    const newHist = folderHistory.slice(0, historyIndex + 1);
    newHist.push(node);
    setFolderHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    setCurrentFolder(node);
    setActiveFile(null);
  };

  const handleBack = () => {
    if (activeFile) {
      setActiveFile(null);
      return;
    }
    if (historyIndex > 0) {
      const prev = folderHistory[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentFolder(prev);
    }
  };

  const handleForward = () => {
    if (historyIndex < folderHistory.length - 1) {
      const next = folderHistory[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentFolder(next);
      setActiveFile(null);
    }
  };

  const handleItemClick = (node: FSNode) => {
    if (node.type === 'folder') {
      navigateToFolder(node);
    } else {
      setActiveFile(node);
      setMdViewMode('rendered');
    }
  };

  const handleCopyContent = () => {
    if (!activeFile?.content) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileIcon = (node: FSNode, size: 'normal' | 'large' = 'normal') => {
    const iconClass = size === 'large' ? 'w-10 h-10' : 'w-4 h-4';
    if (node.type === 'folder') return <Folder className={`${iconClass} text-[#89dceb] fill-[#89dceb]/20`} />;
    if (node.name.endsWith('.json')) return <Code className={`${iconClass} text-[#fab387]`} />;
    if (node.name.endsWith('.txt')) return <Mail className={`${iconClass} text-[#f38ba8]`} />;
    if (node.name.endsWith('.md')) return <FileText className={`${iconClass} text-[#89b4fa]`} />;
    return <FileCode className={`${iconClass} text-[#a6e3a1]`} />;
  };

  // Rich Markdown Parser for Render Mode
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-3 text-xs leading-relaxed text-[#cdd6f4]">
        {lines.map((line, i) => {
          if (line.startsWith('# ')) {
            return (
              <h1 key={i} className="text-base font-bold text-[#cba6f7] border-b border-[#313244] pb-1.5 mt-1">
                {line.replace('# ', '')}
              </h1>
            );
          }
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-sm font-semibold text-[#89b4fa] mt-3">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('![')) {
            const match = line.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
              const [, alt, src] = match;
              return (
                <div key={i} className="my-3 overflow-hidden rounded-xl border border-white/10 shadow-lg bg-[#11111b] p-2 flex items-center justify-center">
                  <img src={src} alt={alt} className="w-full max-h-80 object-contain rounded-lg" />
                </div>
              );
            }
          }
          if (line.startsWith('- ')) {
            return (
              <li key={i} className="ml-4 list-disc text-[#bac2de]">
                {line.replace('- ', '')}
              </li>
            );
          }
          if (line.startsWith('|')) {
            const cols = line.split('|').map(c => c.trim()).filter(Boolean);
            if (cols.every(c => c.includes('---'))) return null;
            return (
              <div key={i} className="grid grid-cols-2 gap-2 p-2 bg-[#1e1e2e]/60 rounded-lg border border-white/10 font-mono text-[11px]">
                <span className="font-bold text-[#cba6f7]">{cols[0]}</span>
                <span className="text-[#a6e3a1]">{cols[1]}</span>
              </div>
            );
          }
          if (line.startsWith('Repository: ')) {
            const url = line.replace('Repository: ', '').trim();
            return (
              <div key={i} className="p-3 glass-card rounded-xl border border-[#cba6f7]/40 my-2 flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] text-[#a6adc8] font-bold uppercase tracking-wider block">Official Repository</span>
                  <span className="font-semibold text-white font-mono text-xs">{url}</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#cba6f7] text-[#11111b] font-bold rounded-lg hover:bg-[#b4befe] transition flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Open Repo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          }
          if (line.trim() === '') return <div key={i} className="h-1" />;
          return <p key={i} className="text-[#cdd6f4]">{line}</p>;
        })}
      </div>
    );
  };

  const filteredChildren = currentFolder.children?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const pathParts = currentFolder.path.split('/').filter(Boolean);
  const isMdFile = activeFile?.name.endsWith('.md');

  return (
    <div className="h-full flex flex-col text-[#cdd6f4] -m-4 p-4 bg-transparent select-none">
      {/* 1. Main Navigation Toolbar */}
      <div className="glass-card px-3 py-2 rounded-xl flex items-center justify-between space-x-3 text-xs mb-3">
        {/* Navigation Arrows */}
        <div className="flex items-center space-x-1">
          <button
            onClick={handleBack}
            disabled={!activeFile && historyIndex <= 0}
            className={`p-1.5 rounded-lg transition ${
              activeFile || historyIndex > 0 ? 'hover:bg-white/10 text-white cursor-pointer' : 'text-[#585b70] cursor-not-allowed'
            }`}
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex >= folderHistory.length - 1}
            className={`p-1.5 rounded-lg transition ${
              historyIndex < folderHistory.length - 1 ? 'hover:bg-white/10 text-white cursor-pointer' : 'text-[#585b70] cursor-not-allowed'
            }`}
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Path Breadcrumbs */}
        <div className="flex-1 flex items-center space-x-1 font-mono text-[11px] glass-input px-3 py-1.5 rounded-lg overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveFile(null);
              navigateToFolder(VIRTUAL_FILESYSTEM);
            }}
            className="hover:text-[#cba6f7] transition"
          >
            Root
          </button>
          {pathParts.map((part, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#585b70]" />
              <span className={idx === pathParts.length - 1 && !activeFile ? 'text-[#cba6f7] font-bold' : 'text-[#bac2de]'}>
                {part}
              </span>
            </React.Fragment>
          ))}
          {activeFile && (
            <>
              <ChevronRight className="w-3 h-3 text-[#585b70]" />
              <span className="text-[#cba6f7] font-bold">{activeFile.name}</span>
            </>
          )}
        </div>

        {/* Search */}
        {!activeFile && (
          <div className="relative w-36 sm:w-44">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#a6adc8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full glass-input pl-8 pr-2 py-1 rounded-lg text-xs"
            />
          </div>
        )}

        {/* View Switcher */}
        {!activeFile && (
          <div className="flex items-center space-x-1 bg-[#11111b]/60 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition ${viewMode === 'grid' ? 'bg-[#cba6f7] text-[#11111b]' : 'text-[#a6adc8] hover:text-white'}`}
              title="Icons Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('details')}
              className={`p-1 rounded transition ${viewMode === 'details' ? 'bg-[#cba6f7] text-[#11111b]' : 'text-[#a6adc8] hover:text-white'}`}
              title="Details List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Main Explorer Window Body */}
      <div className="flex-1 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 overflow-hidden">
        {/* Left Sidebar Tree */}
        <div className="w-full sm:w-48 glass-card p-3 rounded-xl flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a6adc8] px-2 pb-1.5">
                Favorites
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => {
                    setActiveFile(null);
                    navigateToFolder(homeNode || VIRTUAL_FILESYSTEM);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 transition ${
                    currentFolder.path === '/home/joshi' && !activeFile ? 'bg-[#cba6f7] text-[#11111b] font-bold' : 'hover:bg-white/10 text-[#cdd6f4]'
                  }`}
                >
                  <Folder className="w-4 h-4 text-[#89dceb]" />
                  <span>Home</span>
                </button>

                {homeNode?.children?.filter(c => c.type === 'folder').map((folderNode) => (
                  <button
                    key={folderNode.path}
                    onClick={() => {
                      setActiveFile(null);
                      navigateToFolder(folderNode);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 transition pl-5 ${
                      currentFolder.path === folderNode.path && !activeFile ? 'bg-[#cba6f7] text-[#11111b] font-bold' : 'hover:bg-white/10 text-[#cdd6f4]'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-[#89dceb]" />
                    <span>{folderNode.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#313244] pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a6adc8] px-2 pb-1.5">
                Devices
              </div>
              <button
                onClick={() => {
                  setActiveFile(null);
                  navigateToFolder(VIRTUAL_FILESYSTEM);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition ${
                  currentFolder.path === '/' && !activeFile ? 'bg-[#cba6f7] text-[#11111b] font-bold' : 'hover:bg-white/10 text-[#cdd6f4]'
                }`}
              >
                <HardDrive className="w-4 h-4 text-[#fab387]" />
                <span>Macintosh HD</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-[#313244] pt-2 px-1 text-[10px] text-[#a6adc8]">
            <div className="flex justify-between font-mono">
              <span>Disk Available</span>
              <span>237.6 GB</span>
            </div>
            <div className="w-full bg-[#11111b] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#a6e3a1] h-full w-[15%]" />
            </div>
          </div>
        </div>

        {/* Center Main View (File Items OR Rendered/Code Markdown Viewer) */}
        <div className="flex-1 glass-card p-3.5 rounded-xl flex flex-col justify-between overflow-hidden">
          {activeFile ? (
            /* Full Markdown Render & Raw Code View */
            <div className="h-full flex flex-col justify-between space-y-3">
              {/* File Reader Header */}
              <div className="flex items-center justify-between border-b border-[#313244] pb-2">
                <div className="flex items-center space-x-2">
                  {getFileIcon(activeFile, 'normal')}
                  <h2 className="text-sm font-bold text-white">{activeFile.name}</h2>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Markdown View Switcher (Rendered vs Raw Code) */}
                  {isMdFile && (
                    <div className="flex items-center space-x-1 bg-[#11111b]/80 p-0.5 rounded-lg border border-white/10 text-xs">
                      <button
                        onClick={() => setMdViewMode('rendered')}
                        className={`px-2.5 py-1 rounded-md transition flex items-center space-x-1 cursor-pointer ${
                          mdViewMode === 'rendered' ? 'bg-[#cba6f7] text-[#11111b] font-bold' : 'text-[#a6adc8] hover:text-white'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Rendered</span>
                      </button>
                      <button
                        onClick={() => setMdViewMode('raw')}
                        className={`px-2.5 py-1 rounded-md transition flex items-center space-x-1 cursor-pointer ${
                          mdViewMode === 'raw' ? 'bg-[#cba6f7] text-[#11111b] font-bold' : 'text-[#a6adc8] hover:text-white'
                        }`}
                      >
                        <FileCode2 className="w-3.5 h-3.5" />
                        <span>Raw Code</span>
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleCopyContent}
                    className="px-2.5 py-1 bg-[#cba6f7]/20 hover:bg-[#cba6f7] text-[#cba6f7] hover:text-[#11111b] rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#a6e3a1]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => setActiveFile(null)}
                    className="px-3 py-1 glass-card hover:bg-white/10 rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Reader Canvas */}
              <div className="flex-1 bg-[#11111b]/80 p-4 rounded-xl overflow-auto border border-white/5 leading-relaxed select-text">
                {isMdFile && mdViewMode === 'rendered' ? (
                  renderMarkdown(activeFile.content || '')
                ) : (
                  <pre className="font-mono text-xs text-[#cdd6f4] whitespace-pre-wrap">{activeFile.content}</pre>
                )}
              </div>

              <div className="text-[10px] text-[#a6adc8] flex items-center justify-between border-t border-[#313244] pt-2 font-mono">
                <span>File Path: {activeFile.path}</span>
                <span>Mode: {mdViewMode === 'rendered' ? 'Markdown Rendered' : 'Raw Text Source'} ({activeFile.content?.length || 0} bytes)</span>
              </div>
            </div>
          ) : (
            /* Directory Files List */
            <div className="flex-1 overflow-y-auto pr-1">
              {filteredChildren.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-2 text-[#585b70]">
                  <Folder className="w-10 h-10 opacity-40" />
                  <p className="text-xs italic">Folder is empty</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {filteredChildren.map((node) => (
                    <div
                      key={node.path}
                      onClick={() => handleItemClick(node)}
                      className="p-3 rounded-xl flex flex-col items-center justify-center space-y-1.5 text-center transition cursor-pointer border select-none group bg-white/5 border-transparent hover:bg-white/10 hover:border-[#cba6f7]/40"
                    >
                      <div className="transform group-hover:scale-110 transition duration-150">
                        {getFileIcon(node, 'large')}
                      </div>
                      <span className="text-xs font-medium truncate max-w-full drop-shadow-sm">
                        {node.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1 text-xs">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a6adc8] border-b border-[#313244]">
                    <span className="col-span-6">Name</span>
                    <span className="col-span-3">Type</span>
                    <span className="col-span-3 text-right">Size</span>
                  </div>

                  {/* Table Rows */}
                  {filteredChildren.map((node) => (
                    <div
                      key={node.path}
                      onClick={() => handleItemClick(node)}
                      className="grid grid-cols-12 px-3 py-2 rounded-lg items-center transition cursor-pointer hover:bg-white/10 text-[#cdd6f4]"
                    >
                      <div className="col-span-6 flex items-center space-x-2.5 truncate">
                        {getFileIcon(node, 'normal')}
                        <span className="truncate font-medium">{node.name}</span>
                      </div>
                      <span className="col-span-3 text-[11px] text-[#a6adc8] capitalize">{node.type}</span>
                      <span className="col-span-3 text-right font-mono text-[11px] text-[#a6adc8]">
                        {node.type === 'folder' ? '--' : `${node.content?.length || 0} B`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Explorer Status Bar */}
          {!activeFile && (
            <div className="border-t border-[#313244] pt-2 mt-2 px-2 flex items-center justify-between text-[11px] text-[#a6adc8]">
              <span>{filteredChildren.length} items</span>
              <span className="font-mono">{currentFolder.path}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
