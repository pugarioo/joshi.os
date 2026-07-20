import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { WindowFrame } from './WindowFrame';
import { ProfileApp } from '../apps/ProfileApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { ShowcaseApp } from '../apps/ShowcaseApp';

import { TerminalApp } from '../apps/TerminalApp';
import { FileExplorerApp } from '../apps/FileExplorerApp';
import { ChatbotApp } from '../apps/ChatbotApp';
import { SettingsApp } from '../apps/SettingsApp';
import { ContactApp } from '../apps/ContactApp';
import { NetworkInfoApp } from '../apps/NetworkInfoApp';
import type { AppId } from '../../types/os';

export const WindowManager: React.FC = () => {
  const { windows } = useOSStore();

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'profile':
        return <ProfileApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'showcase':
        return <ShowcaseApp />;

      case 'terminal':
        return <TerminalApp />;
      case 'files':
        return <FileExplorerApp />;
      case 'chatbot':
        return <ChatbotApp />;
      case 'settings':
        return <SettingsApp />;
      case 'contact':
        return <ContactApp />;
      case 'network-info':
        return <NetworkInfoApp />;
      default:
        return null;
    }
  };

  return (
    <>
      {(Object.keys(windows) as AppId[]).map((id) => (
        <WindowFrame key={id} id={id}>
          {renderAppContent(id)}
        </WindowFrame>
      ))}
    </>
  );
};
