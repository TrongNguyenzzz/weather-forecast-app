import './App.css';
import Search from './components/search/Search';
import { weatherAPI, apiKey } from './api';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/currentWeather/currentWeather';
import SummaryWeather from './components/summary/Summary';
import { useState } from 'react';

export function getCurrentDate() {

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  // return `${month}/${date}/${year}`;

  return date;
}

export function getCurrentTime() {
  const today = new Date();
  return today.getHours() + ":" + today.getMinutes()
}

export function getDayInWeek() {

  const today = new Date();

  const day = today.getDay();

  const defineDay = {"1": "Mon", "2": "Tue", "3": "Wed", "4": "Thur", "5": "Fri", 
  "6": "Sat", "7": "Sun"}

  return defineDay[day];
}

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  const [currDayInWeek, setCurrDayInWeek] = useState(getDayInWeek());

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");
    
    const weatherResult = fetch(`${weatherAPI}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)

    const weatherForecast = fetch(`${weatherAPI}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)

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
      <h2 className='current-date'> <span> {currDayInWeek} {currentDate} </span> |  {currentTime} </h2>
      <img src='https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-512.png' alt='' className='logo-img'/>
      <h2 className='app-title'> Weather forecast </h2>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
