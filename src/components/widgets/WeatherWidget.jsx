/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaFire,
} from "react-icons/fa6";

function TodayWeatherWidget({ temperature = 32 }) {
  const [city, setCity] = useState("Madrid");

  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const rawCity = timeZone.split("/")[1] || timeZone;
      setCity(rawCity.replace(/_/g, " "));
    } catch (e) {
      setCity("Madrid");
    }
  }, []);

  // Dynamically select Icon & Description based on the temperature degree (°C)
  const getWeatherInfo = (temp) => {
    if (temp >= 40) {
      return {
        icon: <FaFire className="text-xl text-orange-600" />,
        text: "Extreme Heat",
      };
    } else if (temp >= 28) {
      return {
        icon: <FaSun className="text-xl text-amber-400" />,
        text: "Sunny & Hot",
      };
    } else if (temp >= 18) {
      return {
        icon: <FaCloud className="text-xl text-slate-400" />,
        text: "Partly Cloudy",
      };
    } else if (temp >= 5) {
      return {
        icon: <FaCloudRain className="text-xl text-blue-400" />,
        text: "Chilly & Rainy",
      };
    } else {
      return {
        icon: <FaSnowflake className="text-xl text-cyan-300" />,
        text: "Freezing",
      };
    }
  };

  const { icon, text } = getWeatherInfo(temperature);

  return (
    <div className="w-40 p-2 bg-[#FAFAFA] rounded-2xl border border-black/5 shadow-sm font-sans select-none flex flex-col justify-between">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xs font-semibold text-gray-700">{city}</h2>
          <span className="text-xs font-medium text-gray-400">{text}</span>
        </div>

        <span className="text-xl font-extrabold text-gray-900">
          {temperature}°
        </span>
      </div>
    </div>
  );
}

export default TodayWeatherWidget;
