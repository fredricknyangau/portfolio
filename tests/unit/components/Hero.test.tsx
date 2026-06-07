import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '@/components/Hero';

// Mock Terminal & ApiResponseCard to avoid side effects
vi.mock('@/components/Terminal', () => ({
  default: () => <div data-testid="mock-terminal">Mock Terminal</div>
}));
vi.mock('@/components/ApiResponseCard', () => ({
  default: () => <div data-testid="mock-api-response-card">Mock ApiResponseCard</div>
}));

describe('Hero Component', () => {
  it('renders name, role, and main CTA buttons', () => {
    render(<Hero />);
    
    // Check main text content
    expect(screen.getByText('Fredrick')).toBeInTheDocument();
    expect(screen.getByText("Nyang'au")).toBeInTheDocument();
    expect(screen.getByText('Junior Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Building production-ready APIs for Fintech and Agritech.')).toBeInTheDocument();
    
    // Check links
    const gitHubLink = screen.getByLabelText('GitHub profile');
    expect(gitHubLink).toBeInTheDocument();
    expect(gitHubLink).toHaveAttribute('href', 'https://github.com/fredricknyangau');

    const linkedInLink = screen.getByLabelText('LinkedIn profile');
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/fredricknyangau');

    const viewProjectsLink = screen.getByText('View Projects');
    expect(viewProjectsLink).toBeInTheDocument();
    expect(viewProjectsLink).toHaveAttribute('href', '#projects');
  });
});
