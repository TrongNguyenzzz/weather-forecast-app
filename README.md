# Weather Forecast App

A React-based weather forecast application that allows users to search for cities worldwide and view current weather conditions along with a 7-day forecast.

## Demo

https://www.youtube.com/watch?v=5OLPX7D6cLw

## Features

- **City Search** — Async city lookup with autocomplete (supports cities with 1M+ population)
- **Current Weather** — Displays real-time temperature, feels-like, wind speed, humidity, and pressure
- **7-Day Forecast** — Expandable accordion showing daily weather details (min/max temp, wind, humidity, pressure)
- **Weekly Summary** — Interactive summary showing average temperature, wind speed, humidity, and hottest/coldest days

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Create React App (react-scripts 5) |
| Weather API | [OpenWeatherMap API](https://openweathermap.org/api) |
| City Search API | [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) (via RapidAPI) |
| UI Components | react-accessible-accordion, react-select-async-paginate |
| Deployment | Vercel (with analytics support) |

## Project Structure

```
src/
├── App.js                        # Main app component, API orchestration, date/time helpers
├── api.js                        # API endpoints and keys configuration
├── components/
│   ├── search/
│   │   └── Search.js             # Async city search with autocomplete
│   ├── currentWeather/
│   │   └── currentWeather.js     # Current weather display (temp, wind, humidity, pressure)
│   ├── forecast/
│   │   └── forecast.jsx          # 7-day forecast with expandable accordion items
│   └── summary/
│       └── Summary.jsx           # Weekly summary with interactive stat icons
├── icon/
│   └── sunny.png                 # Static icon asset
├── index.js                      # React entry point
└── vitals.js                     # Web vitals reporting
```

## How It Works

1. **Search**: The user types a city name into the search bar. The app queries the GeoDB Cities API to provide matching city suggestions with coordinates.
2. **Fetch Weather**: When a city is selected, the app fetches both current weather and forecast data from the OpenWeatherMap API using the city's latitude and longitude.
3. **Display**: The current weather section shows today's conditions, while the forecast section displays the next 7 days in an expandable accordion format.
4. **Summary**: The weekly summary calculates and displays average temperature, average wind speed, average humidity, and identifies the hottest and coldest days of the week.

## Dependencies

- `react` / `react-dom` — Core UI library
- `react-select-async-paginate` — Async search input with pagination support
- `react-select` — Base select component
- `react-accessible-accordion` — Accessible expandable/collapsible sections for forecast
- `web-vitals` — Performance metrics reporting

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/TrongNguyenzzz/weather-forecast-app.git
cd weather-forecast-app

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## Screenshots

![Current Weather](https://github.com/TrongNguyenzzz/weather-forecast-app/assets/89328535/37a6c2d7-daa2-48d1-a4b0-0582bfd95a9b)

![Weekly Forecast](https://github.com/TrongNguyenzzz/weather-forecast-app/assets/89328535/fb4cb320-3ef1-4307-b336-95a430ff0b1d)

![Weekly Summary](https://github.com/TrongNguyenzzz/weather-forecast-app/assets/89328535/721344c0-d18f-4b6e-9bbf-85665118d659)

## Author

This README was authored by [Kiro](https://kiro.dev), an AI-powered development assistant.

## License

This project is for educational purposes.
