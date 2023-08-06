import axios from "axios";
import sunset from './assets/sunset3.mp4'

import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <video autoPlay loop muted className="video-background">
        <source src={sunset} type="video/mp4" />
      </video>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
          </div>
          <div className="icon">
            {data.weather ? <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}/> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p>{data.weather[0].description}</p>
            ) : null}
          </div>
        </div>

        {data.name ? <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()}  ºC</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}  %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()}  km/h</p> : null}
            <p>Wind Speed</p>
          </div>
        </div> : null }
        
      </div>
    </div>
  );
}

export default App;
