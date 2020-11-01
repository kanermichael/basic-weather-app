import React from 'react';

const WeatherContext = React.createContext()

function WeatherProvider(props){

  const [location, setLocation] = React.useState('')
  const [weatherColor, setWeatherColor] = React.useState(null)
  const [backgroundImage, setBackgroundImage] = React.useState('')
  const value = {location, setLocation, weatherColor, setWeatherColor, backgroundImage, setBackgroundImage}

  return(
    <WeatherContext.Provider value={value} {...props} />
  )
}


function useWeather(){
  const context = React.useContext(WeatherContext)
  if(!context){
    throw new Error('useLocation must be used within the LocationProvider')
  }
  return context
}

export {WeatherProvider, useWeather}