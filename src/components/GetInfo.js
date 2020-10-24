import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherOutput = styled.h2`
  font-size: 3em;
  text-align: center;
  color: #000;
  font-weight: 300;
`;

export default function GetInfo({location, setColorHash}){

    const [status, setStatus] = React.useState('idle')
    const [weatherData, setWeatherData] = React.useState({})
   
   
    React.useEffect(() => {
  
      async function getWeather(){
  
        try{
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
         const temp = response.data.main.temp;
         setWeatherData(temp)
         setColorHash(temp)
         setStatus('success')
          
        }catch(e){
          if(e.response.status === 404){
            setStatus('error')
          }   
        }
       
      }
      getWeather()
    }, [location, setColorHash])
  
  
    if(status === 'idle'){
      return(
      <WeatherOutput >Please enter a location</WeatherOutput>
      ) 
    }else if(status === 'success'){
      return(
      <WeatherOutput>In {location} it is currently: {Math.round(weatherData)}°C   </WeatherOutput>
      )
    }else{
      return (
      <WeatherOutput>The location you have entered is not valid.</WeatherOutput>
      )
    }
  }