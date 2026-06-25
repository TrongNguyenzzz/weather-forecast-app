import { render, screen, fireEvent } from '@testing-library/react';
import SummaryWeather from './Summary';

const mockForecastSet = [
  {
    weather: [{ description: 'clear sky', icon: '01d' }],
    main: { temp: 25, temp_min: 20, temp_max: 30, feels_like: 24, pressure: 1015, humidity: 55 },
    wind: { speed: 3 },
  },
  {
    weather: [{ description: 'few clouds', icon: '02d' }],
    main: { temp: 22, temp_min: 18, temp_max: 26, feels_like: 21, pressure: 1012, humidity: 60 },
    wind: { speed: 4 },
  },
  {
    weather: [{ description: 'scattered clouds', icon: '03d' }],
    main: { temp: 20, temp_min: 16, temp_max: 24, feels_like: 19, pressure: 1008, humidity: 65 },
    wind: { speed: 5 },
  },
  {
    weather: [{ description: 'overcast clouds', icon: '04d' }],
    main: { temp: 19, temp_min: 15, temp_max: 23, feels_like: 18, pressure: 1005, humidity: 72 },
    wind: { speed: 6 },
  },
  {
    weather: [{ description: 'light rain', icon: '10d' }],
    main: { temp: 17, temp_min: 14, temp_max: 21, feels_like: 16, pressure: 1003, humidity: 80 },
    wind: { speed: 7 },
  },
  {
    weather: [{ description: 'moderate rain', icon: '10d' }],
    main: { temp: 15, temp_min: 12, temp_max: 19, feels_like: 14, pressure: 1000, humidity: 85 },
    wind: { speed: 8 },
  },
  {
    weather: [{ description: 'heavy rain', icon: '09d' }],
    main: { temp: 14, temp_min: 10, temp_max: 18, feels_like: 12, pressure: 998, humidity: 90 },
    wind: { speed: 9 },
  },
];

describe('SummaryWeather component', () => {
  it('renders the title "Average weekly summary"', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    expect(screen.getByText(/Average weekly summary/i)).toBeInTheDocument();
  });

  it('renders four clickable summary icons', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(4);
  });

  it('shows temperature info when temperature icon is clicked', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]); // temperature icon
    expect(screen.getByText(/Temp:/)).toBeInTheDocument();
    expect(screen.getByText(/°C/)).toBeInTheDocument();
  });

  it('shows wind speed info when wind icon is clicked', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[1]); // wind speed icon
    expect(screen.getByText(/Wind speed:/)).toBeInTheDocument();
    expect(screen.getByText(/m\/h/)).toBeInTheDocument();
  });

  it('shows humidity info when humidity icon is clicked', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[2]); // humidity icon
    expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });

  it('shows min/max temperature info when min/max icon is clicked', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[3]); // min/max icon
    expect(screen.getByText(/hottest day/i)).toBeInTheDocument();
    expect(screen.getByText(/coldest day/i)).toBeInTheDocument();
  });

  it('toggles temperature info off when clicked again', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]); // show
    expect(screen.getByText(/Temp:/)).toBeInTheDocument();
    fireEvent.click(images[0]); // hide
    expect(screen.queryByText(/Temp:/)).not.toBeInTheDocument();
  });

  it('calculates the correct average temperature', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]);
    // Average: (25+22+20+19+17+15+14)/7 = 132/7 = 18.857... rounded to 18.9
    expect(screen.getByText(/Temp: 18.9°C/)).toBeInTheDocument();
  });

  it('calculates the correct average wind speed', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[1]);
    // Average: (3+4+5+6+7+8+9)/7 = 42/7 = 6
    expect(screen.getByText(/Wind speed: 6 m\/h/)).toBeInTheDocument();
  });

  it('calculates the correct average humidity', () => {
    render(<SummaryWeather forecastSet={mockForecastSet} />);
    const images = screen.getAllByRole('img');
    fireEvent.click(images[2]);
    // Average: (55+60+65+72+80+85+90)/7 = 507/7 = 72.4...
    expect(screen.getByText(/Humidity: 72.4 %/)).toBeInTheDocument();
  });
});
