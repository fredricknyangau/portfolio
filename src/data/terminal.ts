export type TerminalLineType = 'cmd' | 'out' | 'ok' | 'dim' | 'err' | 'blank' | 'prompt' | 'http' | 'json';

export interface TerminalLine {
  type: TerminalLineType;
  text?: string;
}

export const terminalLines: TerminalLine[] = [
  { type: 'cmd',   text: 'git log --oneline -3' },
  { type: 'out',   text: 'a4f82c1 feat: add JWT refresh token rotation' },
  { type: 'out',   text: '9d3b7e0 fix: pagination off-by-one in task query' },
  { type: 'out',   text: '2c1a9f4 test: 84% coverage on auth endpoints' },
  { type: 'blank' },
  { type: 'cmd',   text: 'uvicorn app.main:app --reload' },
  { type: 'ok',    text: 'INFO:     FastAPI running on http://0.0.0.0:8080' },
  { type: 'ok',    text: 'INFO:     Application startup complete.' },
  { type: 'blank' },
  { type: 'cmd',   text: 'curl -s :8080/api/v1/engineer/profile' },
  { type: 'http',  text: '200 OK  ·  application/json  ·  28ms' },
  { type: 'json',  text: '{' },
  { type: 'json',  text: '  "name": "Fredrick Nyang\'au",' },
  { type: 'json',  text: '  "role": "Junior Backend Engineer",' },
  { type: 'json',  text: '  "stack": ["FastAPI", "PostgreSQL", "Docker"],' },
  { type: 'json',  text: '  "location": "Nairobi, Kenya",' },
  { type: 'json',  text: '  "deployed": 3,' },
  { type: 'json',  text: '  "available": true' },
  { type: 'json',  text: '}' },
  { type: 'blank' },
  { type: 'prompt' },
];
