import React from 'react';
import axios from 'axios';

export default function useFetch (location, setColorHash){

    const [status, setStatus] = React.useState('idle')
    const [weatherData, setWeatherData] = React.useState({})
    
    React.useEffect(()=>{

        let isCancelled = false;

        async function getWeather(){
            if(location){
                try{
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
                    if (!isCancelled) {
                        setWeatherData(response.data)
                        setColorHash(response.data.main.temp)
                        setStatus('success')
                    }
                }catch(e){
                    if (!isCancelled) {
                        setStatus('error') 
                    } 
                }
            }
           
        }
        getWeather()
        return () => {
            isCancelled = true;
          };
    }, [location, setColorHash])
   
    return {status, weatherData}
}