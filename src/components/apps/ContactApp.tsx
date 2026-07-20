import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../../data/portfolioData';
import { sendEmail } from '../../services/email';
import { 
  Send, 
  CheckCircle2, 
  Check,
  AtSign,
  RefreshCw,
  Mail,
  Loader2
} from 'lucide-react';

const SocialIcons = {
  LinkedIn: () => (
    <svg className="w-3.5 h-3.5 fill-current text-[#89b4fa]" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.65 1.65 0 0 0-1.66 1.65c0 .9.74 1.65 1.66 1.65.91 0 1.65-.75 1.65-1.65C9.5 7.44 8.77 6.7 7.86 6.7Z" />
    </svg>
  ),
  Facebook: () => (
    <svg className="w-3.5 h-3.5 fill-current text-[#89b4fa]" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.73 5.6c1.07 0 2.19.19 2.19.19v2.41h-1.23c-1.23 0-1.61.77-1.61 1.56V12h2.72l-.43 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8Z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-3.5 h-3.5 fill-current text-[#f38ba8]" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  GitHub: () => (
    <svg className="w-3.5 h-3.5 fill-current text-[#cba6f7]" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ),
};

export const ContactApp: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    setSending(true);
    try {
      await sendEmail({
        name: senderName,
        email: senderEmail,
        subject,
        message,
      });
      setIsSent(true);
    } catch {
      console.error('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSenderName('');
    setSenderEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col justify-between text-[#cdd6f4] select-none w-full overflow-hidden bg-transparent">
      {/* Seamless Uniform Glass Header Bar */}
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#cba6f7] text-[#11111b] flex items-center justify-center font-bold text-xs shadow-sm">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-bold text-white">Send Message</h2>
        </div>

        <button
          onClick={handleCopyEmail}
          className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer text-[#89b4fa] border border-[#89b4fa]/30"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#a6e3a1]" /> : <AtSign className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : DEVELOPER_INFO.email}</span>
        </button>
      </div>

      {/* Main Glass Content Canvas */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-transparent">
        {isSent ? (
          /* Sent Confirmation Receipt */
          <div className="m-auto p-8 text-center space-y-5 max-w-sm">
            {/* Animated checkmark */}
            <div className="w-16 h-16 rounded-full bg-[#a6e3a1]/20 border border-[#a6e3a1]/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#a6e3a1]" />
            </div>

            {/* Title */}
            <div>
              <h3 className="text-base font-bold text-white mb-1">Message Sent</h3>
              <p className="text-xs text-[#a6adc8]">
                Thanks for reaching out!
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#a6adc8]">To</span>
                <span className="text-[#89b4fa] font-medium">{DEVELOPER_INFO.email}</span>
              </div>
              {subject && (
                <div className="flex justify-between">
                  <span className="text-[#a6adc8]">Subject</span>
                  <span className="text-[#cdd6f4] font-medium truncate ml-4">{subject}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#a6adc8]">From</span>
                <span className="text-[#cdd6f4] font-medium">{senderName}</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-[#6c7086] text-[11px]">A confirmation email has been sent to <span className="text-[#a6adc8]">{senderEmail}</span></p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSent(false);
                handleReset();
              }}
              className="px-4 py-2 bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] font-bold rounded-xl text-xs transition cursor-pointer flex items-center space-x-1.5 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
          /* Edge-to-Edge Uniform Glass Form */
          <form onSubmit={handleSendEmail} className="flex-1 flex flex-col justify-between overflow-hidden bg-transparent">
            <div className="divide-y divide-white/10 text-xs flex-1 flex flex-col">
              {/* To Field */}
              <div className="px-4 py-2.5 flex items-center shrink-0 bg-transparent">
                <span className="text-[#a6adc8] w-14 font-semibold text-xs">To:</span>
                <span className="font-mono text-[#89b4fa] bg-[#89b4fa]/15 border border-[#89b4fa]/30 px-2.5 py-0.5 rounded-full font-bold text-xs">
                  {DEVELOPER_INFO.name} &lt;{DEVELOPER_INFO.email}&gt;
                </span>
              </div>

              {/* From Name Field */}
              <div className="px-4 py-2.5 flex items-center shrink-0 bg-transparent">
                <span className="text-[#a6adc8] w-14 font-semibold text-xs">From:</span>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name / Organization"
                  className="w-full bg-transparent text-white focus:outline-none text-xs font-medium placeholder-[#a6adc8]"
                />
              </div>

              {/* Sender Email Field */}
              <div className="px-4 py-2.5 flex items-center shrink-0 bg-transparent">
                <span className="text-[#a6adc8] w-14 font-semibold text-xs">Email:</span>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-transparent text-white focus:outline-none text-xs font-medium placeholder-[#a6adc8]"
                />
              </div>

              {/* Subject Line Field */}
              <div className="px-4 py-2.5 flex items-center shrink-0 bg-transparent">
                <span className="text-[#a6adc8] w-14 font-semibold text-xs">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project inquiry / Collaboration request..."
                  className="w-full bg-transparent text-white font-medium focus:outline-none text-xs placeholder-[#a6adc8]"
                />
              </div>

              {/* Message Body Textarea */}
              <div className="p-4 flex-1 flex flex-col overflow-hidden bg-transparent">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your email message here..."
                  className="w-full flex-1 bg-transparent text-[#cdd6f4] focus:outline-none text-xs resize-none leading-relaxed font-sans placeholder-[#a6adc8] overflow-y-auto"
                />
              </div>
            </div>

            {/* Seamless Uniform Glass Action Footer Toolbar with Socials */}
            <div className="px-4 py-2.5 bg-white/[0.03] border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                type="submit"
                disabled={sending}
                className="bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={DEVELOPER_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition"
                  title="LinkedIn"
                >
                  <SocialIcons.LinkedIn />
                </a>
                <a
                  href={DEVELOPER_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition"
                  title="Facebook"
                >
                  <SocialIcons.Facebook />
                </a>
                <a
                  href={DEVELOPER_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition"
                  title="Instagram"
                >
                  <SocialIcons.Instagram />
                </a>
                <a
                  href={DEVELOPER_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition"
                  title="GitHub"
                >
                  <SocialIcons.GitHub />
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
