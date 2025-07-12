import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../test/test-utils';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByAltText('Avatar for John Doe')).toBeInTheDocument();
  });

  it('renders with correct name', () => {
    render(<Avatar name="Jane Smith" />);
    expect(screen.getByAltText('Avatar for Jane Smith')).toBeInTheDocument();
  });

  it('uses default size when not provided', () => {
    render(<Avatar name="Test User" />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveAttribute('width', '48');
    expect(img).toHaveAttribute('height', '48');
  });

  it('uses custom size when provided', () => {
    render(<Avatar name="Test User" size={120} />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveAttribute('width', '120');
    expect(img).toHaveAttribute('height', '120');
  });

  it('applies default styling classes', () => {
    render(<Avatar name="Test User" />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveClass('rounded-full', 'border-2', 'border-primary-300');
  });

  it('applies custom className when provided', () => {
    render(<Avatar name="Test User" className="custom-class" />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveClass('custom-class');
  });

  it('combines default and custom classes', () => {
    render(<Avatar name="Test User" className="custom-class" />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveClass('rounded-full', 'border-2', 'border-primary-300', 'custom-class');
  });

  it('generates correct avatar URL', () => {
    render(<Avatar name="John Doe" size={64} />);
    const img = screen.getByAltText('Avatar for John Doe');
    const expectedUrl = 'https://ui-avatars.com/api/?name=John%20Doe&background=random&rounded=true&size=64';
    expect(img).toHaveAttribute('src', expectedUrl);
  });

  it('encodes special characters in name', () => {
    render(<Avatar name="José María" />);
    const img = screen.getByAltText('Avatar for José María');
    const expectedUrl = 'https://ui-avatars.com/api/?name=Jos%C3%A9%20Mar%C3%ADa&background=random&rounded=true&size=48';
    expect(img).toHaveAttribute('src', expectedUrl);
  });

  it('handles empty name', () => {
    render(<Avatar name="" />);
    const img = screen.getByAltText((alt) => alt.startsWith('Avatar for'));
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://ui-avatars.com/api/?name=&background=random&rounded=true&size=48');
  });

  it('handles special characters in name', () => {
    render(<Avatar name="Test@User#123" />);
    const img = screen.getByAltText('Avatar for Test@User#123');
    const expectedUrl = 'https://ui-avatars.com/api/?name=Test%40User%23123&background=random&rounded=true&size=48';
    expect(img).toHaveAttribute('src', expectedUrl);
  });

  it('handles very long names', () => {
    const longName = 'A'.repeat(100);
    render(<Avatar name={longName} />);
    const img = screen.getByAltText(`Avatar for ${longName}`);
    expect(img).toBeInTheDocument();
  });

  it('handles numbers in name', () => {
    render(<Avatar name="User123" />);
    const img = screen.getByAltText('Avatar for User123');
    const expectedUrl = 'https://ui-avatars.com/api/?name=User123&background=random&rounded=true&size=48';
    expect(img).toHaveAttribute('src', expectedUrl);
  });

  it('handles zero size', () => {
    render(<Avatar name="Test User" size={0} />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveAttribute('width', '0');
    expect(img).toHaveAttribute('height', '0');
  });

  it('handles negative size', () => {
    render(<Avatar name="Test User" size={-10} />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveAttribute('width', '-10');
    expect(img).toHaveAttribute('height', '-10');
  });

  it('handles very large size', () => {
    render(<Avatar name="Test User" size={1000} />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveAttribute('width', '1000');
    expect(img).toHaveAttribute('height', '1000');
  });

  it('handles decimal size values', () => {
    render(<Avatar name="Test User" size={64.5} />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveAttribute('width', '64.5');
    expect(img).toHaveAttribute('height', '64.5');
  });

  it('handles multiple custom classes', () => {
    render(<Avatar name="Test User" className="class1 class2 class3" />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveClass('class1', 'class2', 'class3');
  });

  it('handles empty className', () => {
    render(<Avatar name="Test User" className="" />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveClass('rounded-full', 'border-2', 'border-primary-300');
  });

  it('handles whitespace in className', () => {
    render(<Avatar name="Test User" className="  class1  class2  " />);
    const img = screen.getByAltText('Avatar for Test User');
    expect(img).toHaveClass('class1', 'class2');
  });
}); 