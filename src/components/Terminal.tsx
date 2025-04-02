import React, { useState, useEffect, useRef } from 'react';
import { runCommand, CommandOutput } from '@/lib/commands';
import config from '@/config/config';

interface TerminalLine {
  input?: string;
  output?: CommandOutput;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatically show introduction and help when the component mounts
  useEffect(() => {
    setLines([
      {
        output: (
          <>
            <pre className="text-light-yellow dark:text-dark-yellow font-mono">{config.ascii}</pre>
            <p>Type 'help' to see the list of available commands.</p>
            <p>Type 'sumfetch' to display summary.</p>
            <p>
              Type 'gui' or click{' '}
              <a
                className="text-light-blue dark:text-dark-blue underline"
                href="https://wensenwu.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>{' '}
              for a simpler version.
            </p>
          </>
        ),
      },
    ]);
  }, []);

  // Keep focus on the input
  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  // Scroll to bottom when content changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Handle command execution
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add the command to history
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    // Execute the command
    const newLine: TerminalLine = {
      input,
      output: runCommand(input.trim().toLowerCase()),
    };

    // Special case for clear command
    if (input.trim().toLowerCase() === 'clear') {
      setLines([]);
    } else {
      setLines(prev => [...prev, newLine]);
    }

    // Reset input
    setInput('');
  };

  // Handle keyboard navigation through history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // TODO: Implement command auto-completion
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground h-screen w-full p-2 overflow-hidden"
    >
      <div
        className="border-2 rounded border-light-yellow dark:border-dark-yellow p-4 h-full overflow-hidden"
      >
        <div
          ref={containerRef}
          className="h-full overflow-y-auto pb-2 font-mono"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, index) => (
            <div key={index} className="mb-2">
              {line.input && (
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-light-yellow dark:text-dark-yellow">{config.ps1_username}</span>
                    <span className="text-light-gray dark:text-dark-gray">@</span>
                    <span className="text-light-green dark:text-dark-green">{config.ps1_hostname}</span>
                    <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
                  </div>
                  <div className="flex-grow pl-1">{line.input}</div>
                </div>
              )}
              {line.output && (
                <div className="mt-1 whitespace-pre-wrap">
                  {typeof line.output === 'function'
                    ? line.output()
                    : line.output
                  }
                </div>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex">
            <div className="flex-shrink-0">
              <span className="text-light-yellow dark:text-dark-yellow">{config.ps1_username}</span>
              <span className="text-light-gray dark:text-dark-gray">@</span>
              <span className="text-light-green dark:text-dark-green">{config.ps1_hostname}</span>
              <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
            </div>
            <input
              ref={inputRef}
              type="text"
              className="flex-grow bg-transparent border-none outline-none pl-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
