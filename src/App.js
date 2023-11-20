import './App.css';
import Search from './components/search/Search';
import { weatherAPI, apiKey } from './api';
import CurrentWeather from './components/currentWeather/currentWeather';
import { useState } from 'react';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");
    
    const weatherResult = fetch(`${weatherAPI}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)

    const weatherForecast = fetch(`${weatherAPI}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)

    Promise.all([weatherResult, weatherForecast])
      .then(async (response) => {

        let result = response;

        const weatherResponse = await result[0].json();
        const forecastResponse = await result[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse})
        setForecast({ city: searchData.label, ...forecastResponse})
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <img src='https://img.freepik.com/premium-vector/weather-cloud-sun-rain-lightning-logo-design-symbol-icon-template_23729-1786.jpg' alt='' className='logo-img'/>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
    </div>
  );
}

export default App;
