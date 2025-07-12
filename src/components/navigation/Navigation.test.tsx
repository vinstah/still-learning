import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { Navigation } from './Navigation';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Home: ({ size }: { size: number }) => <div data-testid="home-icon" data-size={size}>🏠</div>,
  GraduationCap: ({ size }: { size: number }) => <div data-testid="graduation-cap-icon" data-size={size}>🎓</div>,
  BookOpen: ({ size }: { size: number }) => <div data-testid="book-open-icon" data-size={size}>📖</div>,
  Trophy: ({ size }: { size: number }) => <div data-testid="trophy-icon" data-size={size}>🏆</div>,
  BarChart3: ({ size }: { size: number }) => <div data-testid="bar-chart-icon" data-size={size}>📊</div>,
  Users: ({ size }: { size: number }) => <div data-testid="users-icon" data-size={size}>👥</div>,
  Settings: ({ size }: { size: number }) => <div data-testid="settings-icon" data-size={size}>⚙️</div>
}));

describe('Navigation', () => {
  const mockOnViewChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all navigation buttons', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Lessons')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('Badges')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Teacher')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders all navigation icons', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('graduation-cap-icon')).toBeInTheDocument();
    expect(screen.getByTestId('book-open-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart-icon')).toBeInTheDocument();
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });

  it('calls onViewChange when navigation buttons are clicked', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    fireEvent.click(screen.getByText('Lessons'));
    expect(mockOnViewChange).toHaveBeenCalledWith('lessons');
    
    fireEvent.click(screen.getByText('Quiz'));
    expect(mockOnViewChange).toHaveBeenCalledWith('quiz');
    
    fireEvent.click(screen.getByText('Badges'));
    expect(mockOnViewChange).toHaveBeenCalledWith('badges');
    
    fireEvent.click(screen.getByText('Progress'));
    expect(mockOnViewChange).toHaveBeenCalledWith('dashboard');
    
    fireEvent.click(screen.getByText('Teacher'));
    expect(mockOnViewChange).toHaveBeenCalledWith('teacher');
    
    fireEvent.click(screen.getByText('Settings'));
    expect(mockOnViewChange).toHaveBeenCalledWith('settings');
  });

  it('applies active state to current view', () => {
    render(<Navigation currentView="quiz" isDark={false} onViewChange={mockOnViewChange} />);
    
    const quizButton = screen.getByText('Quiz').closest('button');
    expect(quizButton).toHaveClass('text-primary-500');
  });

  it('applies inactive state to non-current views', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const lessonsButton = screen.getByText('Lessons').closest('button');
    expect(lessonsButton).toHaveClass('text-gray-600');
    expect(lessonsButton).not.toHaveClass('text-primary-500');
  });

  it('applies dark theme classes when isDark is true', () => {
    render(<Navigation currentView="home" isDark={true} onViewChange={mockOnViewChange} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-gray-800', 'border-gray-700');
    expect(nav).not.toHaveClass('bg-white', 'border-gray-200');
  });

  it('applies light theme classes when isDark is false', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-white', 'border-gray-200');
    expect(nav).not.toHaveClass('bg-gray-800', 'border-gray-700');
  });

  it('applies dark theme hover states for inactive buttons', () => {
    render(<Navigation currentView="home" isDark={true} onViewChange={mockOnViewChange} />);
    
    const lessonsButton = screen.getByText('Lessons').closest('button');
    expect(lessonsButton).toHaveClass('text-gray-400', 'hover:text-white');
  });

  it('applies light theme hover states for inactive buttons', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const lessonsButton = screen.getByText('Lessons').closest('button');
    expect(lessonsButton).toHaveClass('text-gray-600', 'hover:text-gray-900');
  });

  it('has correct base styling classes', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0', 'p-4', 'border-t', 'backdrop-blur-sm');
  });

  it('has correct button styling classes', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const homeButton = screen.getByText('Home').closest('button');
    expect(homeButton).toHaveClass('flex', 'flex-col', 'items-center', 'space-y-1', 'p-2', 'rounded-lg', 'transition-colors');
  });

  it('has correct icon sizes', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    // Primary navigation icons should be size 20
    expect(screen.getByTestId('home-icon')).toHaveAttribute('data-size', '20');
    expect(screen.getByTestId('graduation-cap-icon')).toHaveAttribute('data-size', '20');
    expect(screen.getByTestId('book-open-icon')).toHaveAttribute('data-size', '20');
    expect(screen.getByTestId('trophy-icon')).toHaveAttribute('data-size', '20');
    expect(screen.getByTestId('bar-chart-icon')).toHaveAttribute('data-size', '20');
    
    // Secondary navigation icons should be size 16
    expect(screen.getByTestId('users-icon')).toHaveAttribute('data-size', '16');
    expect(screen.getByTestId('settings-icon')).toHaveAttribute('data-size', '16');
  });

  it('has correct text sizes', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const textElements = screen.getAllByText(/Home|Lessons|Quiz|Badges|Progress|Teacher|Settings/);
    textElements.forEach(element => {
      expect(element).toHaveClass('text-xs');
    });
  });

  it('handles multiple clicks correctly', () => {
    render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    const lessonsButton = screen.getByText('Lessons');
    
    fireEvent.click(lessonsButton);
    fireEvent.click(lessonsButton);
    fireEvent.click(lessonsButton);
    
    expect(mockOnViewChange).toHaveBeenCalledTimes(3);
    expect(mockOnViewChange).toHaveBeenCalledWith('lessons');
  });

  it('updates active state when currentView changes', () => {
    const { rerender } = render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    // Initially home is active
    let homeButton = screen.getByText('Home').closest('button');
    let lessonsButton = screen.getByText('Lessons').closest('button');
    expect(homeButton).toHaveClass('text-primary-500');
    expect(lessonsButton).toHaveClass('text-gray-600');
    
    // Change to lessons
    rerender(<Navigation currentView="lessons" isDark={false} onViewChange={mockOnViewChange} />);
    homeButton = screen.getByText('Home').closest('button');
    lessonsButton = screen.getByText('Lessons').closest('button');
    expect(lessonsButton).toHaveClass('text-primary-500');
    expect(homeButton).toHaveClass('text-gray-600');
  });

  it('updates theme classes when isDark changes', () => {
    const { rerender } = render(<Navigation currentView="home" isDark={false} onViewChange={mockOnViewChange} />);
    
    let nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-white', 'border-gray-200');
    
    rerender(<Navigation currentView="home" isDark={true} onViewChange={mockOnViewChange} />);
    nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-gray-800', 'border-gray-700');
  });
}); 