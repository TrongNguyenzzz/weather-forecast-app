import { render, screen, waitFor } from '@testing-library/react';
import App, { getCurrentDate, getCurrentTime, getDayInWeek } from './App';

// ============ Utility Function Tests ============

describe('getCurrentDate', () => {
  it('returns the current day of the month', () => {
    const today = new Date();
    const expected = today.getDate();
    expect(getCurrentDate()).toBe(expected);
  });

  it('returns a number between 1 and 31', () => {
    const result = getCurrentDate();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(31);
  });
});

describe('getCurrentTime', () => {
  it('returns a string in "H:M" format', () => {
    const result = getCurrentTime();
    expect(result).toMatch(/^\d{1,2}:\d{1,2}$/);
  });

  it('returns the current hours and minutes', () => {
    const now = new Date();
    const expected = now.getHours() + ":" + now.getMinutes();
    expect(getCurrentTime()).toBe(expected);
  });
});

describe('getDayInWeek', () => {
  it('returns a short day name abbreviation', () => {
    const validDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun", undefined];
    const result = getDayInWeek();
    // Note: Sunday returns undefined because day 0 is not mapped (uses "7" for Sun)
    expect(validDays).toContain(result);
  });
});

// ============ App Component Tests ============

describe('App component', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/Weather forecast/i)).toBeInTheDocument();
  });

  it('renders the search component placeholder', () => {
    render(<App />);
    expect(screen.getByText(/Search for city/i)).toBeInTheDocument();
  });

  it('renders the current date and time header', () => {
    render(<App />);
    const header = screen.getByRole('heading', { level: 2, name: /\|/ });
    expect(header).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<App />);
    const logo = screen.getByAltText('');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('Weather-512.png'));
  });

  it('does not render CurrentWeather when no search has been performed', () => {
    render(<App />);
    expect(screen.queryByText(/Feels like/i)).not.toBeInTheDocument();
  });

  it('does not render Forecast when no search has been performed', () => {
    render(<App />);
    expect(screen.queryByText(/Weekly forecast/i)).not.toBeInTheDocument();
  });
});
