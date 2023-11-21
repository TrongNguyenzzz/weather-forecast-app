import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./forecast.css";

const Forecast = ({data}) => {

    const temp = data.list.splice(0, 7);

    const weeksday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const dayInWeek = new Date().getDay();

    const forecastDays = weeksday.slice(dayInWeek, weeksday.length).concat(weeksday.slice(0, dayInWeek));

    console.log(data)

    return(
        <div className="forecast-weather">
            <label className="forecast-label"> Daily forecast </label>
            <div className="mid-forecast">
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-daily" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
                                    <label className="day"> {forecastDays[idx]} </label>
                                    <label className="description"> {item.weather[0].description} </label>
                                    <label className="min-max"> 
                                        {Math.round(item.main.temp_min)}°C / {" "}
                                        {Math.round(item.main.temp_max)}°C
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">

                                <div className="daily-details-grid-item">
                                    <label> Feels like </label>
                                    <label> {Math.round(item.main.feels_like)}°C </label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label> Pressure </label>
                                    <label> {item.main.pressure} hPa </label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label> Wind Speed </label>
                                    <label> {item.wind.speed} m/h </label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label> Humidity </label>
                                    <label> {item.main.humidity}% </label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label> Max temp </label>
                                    <label> {Math.round(item.main.temp_max)}°C </label>
                                </div>

                                <div className="daily-details-grid-item">
                                    <label> Min temp </label>
                                    <label> {Math.round(item.main.temp_min)}°C </label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
            </div>
        </div>
    )
}

export default Forecast;