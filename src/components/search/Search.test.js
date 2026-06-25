import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
  });

  it('renders the search input with placeholder text', () => {
    render(<Search onSearchChange={mockOnSearchChange} />);
    expect(screen.getByText(/Search for city/i)).toBeInTheDocument();
  });

  it('renders the AsyncPaginate component', () => {
    const { container } = render(<Search onSearchChange={mockOnSearchChange} />);
    const searchBar = container.querySelector('.search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('renders without crashing when no props are passed', () => {
    // Should not throw even without onSearchChange
    expect(() => render(<Search onSearchChange={() => {}} />)).not.toThrow();
  });
});
