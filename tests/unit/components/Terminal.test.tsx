import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Terminal from '@/components/Terminal';
import * as useTerminalHook from '@/hooks/useTerminal';

describe('Terminal', () => {
  it('renders terminal traffic lights and correct path', () => {
    vi.spyOn(useTerminalHook, 'useTerminal').mockReturnValue([]);
    
    render(<Terminal />);
    expect(screen.getByText('~/dev/zealsync/backend')).toBeInTheDocument();
  });

  it('renders correctly with given lines', () => {
    vi.spyOn(useTerminalHook, 'useTerminal').mockReturnValue([
      { type: 'cmd', text: 'npm run backend', partial: 'npm run backend', done: true },
      { type: 'ok', text: 'Starting server...', done: true },
      { type: 'err', text: 'Failed task', done: true }
    ]);
    
    render(<Terminal />);
    expect(screen.getByText('npm run backend')).toBeInTheDocument();
    expect(screen.getByText('Starting server...')).toBeInTheDocument();
    expect(screen.getByText('Failed task')).toBeInTheDocument();
  });
});
