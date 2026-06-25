import { render, screen } from '@testing-library/react';
import Forecast from './forecast';

const mockForecastData = {
  city: 'London, GB',
  list: [
    // First 7 items get spliced off (discarded), then next 7 are used
    ...Array(7).fill(null).map((_, i) => ({
      weather: [{ description: 'light rain', icon: '10d' }],
      main: { temp: 18, temp_min: 15, temp_max: 21, feels_like: 17, pressure: 1010, humidity: 70 },
      wind: { speed: 4.5 },
    })),
    // These 7 items are the ones actually rendered
    {
      weather: [{ description: 'clear sky', icon: '01d' }],
      main: { temp: 25, temp_min: 20, temp_max: 28, feels_like: 24, pressure: 1015, humidity: 55 },
      wind: { speed: 3.2 },
    },
    {
      weather: [{ description: 'few clouds', icon: '02d' }],
      main: { temp: 22, temp_min: 18, temp_max: 25, feels_like: 21, pressure: 1012, humidity: 60 },
      wind: { speed: 4.1 },
    },
    {
      weather: [{ description: 'scattered clouds', icon: '03d' }],
      main: { temp: 20, temp_min: 16, temp_max: 23, feels_like: 19, pressure: 1008, humidity: 65 },
      wind: { speed: 5.0 },
    },
    {
      weather: [{ description: 'overcast clouds', icon: '04d' }],
      main: { temp: 19, temp_min: 15, temp_max: 22, feels_like: 18, pressure: 1005, humidity: 72 },
      wind: { speed: 6.3 },
    },
    {
      weather: [{ description: 'light rain', icon: '10d' }],
      main: { temp: 17, temp_min: 14, temp_max: 20, feels_like: 16, pressure: 1003, humidity: 80 },
      wind: { speed: 7.0 },
    },
    {
      weather: [{ description: 'moderate rain', icon: '10d' }],
      main: { temp: 15, temp_min: 12, temp_max: 18, feels_like: 14, pressure: 1000, humidity: 85 },
      wind: { speed: 8.2 },
    },
    {
      weather: [{ description: 'heavy rain', icon: '09d' }],
      main: { temp: 14, temp_min: 11, temp_max: 17, feels_like: 12, pressure: 998, humidity: 90 },
      wind: { speed: 9.5 },
    },
  ],
};

describe('Forecast component', () => {
  it('renders the "Weekly forecast" label', () => {
    render(<Forecast data={mockForecastData} />);
    expect(screen.getByText(/Weekly forecast/i)).toBeInTheDocument();
  });

  it('renders weather descriptions for forecast days', () => {
    render(<Forecast data={mockForecastData} />);
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/few clouds/i)).toBeInTheDocument();
  });

  it('renders min/max temperatures for forecast items', () => {
    render(<Forecast data={mockForecastData} />);
    // First rendered item: temp_min 20, temp_max 28
    expect(screen.getByText(/20°C \/ 28°C/)).toBeInTheDocument();
  });

  it('renders weather icons for forecast items', () => {
    render(<Forecast data={mockForecastData} />);
    const icons = screen.getAllByAltText('weather');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders the average weekly summary section', () => {
    render(<Forecast data={mockForecastData} />);
    expect(screen.getByText(/Average weekly summary/i)).toBeInTheDocument();
  });
});
