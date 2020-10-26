import React from 'react'
import GetInfo from './GetInfo';
import SearchForm from './SearchForm';
import styled from 'styled-components';
import {useWeather} from '../context/WeatherContext'


const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #000;
`;

const InnerWrapper = styled.section`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${ ({color}) => handleWithHashMap(color)};
  transition: background-color 0.5s ease;
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

return colors[Math.round(roundColor() / 10) * 10];

}


export default function Wrapper(){
    const {weatherColor} = useWeather()

    return (
        <InnerWrapper color={weatherColor}>
        <section>
        <Title>Weather App</Title>
            <SearchForm />
            <GetInfo/> 
        </section>
      </InnerWrapper>
    )
}