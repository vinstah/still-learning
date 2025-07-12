import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../test/test-utils';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('displays correct progress text', () => {
    render(<ProgressBar current={3} total={8} isDark={false} />);
    expect(screen.getByText('3/8')).toBeInTheDocument();
  });

  it('displays progress label', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('calculates correct percentage for 50% progress', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('calculates correct percentage for 100% progress', () => {
    render(<ProgressBar current={10} total={10} isDark={false} />);
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 100%');
  });

  it('calculates correct percentage for 0% progress', () => {
    render(<ProgressBar current={0} total={10} isDark={false} />);
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 0%');
  });

  it('applies light theme classes when isDark is false', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    
    const progressText = screen.getByText('Progress');
    const countText = screen.getByText('5/10');
    const backgroundBar = document.querySelector('.bg-gray-200');
    
    expect(progressText).toHaveClass('text-gray-700');
    expect(countText).toHaveClass('text-gray-700');
    expect(backgroundBar).toHaveClass('bg-gray-200');
  });

  it('applies dark theme classes when isDark is true', () => {
    render(<ProgressBar current={5} total={10} isDark={true} />);
    
    const progressText = screen.getByText('Progress');
    const countText = screen.getByText('5/10');
    const backgroundBar = document.querySelector('.bg-gray-700');
    
    expect(progressText).toHaveClass('text-gray-300');
    expect(countText).toHaveClass('text-gray-300');
    expect(backgroundBar).toHaveClass('bg-gray-700');
  });

  it('has correct base styling classes', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    
    const container = screen.getByText('Progress').closest('.w-full');
    const backgroundBar = document.querySelector('.bg-gray-200');
    const progressBar = document.querySelector('.bg-gradient-to-r');
    
    expect(container).toHaveClass('w-full');
    expect(backgroundBar).toHaveClass('w-full', 'h-3', 'rounded-full', 'overflow-hidden');
    expect(progressBar).toHaveClass('h-full', 'bg-gradient-to-r', 'from-primary-500', 'to-primary-600', 'transition-all', 'duration-300', 'ease-out');
  });

  it('handles zero total', () => {
    render(<ProgressBar current={0} total={0} isDark={false} />);
    expect(screen.getByText('0/0')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: NaN%');
  });

  it('handles negative values', () => {
    render(<ProgressBar current={-5} total={10} isDark={false} />);
    expect(screen.getByText('-5/10')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: -50%');
  });

  it('handles current greater than total', () => {
    render(<ProgressBar current={15} total={10} isDark={false} />);
    expect(screen.getByText('15/10')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 150%');
  });

  it('handles decimal values', () => {
    render(<ProgressBar current={3.5} total={7} isDark={false} />);
    expect(screen.getByText('3.5/7')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('handles very large numbers', () => {
    render(<ProgressBar current={1000000} total={2000000} isDark={false} />);
    expect(screen.getByText('1000000/2000000')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('handles very small numbers', () => {
    render(<ProgressBar current={0.1} total={0.5} isDark={false} />);
    expect(screen.getByText('0.1/0.5')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 20%');
  });

  it('updates progress when props change', () => {
    const { rerender } = render(<ProgressBar current={2} total={10} isDark={false} />);
    
    let progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 20%');
    
    rerender(<ProgressBar current={8} total={10} isDark={false} />);
    progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 80%');
  });

  it('updates theme when isDark changes', () => {
    const { rerender } = render(<ProgressBar current={5} total={10} isDark={false} />);
    
    let progressText = screen.getByText('Progress');
    let backgroundBar = document.querySelector('.bg-gray-200');
    expect(progressText).toHaveClass('text-gray-700');
    expect(backgroundBar).toHaveClass('bg-gray-200');
    
    rerender(<ProgressBar current={5} total={10} isDark={true} />);
    progressText = screen.getByText('Progress');
    backgroundBar = document.querySelector('.bg-gray-700');
    expect(progressText).toHaveClass('text-gray-300');
    expect(backgroundBar).toHaveClass('bg-gray-700');
  });

  it('has correct layout structure', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    
    const container = screen.getByText('Progress').closest('.w-full');
    const header = screen.getByText('Progress').closest('.flex');
    const backgroundBar = document.querySelector('.bg-gray-200');
    
    expect(container).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'justify-between', 'items-center', 'mb-2');
    expect(backgroundBar).toBeInTheDocument();
  });

  it('has correct text styling', () => {
    render(<ProgressBar current={5} total={10} isDark={false} />);
    
    const progressText = screen.getByText('Progress');
    const countText = screen.getByText('5/10');
    
    expect(progressText).toHaveClass('text-sm', 'font-medium');
    expect(countText).toHaveClass('text-sm');
  });

  it('handles edge case with very small total', () => {
    render(<ProgressBar current={1} total={0.001} isDark={false} />);
    expect(screen.getByText('1/0.001')).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle('width: 100000%');
  });

  it('handles edge case with very large total', () => {
    render(<ProgressBar current={1} total={Number.MAX_SAFE_INTEGER} isDark={false} />);
    expect(screen.getByText(`1/${Number.MAX_SAFE_INTEGER}`)).toBeInTheDocument();
    
    const progressBar = document.querySelector('.bg-gradient-to-r');
    expect(progressBar).not.toBeNull();
    expect(parseFloat((progressBar as HTMLElement).style.width)).toBeLessThan(1e-10);
  });
}); 