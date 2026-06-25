import { render, screen } from '@testing-library/react';
import CurrentWeather from './currentWeather';

const mockWeatherData = {
  city: 'London, GB',
  weather: [
    {
      description: 'clear sky',
      icon: '01d',
    },
  ],
  main: {
    temp: 22.5,
    feels_like: 20.3,
    humidity: 65,
    pressure: 1013,
  },
  wind: {
    speed: 5.2,
  },
};

describe('CurrentWeather component', () => {
  it('renders the city name', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
  });

  it('renders the weather description', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  });

  it('renders the temperature rounded', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/23°C/)).toBeInTheDocument();
  });

  it('renders the feels like temperature', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
  });

  it('renders the wind speed', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/5.2 m\/h/)).toBeInTheDocument();
  });

  it('renders the humidity', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/65%/)).toBeInTheDocument();
  });

  it('renders the pressure', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/1013 hPa/)).toBeInTheDocument();
  });

  it('renders the weather icon', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    const icon = screen.getByAltText('weather');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/01d@2x.png'
    );
  });

  it('displays parameter labels', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText('Feels like')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Pressure')).toBeInTheDocument();
  });
});
