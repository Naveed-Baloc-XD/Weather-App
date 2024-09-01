import { React, useEffect, useRef, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import clear_icon from "./Assets/clear.png";
import clear_n_icon from "./Assets/clearn.png";
import cloud_icon from "./Assets/cloud.png";
import few_cloud_icon from "./Assets/fewClouds.png";
import cloud_rain_icon from "./Assets/light.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import humidity_icon from "./Assets/humidity.png";
import wind_icon from "./Assets/wind.png";
const Weather = () => {
  const [weatherData, setweatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_n_icon,
    "02d": few_cloud_icon,
    "02n": clear_n_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": cloud_rain_icon,
    "11n": cloud_rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
  const apiKey = "55d6182310f99d21bdb9e687f165073a";
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name...");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert("Please enter correct city name...");
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setweatherData(false);
      console.error("erorr in fetching data...");
    }
  };
  useEffect(() => {
    search("Arifwala");
  }, []);

  return (
    <section className="container py-6 p-15px border border-white bg-gradient-to-tl from-[#0c32ef] to-[#16d26b] w-[300px] rounded-lg flex flex-col items-center justify-center">
      <div className="flex items-center justify-between gap-6 w-[90%]">
        <input
          type="text"
          placeholder="Search City ..."
          ref={inputRef}
          className="py-2 w-[100%] px-2 text-[12px] rounded-full border-2 focus:border-[#16d26b] 
          border-[#15af41] outline-none "
        />
        <div
          className="w-[60px] h-[45px] border-[#10ff7c]  duration-500
          border-[3px] bg-white flex items-center justify-center rounded-full"
        >
          <FaSearchLocation
            onClick={() => search(inputRef.current.value)}
            className="w-[25px] h-[25px] cursor-pointer active:scale-90 duration-300
          "
          />
        </div>
      </div>

      {weatherData ? (
        <>
          <div>
            <img src={weatherData.icon} alt="" className="h-[150px]" />
          </div>
          <div className="text-white">
            <p>{time.toLocaleTimeString()}</p>
          </div>

          <div className="mt-2">
            <h1 className="text-5xl text-white">
              {weatherData.temperature}
              °c
            </h1>
            <h3 className=" text-white pt-2 text-center">
              🐱‍👤{weatherData.location}🖤
            </h3>
          </div>
          <section className="flex pt-4 items-center gap-6 mt-4 ml-11 ">
            <div>
              <img src={humidity_icon} alt="" className="h-[25px] mb-2" />
              <p className="text-white">HUMIDITY {weatherData.humidity}%</p>
            </div>
            <div>
              <img src={wind_icon} alt="" className="h-[25px] mb-2" />
              <p className="text-white">
                WindSpeed {weatherData.windSpeed}km/h
              </p>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Weather;
