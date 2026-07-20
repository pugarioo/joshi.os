import { AI_SYSTEM_PROMPT } from '../data/aiSystemPrompt';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function* streamOpenRouterChat(messages: { sender: 'user' | 'bot'; text: string }[]) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'openrouter/auto';

  // Fallback if no API key is configured
  if (!apiKey) {
    yield "OpenRouter API key is not set in `.env.local`. Please add `VITE_OPENROUTER_API_KEY=your_key` to activate live OpenRouter AI responses!";
    return;
  }

  const payloadMessages: ChatMessage[] = [
    { role: 'system', content: AI_SYSTEM_PROMPT.trim() },
    ...messages.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    })),
  ];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://github.com/pugarioo/joshi.os',
        'X-Title': 'Joshi OS Portfolio',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: payloadMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || response.statusText || 'Failed to communicate with OpenRouter';
      yield `[OpenRouter Error]: ${errMsg}`;
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      yield '[Error]: No response stream returned.';
      return;
    }

    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;
        if (trimmed === 'data: [DONE]') return;

        if (trimmed.startsWith('data: ')) {
          try {
            const data = JSON.parse(trimmed.slice(6));
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch {
            // Ignore partial line JSON errors
          }
        }
      }
    }
  } catch (error: any) {
    yield `[Network Error]: Unable to connect to OpenRouter (${error?.message || 'Offline'}).`;
  }
}
