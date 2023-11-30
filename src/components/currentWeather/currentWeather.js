import "./currentWeather.css";
import { getCurrentDate } from "../../App";
import { getDayInWeek } from "../../App";
import { useState } from "react";

const CurrentWeather = ({data}) => {

    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    const [currentDay, setCurrentDay] = useState(getDayInWeek());

    return (
        <div className="weather">
            <div className="top-weather">
                <div>
                    <p className="city"> {data.city} </p>
                    <p className="weather-time"> {currentDay} | {currentDate} </p>
                    <p className="weather-description"> {data.weather[0].description} </p>
                </div>
                <img alt="weather" className="weather-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
            </div>

            <div className="bottom-weather">
                <p className="temperature"> {Math.round(data.main.temp)}°C  </p>
                <div className="detail-weather">
                    <div className="parameter-row">
                        <span className="parameter-label"> Feels like </span>
                        <span className="parameter-value"> {Math.round(data.main.feels_like)}°C </span>
                    </div>

                    <div className="parameter-row">
                        <span className="parameter-label"> Wind </span>
                        <span className="parameter-value"> {data.wind.speed} m/h </span>
                    </div>

                    <div className="parameter-row">
                        <span className="parameter-label"> Humidity </span>
                        <span className="parameter-value"> {data.main.humidity}%  </span>
                    </div>

                    <div className="parameter-row">
                        <span className="parameter-label"> Pressure </span>
                        <span className="parameter-value"> {data.main.pressure} hPa </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;