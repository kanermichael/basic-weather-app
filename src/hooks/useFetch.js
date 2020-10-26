import React from 'react';
import axios from 'axios';

import {useWeather} from '../context/WeatherContext'


export default function useFetch (){

    const {location, setWeatherColor} = useWeather()

    function weatherReducer(state, action){
        const type = {
            resolved: {status: 'resolved', data: action.data, error: null},
            error: {status: 'error', data: null, error: action.error},
        }
        return type[action.type]
    }

    const [state, dispatch] = React.useReducer(weatherReducer, {
        status: 'idle',
        data: null,
    })

    const mountedRef = React.useRef(false) 

    React.useEffect(()=>{

        mountedRef.current = true
        
        async function getWeather(){
            if(location){
                try{
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
                    if (mountedRef.current) {
                        const {data} = response
                        dispatch({type: 'resolved', data})
                        setWeatherColor(data.main?.temp)
                    }
                }catch(e){
                    if (mountedRef.current) {
                        dispatch({ type: 'error', error: e})
                    } 
                }
            }
        }
        getWeather()
        return () => {
            mountedRef.current = false
          };
    }, [location, setWeatherColor])
   
    return {state}
}