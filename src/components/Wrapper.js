import React from 'react'
import GetInfo from './GetInfo';
import SearchForm from './SearchForm';
import styled from 'styled-components';
import {useWeather} from '../context/WeatherContext'


const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #000;
  margin-top:0;
`;

const InnerWrapper = styled.section`

background-color: ${ ({color}) => handleWithHashMap(color)};
background-image: ${ ({background}) => `url(${(background)})`};
background-repeat: no-repeat;
background-size: cover;

transition: background-color 0.5s ease;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
text-align: center;
 
`;

const Section = styled.section`
  background: white;
  padding: 20px 30px;
  border-radius:5px;
  box-shadow: 10px 10px 24px -15px rgba(0,0,0,0.75);
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
    const {backgroundImage, weatherColor} = useWeather()

    return (
        <InnerWrapper color={weatherColor} background={backgroundImage}>
        <Section>
            <Title>Weather Forecast</Title>
            <SearchForm />
        </Section>
        <GetInfo/> 
      </InnerWrapper>
    )
}