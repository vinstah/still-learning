import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { BadgeNotification } from './BadgeNotification';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Trophy: ({ size, className }: { size: number; className?: string }) => (
    <div data-testid="trophy-icon" data-size={size} className={className}>🏆</div>
  )
}));

describe('BadgeNotification', () => {
  const mockOnDismiss = vi.fn();
  const mockBadges = [
    {
      id: 'badge-1',
      type: 'achievement' as const,
      title: 'First Lesson',
      description: 'Completed your first lesson',
      earned: true,
      criteria: {
        type: 'lessons_completed',
        value: 1
      }
    },
    {
      id: 'badge-2',
      type: 'mastery' as const,
      title: 'Quiz Master',
      description: 'Scored 100% on a quiz',
      earned: true,
      criteria: {
        type: 'quiz_score',
        value: 100
      }
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing when badges are provided', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText('New Badge Earned!')).toBeInTheDocument();
  });

  it('does not render when no badges are provided', () => {
    render(<BadgeNotification badges={[]} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.queryByText('New Badge Earned!')).not.toBeInTheDocument();
  });

  it('displays the first badge information', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText('First Lesson: Completed your first lesson')).toBeInTheDocument();
  });

  it('renders the trophy icon', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const dismissButton = screen.getByText('Dismiss');
    fireEvent.click(dismissButton);
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies light theme classes when isDark is false', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const container = screen.getByText('New Badge Earned!').closest('.bg-white');
    expect(container).toHaveClass('bg-white', 'text-gray-900');
    expect(container).not.toHaveClass('bg-gray-800', 'text-white');
  });

  it('applies dark theme classes when isDark is true', () => {
    render(<BadgeNotification badges={mockBadges} isDark={true} onDismiss={mockOnDismiss} />);
    
    const container = screen.getByText('New Badge Earned!').closest('.bg-gray-800');
    expect(container).toHaveClass('bg-gray-800', 'text-white');
    expect(container).not.toHaveClass('bg-white', 'text-gray-900');
  });

  it('has correct base styling classes', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const container = screen.getByText('New Badge Earned!').closest('.fixed');
    const notification = screen.getByText('New Badge Earned!').closest('.p-4');
    
    expect(container).toHaveClass('fixed', 'top-4', 'right-4', 'z-50');
    expect(notification).toHaveClass('p-4', 'rounded-lg', 'shadow-lg', 'border-l-4', 'border-yellow-500', 'max-w-sm');
  });

  it('has correct icon styling', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const trophyIcon = screen.getByTestId('trophy-icon');
    expect(trophyIcon).toHaveClass('text-yellow-500');
    expect(trophyIcon).toHaveAttribute('data-size', '20');
  });

  it('has correct text styling', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const title = screen.getByText('New Badge Earned!');
    const description = screen.getByText('First Lesson: Completed your first lesson');
    const dismissButton = screen.getByText('Dismiss');
    
    expect(title).toHaveClass('font-semibold');
    expect(description).toHaveClass('text-sm', 'opacity-75');
    expect(dismissButton).toHaveClass('text-xs', 'text-primary-500', 'hover:text-primary-600');
  });

  it('handles multiple badges but only shows the first one', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    expect(screen.getByText('First Lesson: Completed your first lesson')).toBeInTheDocument();
    expect(screen.queryByText('Quiz Master: Scored 100% on a quiz')).not.toBeInTheDocument();
  });

  it('handles badge with empty title and description', () => {
    const emptyBadges = [
      {
        id: 'badge-1',
        type: 'achievement' as const,
        title: '',
        description: '',
        earned: true,
        criteria: {
          type: 'lessons_completed',
          value: 1
        }
      }
    ];
    
    render(<BadgeNotification badges={emptyBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText(':')).toBeInTheDocument();
  });

  it('handles badge with very long title and description', () => {
    const longBadges = [
      {
        id: 'badge-1',
        type: 'achievement' as const,
        title: 'A'.repeat(100),
        description: 'B'.repeat(200),
        earned: true,
        criteria: {
          type: 'lessons_completed',
          value: 1
        }
      }
    ];
    
    render(<BadgeNotification badges={longBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText(`${'A'.repeat(100)}: ${'B'.repeat(200)}`)).toBeInTheDocument();
  });

  it('handles multiple dismiss clicks', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const dismissButton = screen.getByText('Dismiss');
    
    fireEvent.click(dismissButton);
    fireEvent.click(dismissButton);
    fireEvent.click(dismissButton);
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(3);
  });

  it('updates theme when isDark changes', () => {
    const { rerender } = render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    let container = screen.getByText('New Badge Earned!').closest('.bg-white');
    expect(container).toHaveClass('bg-white', 'text-gray-900');
    
    rerender(<BadgeNotification badges={mockBadges} isDark={true} onDismiss={mockOnDismiss} />);
    container = screen.getByText('New Badge Earned!').closest('.bg-gray-800');
    expect(container).toHaveClass('bg-gray-800', 'text-white');
  });

  it('has correct layout structure', () => {
    render(<BadgeNotification badges={mockBadges} isDark={false} onDismiss={mockOnDismiss} />);
    
    const container = screen.getByText('New Badge Earned!').closest('.fixed');
    const header = screen.getByText('New Badge Earned!').closest('.flex');
    
    expect(container).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'items-center', 'space-x-2', 'mb-2');
  });

  it('handles badge with special characters', () => {
    const specialBadges = [
      {
        id: 'badge-1',
        type: 'achievement' as const,
        title: 'Badge with @#$%^&*()',
        description: 'Description with émojis 🎉 and symbols!',
        earned: true,
        criteria: {
          type: 'lessons_completed',
          value: 1
        }
      }
    ];
    
    render(<BadgeNotification badges={specialBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText('Badge with @#$%^&*(): Description with émojis 🎉 and symbols!')).toBeInTheDocument();
  });

  it('handles badge with HTML-like content', () => {
    const htmlBadges = [
      {
        id: 'badge-1',
        type: 'achievement' as const,
        title: '<script>alert("xss")</script>',
        description: '<div>Description</div>',
        earned: true,
        criteria: {
          type: 'lessons_completed',
          value: 1
        }
      }
    ];
    
    render(<BadgeNotification badges={htmlBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText('<script>alert("xss")</script>: <div>Description</div>')).toBeInTheDocument();
  });

  it('handles badge with numbers and symbols', () => {
    const numberBadges = [
      {
        id: 'badge-1',
        type: 'achievement' as const,
        title: 'Badge 123',
        description: 'Score: 95.5%',
        earned: true,
        criteria: {
          type: 'lessons_completed',
          value: 1
        }
      }
    ];
    
    render(<BadgeNotification badges={numberBadges} isDark={false} onDismiss={mockOnDismiss} />);
    expect(screen.getByText('Badge 123: Score: 95.5%')).toBeInTheDocument();
  });
}); 