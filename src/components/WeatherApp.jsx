import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const APIKey = "64d8fe83d2b504f2439b96e57a2c3830";
  const current = new Date();
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const date = `${current.getDate()}-${months[current.getMonth()]}-${current.getFullYear()}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((currentLocation)=>{
      var latitude = currentLocation.coords.latitude
      var longitude = currentLocation.coords.longitude
      let endPointGeolocation = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
      axios.get(endPointGeolocation)
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.status === 400 || err.response.status === 404) {
            
            toast.info('City Not Found!', {
              position: toast.POSITION.TOP_CENTER
            })
          }
        });
      })
      
    }, [])
    
    
    
    const handleSearch = () => {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
      axios.get(API)
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status === 400 || err.response.status === 404) {
          toast.info('City Not Found!', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      });

  };

  return (
    <>
      <section className="weather-bg">
      <h4 className="display-5 text-center">Seeing the weather of the whole world with Weather App!</h4>
        <div className="d-lg-flex justify-content-around p-5">
          <div className="input-container">
            <input type="text" className="" onChange={(e) => setCity(e.target.value)} />
            <button className="searchBtn" onClick={handleSearch}>Search</button>
          </div>
          <div className="pt-3 pt-lg-0">
            <h1>Date:</h1>
            <h4>{date}</h4>
          </div>
        </div>
        {weatherData && (
          <div className="d-lg-flex justify-content-around gap-2 container">
            <div className="col-lg-7">
              <div className="blur p-3 rounded" style={{marginTop: '3em'}}>
                <h1 className="fw-bold" style={{fontSize: '4em'}}>{weatherData.name}</h1>
                <p>
                  <span className="" style={{fontSize: '3em', color: '#FFA34E'}}>{Math.round(weatherData.main.temp)}°</span>
                  <span className="ps-2">{weatherData.weather[0].description}</span>
                </p>
              </div>
            </div>
            <div className="col-lg-4 mt-3 mt-lg-0">
              <h3 className="p-2 p-lg-0">Weather Details</h3>
              <div className="blur rounded">
                <ul className="p-3 blur">
                  <li className="list-group-item py-2 fs-5 fw-bold">Wind Speed: <i className="fw-light ps-2">{weatherData.wind.speed}km</i></li>
                  <li className="list-group-item py-2 fs-5 fw-bold">Feels Like: <i className="fw-light ps-2">{Math.round(weatherData.main.feels_like)}°</i></li>
                  <li className="list-group-item py-2 fs-5 fw-bold">Humidity: <i className="fw-light ps-2">{weatherData.main.humidity}%</i></li>
                  <li className="list-group-item py-2 fs-4 fw-bold"><i>{weatherData.weather[0].main}</i></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default WeatherApp;
