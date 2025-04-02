import config from '@/config/config';

export type CommandOutput = string | JSX.Element | (() => JSX.Element) | null;

export interface Command {
  command: string;
  description: string;
  usage?: string;
  output: CommandOutput;
}

export const getWhatIsCommand = (): Command => ({
  command: 'what\'s-cveinnt?',
  description: 'What is cveinnt?',
  output: (
    <div>
      <p>When I was 8, I was fascinated with cryptopgraphy and loved playing with ciphers.</p>
      <p className="mt-1">
        <code>cveinnt</code> is the result of passing <code>vincent</code> to the Enigma machine under a simple setting.
      </p>
      <p className="mt-1">As shown, each character is shifted by its one-based index in the word, i.e.:</p>
    </div>
  ),
});

export const commands: Command[] = [
  {
    command: 'help',
    description: 'List all available commands',
    output: (
      <div>
        <p>Available commands:</p>
        <ul className="ml-4 list-disc">
          {[
            { command: 'help', description: 'Show this help message' },
            { command: 'about', description: 'About me' },
            { command: 'clear', description: 'Clear the terminal' },
            { command: 'sumfetch', description: 'Display summary' },
            { command: 'gui', description: 'Go to GUI version of the website' },
            { command: 'what\'s-cveinnt?', description: 'What is cveinnt?' },
          ].map(({ command, description }) => (
            <li key={command}>
              <span className="text-light-yellow dark:text-dark-yellow">{command}</span> - {description}
            </li>
          ))}
        </ul>
        <p className="mt-2">
          [tab]: trigger completion.
          <br />
          [ctrl+l]/clear: clear terminal.
          <br />
          Type any command above, or use the GUI version{' '}
          <a
            className="text-light-blue dark:text-dark-blue underline"
            href="https://wensenwu.com"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    command: 'about',
    description: 'About me',
    output: (
      <div>
        <p>Hi, I'm {config.name}!</p>
        <p className="mt-1">
          I'm a software engineer and researcher with interests in systems, programming languages, and AI.
        </p>
      </div>
    ),
  },
  {
    command: 'sumfetch',
    description: 'Display a summary',
    output: (
      <div>
        <div className="whitespace-pre font-mono">
          {`
@@@@@@@@@@@@@       sumfetch: summary display
@@@@@@@@@@@@@@@@@@  -----------
@@@@@@@@@@@@@@      ABOUT
@@@@             ●  ${config.name}
@@@ @@           ○  ${config.ps1_hostname}
@@@  @@          ●  resume
@@@   @@        ■  alt_website
@@@@  @@@       -----------
@@@@@@@@@@@@    CONTACT
@@@      @@@    ●  ${config.social.email}
@@@       @@@   ○  ${config.social.github}
@@@       @@@   ■  ${config.social.linkedin}
@@@               -----------
                DONATE
                ₿ https://paypal.me/cveinnt
                $ https://patreon.com/cveinnt`}
        </div>
      </div>
    ),
  },
  getWhatIsCommand(),
  {
    command: 'gui',
    description: 'Go to GUI version',
    output: () => {
      window.open('https://wensenwu.com', '_blank');
      return 'Opening GUI version...';
    },
  },
  {
    command: 'clear',
    description: 'Clear the terminal',
    output: null,
  },
];

export const getCommand = (command: string): Command | undefined => {
  return commands.find((c) => c.command === command);
};

export const runCommand = (command: string): CommandOutput => {
  const foundCommand = getCommand(command);
  if (!foundCommand) {
    return `Command not found: ${command}. Type 'help' to see available commands.`;
  }

  return foundCommand.output;
};
