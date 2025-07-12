import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { ThemeToggle } from './ThemeToggle';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Moon: ({ size }: { size: number }) => <div data-testid="moon-icon" data-size={size}>🌙</div>,
  Sun: ({ size }: { size: number }) => <div data-testid="sun-icon" data-size={size}>☀️</div>
}));

describe('ThemeToggle', () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders Moon icon when isDark is false', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('renders Sun icon when isDark is true', () => {
    render(<ThemeToggle isDark={true} onToggle={mockOnToggle} />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label for light theme', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
  });

  it('has correct aria-label for dark theme', () => {
    render(<ThemeToggle isDark={true} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  it('applies light theme classes when isDark is false', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200', 'hover:bg-gray-300', 'text-gray-800');
    expect(button).not.toHaveClass('bg-gray-700', 'hover:bg-gray-600', 'text-yellow-400');
  });

  it('applies dark theme classes when isDark is true', () => {
    render(<ThemeToggle isDark={true} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-700', 'hover:bg-gray-600', 'text-yellow-400');
    expect(button).not.toHaveClass('bg-gray-200', 'hover:bg-gray-300', 'text-gray-800');
  });

  it('has correct base styling classes', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-3', 'rounded-full', 'transition-all', 'duration-300');
  });

  it('has correct focus styling classes', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500');
  });

  it('passes correct size prop to icons', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const moonIcon = screen.getByTestId('moon-icon');
    expect(moonIcon).toHaveAttribute('data-size', '20');
  });

  it('handles multiple clicks correctly', () => {
    render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(3);
  });

  it('updates icon when theme changes', () => {
    const { rerender } = render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    
    // Initially shows moon icon
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
    
    // After theme change, shows sun icon
    rerender(<ThemeToggle isDark={true} onToggle={mockOnToggle} />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('updates aria-label when theme changes', () => {
    const { rerender } = render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
    
    rerender(<ThemeToggle isDark={true} onToggle={mockOnToggle} />);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  it('updates styling classes when theme changes', () => {
    const { rerender } = render(<ThemeToggle isDark={false} onToggle={mockOnToggle} />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200', 'text-gray-800');
    expect(button).not.toHaveClass('bg-gray-700', 'text-yellow-400');
    
    rerender(<ThemeToggle isDark={true} onToggle={mockOnToggle} />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-700', 'text-yellow-400');
    expect(button).not.toHaveClass('bg-gray-200', 'text-gray-800');
  });
}); 