import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components'
import GlobalStyle from '../src/theme/globalStyle'


const WeatherOutput = styled.h2`
  font-size: 3em;
  text-align: center;
  color: #000;
  font-weight: 300;
`;

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #000;
`;

const Wrapper = styled.section`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${ ({color}) => handleWithHashMap(color)};
  transition: background-color 0.5s ease;
`;

const Input = styled.input`
  display: block;
  width: 300px;
  margin: 0 auto;
  height: 35px;
  font-size: 20px;
  padding: 0 10px;
  border: none;
  outline: 1px solid #ccc;
  margin-bottom: 20px;
  border-radius: 3px;
`;

const Submit = styled.input`
    background: white;
    outline: 1px solid #ccc;
    border: 0;
    padding: 7px 15px;
    width: 100px;
    border-radius: 3px;
    &:hover{
      outline: 1px solid #000;
    }
`;


 const handleWithHashMap = color => {
  const colors = {
  0: "#a8d8ff",
  10: "#c0f0f0",
  20: "#ffffd8",
  30: "#ffa8a8",
}

function roundColor(){
  if(color < 0 ) {
    return 0 
  } else if(color > 35){
    return 30
  }else{
    return color
  }
}


return colors[Math.round( roundColor() / 10) * 10] || colors.base;

}

 

function SearchForm({onLocationChange}){

  const [text, setText] = useState('')

  function handleSubmit(e){
    e.preventDefault();
    if(text){
      onLocationChange(text)
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" onChange={e => setText(e.target.value)} autoFocus/>
      <Submit
            type="submit"
            value="Search"
      />
    </form>
  )
  
}

function GetInfo({location, color}){

  const [status, setStatus] = useState('idle')
  const [weatherData, setWeatherData] = useState({})
  const {temp} = weatherData
 
 
  useEffect(() => {

    async function getWeather(){

      try{
       const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
       setWeatherData(response.data.main)
       color(response.data.main.temp)
       setStatus('success')
        
      }catch(e){
        if(e.response.status === 404){
          setStatus('error')
        }
        
      }
     
    }
    getWeather()
  }, [location, color])

 

  if(status === 'idle'){
    return(
    <WeatherOutput >Please enter a location to get current temperature</WeatherOutput>
    ) 
  }else if(status === 'success'){
    return(
    <WeatherOutput>In {location} it is currently: {Math.round(temp)}°C   </WeatherOutput>
    )
  }else{
    return (
    <WeatherOutput>The location you have entered is not valid.</WeatherOutput>
    )
  }
}

function App() {

  const [location, setLocation] = useState('')
  const [weatherColor, setWeatherColor] = useState(null)
  
  return (
   <React.Fragment>
      <GlobalStyle />
      <Wrapper color={weatherColor} >
      <section>
        <Title>Weather App</Title>
        <SearchForm onLocationChange={setLocation}  />
        <GetInfo location={location} color={setWeatherColor}/>
      </section>
    </Wrapper>
   </React.Fragment>
   
  );
}

export default App;
