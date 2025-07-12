import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { AppHeader } from './AppHeader';

// Mock the ThemeToggle component
vi.mock('../ThemeToggle', () => ({
  ThemeToggle: ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
    <button 
      data-testid="theme-toggle" 
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}));

describe('AppHeader', () => {
  const mockOnThemeToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the app title', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByText('Still App')).toBeInTheDocument();
  });

  it('renders the title as an h1 element', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders ThemeToggle component', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('applies light theme classes when isDark is false', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const title = screen.getByText('Still App');
    expect(title).toHaveClass('text-gray-900');
    expect(title).not.toHaveClass('text-white');
  });

  it('applies dark theme classes when isDark is true', () => {
    render(<AppHeader isDark={true} onThemeToggle={mockOnThemeToggle} />);
    const title = screen.getByText('Still App');
    expect(title).toHaveClass('text-white');
    expect(title).not.toHaveClass('text-gray-900');
  });

  it('passes isDark prop to ThemeToggle', () => {
    render(<AppHeader isDark={true} onThemeToggle={mockOnThemeToggle} />);
    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('passes onThemeToggle prop to ThemeToggle', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const themeToggle = screen.getByTestId('theme-toggle');
    
    fireEvent.click(themeToggle);
    expect(mockOnThemeToggle).toHaveBeenCalledTimes(1);
  });

  it('has correct layout classes', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('flex', 'justify-between', 'items-center', 'mb-8');
  });

  it('has correct title styling classes', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const title = screen.getByText('Still App');
    expect(title).toHaveClass('text-2xl', 'font-bold');
  });

  it('has correct container styling for theme toggle', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const themeToggleContainer = screen.getByTestId('theme-toggle').parentElement;
    expect(themeToggleContainer).toHaveClass('flex', 'items-center', 'space-x-4');
  });

  it('handles theme toggle click correctly', () => {
    render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    const themeToggle = screen.getByTestId('theme-toggle');
    
    fireEvent.click(themeToggle);
    expect(mockOnThemeToggle).toHaveBeenCalledTimes(1);
    
    fireEvent.click(themeToggle);
    expect(mockOnThemeToggle).toHaveBeenCalledTimes(2);
  });

  it('updates theme toggle aria-label based on theme', () => {
    const { rerender } = render(<AppHeader isDark={false} onThemeToggle={mockOnThemeToggle} />);
    let themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark mode');

    rerender(<AppHeader isDark={true} onThemeToggle={mockOnThemeToggle} />);
    themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toHaveAttribute('aria-label', 'Switch to light mode');
  });
}); 