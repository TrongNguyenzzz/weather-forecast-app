import { useState } from "react";
import "./summary.css";
import { getDayInWeek } from "../../App";
import { getCurrentDate } from "../../App";

const SummaryWeather = ({forecastSet}) => {

    // forecastSet.list.map((item) => {
    //     console.log(item);
    // })

    const weeksday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currDate = new Date();
    const dayInWeek = currDate.getDay();
    const forecastDays = weeksday.slice(dayInWeek, weeksday.length).concat(weeksday.slice(0, dayInWeek));

    const [showTemp, setShowTemp] = useState(false);
    const [showSpeed, setShowSpeed] = useState(false);
    const [showHumid, setShowHumid] = useState(false);
    const [showMinMax, setShowMinMax] = useState(false);

    var maxTemperature = 0;
    var minTemperature = 0;
    var maxDayTemp = 0;
    var minDayTemp = 0;
    var totalTemp = 0;
    var totalWind = 0;
    var totalHumid = 0;

    const handleTemp = () => {
        setShowTemp(!showTemp);
    }

    const handleSpeed = () => {
        setShowSpeed(!showSpeed);
    }

    const handleHumid = () => {
        setShowHumid(!showHumid);
    }

    const handleMinMax = () => {
        setShowMinMax(!showMinMax);
    }
    

    const getRangeTemp = () => {

        forecastSet.map((item, idx) => {
            var currMaxTemp = Math.round(item.main.temp_max);
            var currMinTemp = Math.round(item.main.temp_min);

            totalTemp += Math.round(item.main.temp);
            totalWind += Math.round(item.wind.speed);
            totalHumid += Math.round(item.main.humidity);

            if(maxTemperature === 0 && minTemperature === 0) {
               maxTemperature = currMaxTemp;
               minTemperature = currMinTemp;
               maxDayTemp = idx;
               minDayTemp = idx;
            }

            if(currMaxTemp >= maxTemperature) {
                maxDayTemp = idx;
                maxTemperature = currMaxTemp;
            } 

            if(currMinTemp <= minTemperature) {
                minDayTemp = idx;
                minTemperature = currMinTemp;
            }
        })
        totalTemp = totalTemp / 7;
        totalTemp = Math.round(totalTemp * 10) / 10
        totalWind  =totalWind / 7
        totalWind = Math.round(totalWind * 10) / 10
        totalHumid = totalHumid / 7;
        totalHumid = Math.round(totalHumid * 10) / 10
    }

    const getDayOfPeak = () => {

    }

    getRangeTemp();

    return(
        <div className="summary-weather">
            <h1 className="weather-title"> Average weekly summary </h1>
            <div className="summary-detail">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-degree-celsius-1438889-1214575.png?f=webp" alt="" className="image" onClick={handleTemp}/>
                {showTemp && <p className="class-temp">  Temp: {totalTemp}°C </p>}
            </div>

            <div className="summary-detail">
                <img src="data:image/png;base64,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" alt="" className="image" onClick={handleSpeed}/>
                {showSpeed && <p className="class-temp">  Wind speed: {totalWind} m/h </p>}
            </div>

            <div className="summary-detail">
                <img src="https://cdn-icons-png.flaticon.com/512/219/219816.png" alt="" className="image" onClick={handleHumid}/>
                {showHumid && <p className="class-temp"> Humidity: {totalHumid} % </p>}
            </div>
            
            <div className="summary-detail">
                <img src="https://thenounproject.com/api/private/icons/3851324/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" alt="" className="image" onClick={handleMinMax}/>
                {showMinMax && <div>
                    <p className="class-temp"> {forecastDays[maxDayTemp]} is the hottest day with {maxTemperature}°C </p>
                    <p className="class-temp"> {forecastDays[minDayTemp]} is the coldest day with {minTemperature}°C </p>
                </div>}
            </div>
        </div>
    )
}

export default SummaryWeather;