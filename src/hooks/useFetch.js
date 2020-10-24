import React from 'react';
import axios from 'axios';

export default async function useFetch (location, setColorHash){
    const [status, setStatus] = React.useState('idle')
    const [weatherData, setWeatherData] = React.useState({})
   
        try{

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
        const temp = response.data.main.temp;
        
        setWeatherData(temp)
        setColorHash(temp)
        setStatus('success')
        
        }catch(e){
            setStatus('error')  
        }

    return { status, weatherData}
}