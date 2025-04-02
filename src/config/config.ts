interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  website?: string;
}

interface TerminalConfig {
  title: string;
  name: string;
  ps1_username: string;
  ps1_hostname: string;
  ascii: string;
  social: SocialLinks;
  resume_url?: string;
  colors: {
    light: {
      background: string;
      foreground: string;
      yellow: string;
      green: string;
      gray: string;
      blue: string;
      red: string;
    };
    dark: {
      background: string;
      foreground: string;
      yellow: string;
      green: string;
      gray: string;
      blue: string;
      red: string;
    };
  };
}

const config: TerminalConfig = {
  title: 'Vincent Wu | Home',
  name: 'Vincent Wu',
  ps1_username: 'guest',
  ps1_hostname: 'cveinnt.com',
  ascii: `
 ██████╗██╗   ██╗███████╗██╗███╗   ██╗███╗   ██╗████████╗
██╔════╝██║   ██║██╔════╝██║████╗  ██║████╗  ██║╚══██╔══╝
██║     ██║   ██║█████╗  ██║██╔██╗ ██║██╔██╗ ██║   ██║
██║     ╚██╗ ██╔╝██╔══╝  ██║██║╚██╗██║██║╚██╗██║   ██║
╚██████╗ ╚████╔╝ ███████╗██║██║ ╚████║██║ ╚████║   ██║
 ╚═════╝  ╚═══╝  ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝   ╚═╝
`,
  social: {
    github: 'github.com/cveinnt',
    linkedin: 'linkedin.com/in/wensenwu',
    email: 'contact@wensenwu.com',
    website: 'wensenwu.com',
  },
  resume_url: 'https://wensenwu.com/resume',
  colors: {
    light: {
      background: '#fbf3c4',
      foreground: '#69582a',
      yellow: '#a19878',
      green: '#7c7564',
      gray: '#d1c79f',
      blue: '#848464',
      red: '#b8b097',
    },
    dark: {
      background: '#292c26',
      foreground: '#fbfbfb',
      yellow: '#989997',
      green: '#8b6968',
      gray: '#ced9d4',
      blue: '#728492',
      red: '#d7d0a6',
    },
  },
};

export default config;
