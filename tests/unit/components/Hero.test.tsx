import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Hero from '@/components/Hero';

// Mock Terminal to avoid triggering its useTerminal timer logic during Hero tests
vi.mock('@/components/Terminal', () => ({
  default: () => <div data-testid="mock-terminal">Mock Terminal</div>
}));

describe('Hero Component AB Test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders HeroVariantA when local storage has A', () => {
    localStorage.setItem('hero_ab_variant', 'A');
    render(<Hero />);
    expect(screen.getByText('Available for roles · Nairobi, Kenya')).toBeInTheDocument();
  });

  it('renders HeroVariantB when local storage has B', () => {
    localStorage.setItem('hero_ab_variant', 'B');
    render(<Hero />);
    expect(screen.getByText('System Architect & Backend Software Engineer')).toBeInTheDocument();
  });

  it('toggles variant when clicking the test indicator', () => {
    localStorage.setItem('hero_ab_variant', 'A');
    render(<Hero />);

    // Toggle
    const toggle = screen.getByTitle('Click to toggle variant');
    fireEvent.click(toggle);
    expect(localStorage.getItem('hero_ab_variant')).toBe('B');
  });
});
