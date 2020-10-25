import React from 'react';
import useFetch from '../hooks/useFetch'
import styled from 'styled-components';

const WeatherOutput = styled.h2`
  font-size: 3em;
  text-align: center;
  color: #000;
  font-weight: 300;
`;

export default function GetInfo({location, setColorHash}){
   
   const {status, weatherData} = useFetch(location, setColorHash)

    const statusMsg = {
        idle: "Please enter a location",
        success: `Temperature: ${Math.round(weatherData.main?.temp)}°C, Clouds: ${weatherData.clouds?.all}%`,
        invalid: "The location you have entered is not valid"
    }
    return <WeatherOutput>{statusMsg[status] || statusMsg.invalid}</WeatherOutput>    
}