import React from 'react';
import axios from 'axios';

import {useWeather} from '../context/WeatherContext'


export default function useFetch (){

    const {location, setWeatherColor, setBackgroundImage} = useWeather()

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
                    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
                    const photoResponse = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=1&content_type=1&&media=photos&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&privacy_filter=1&text=${location}%panorama&format=json&nojsoncallback=1`)
                    const photoSelectionResponse = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=6b3294add410d8d17eda43da7c6d2231&photo_id=${photoResponse.data.photos.photo[0].id}&format=json&nojsoncallback=1`)
                    const [photoData] = photoSelectionResponse.data.sizes.size.filter(photo => photo.label === 'Large 1600')
                    const { source:photo } = photoData
                    console.log(photoSelectionResponse)
                    if (mountedRef.current) {
                        const {data} = weatherResponse
                        dispatch({type: 'resolved', data})
                        setWeatherColor(data.main?.temp)
                        setBackgroundImage(photo)
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
    }, [location, setWeatherColor, setBackgroundImage])
   
    return {state}
}