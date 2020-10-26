import React from 'react';
import useFetch from '../hooks/useFetch'
import styled from 'styled-components';

const WeatherOutput = styled.h2`
  font-size: 3em;
  text-align: center;
  color: #000;
  font-weight: 300;
`;

export default function GetInfo(){
   
    const {state} = useFetch()

    const statusMsg = {
        idle: "Please enter a location",
        resolved: `Temperature: ${Math.round(state.data?.main.temp)}°C ,Clouds: ${state.data?.clouds.all}%`,
        error: "The location you have entered is not valid"
    }
    return <WeatherOutput>{statusMsg[state.status] || statusMsg.error}</WeatherOutput>    
}