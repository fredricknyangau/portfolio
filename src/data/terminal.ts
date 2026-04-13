export type TerminalLineType = 'cmd' | 'out' | 'ok' | 'dim' | 'err' | 'blank' | 'prompt';

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
  { type: 'ok',    text: 'INFO:     FastAPI running on http://0.0.0.0:8000' },
  { type: 'ok',    text: 'INFO:     Application startup complete.' },
  { type: 'blank' },
  { type: 'cmd',   text: 'pytest tests/ -v --tb=short' },
  { type: 'out',   text: 'collected 47 items' },
  { type: 'ok',    text: '....................................47 passed in 2.31s' },
  { type: 'dim',   text: 'Coverage: 84%  ·  Branch: 79%' },
  { type: 'blank' },
  { type: 'prompt' },
];
