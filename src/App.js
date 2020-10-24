import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../src/theme/globalStyle';
import GetInfo from './components/GetInfo';
import SearchForm from './components/SearchForm';



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

function App() {

  const [location, setLocation] = React.useState('')
  const [weatherColor, setWeatherColor] = React.useState(null)
  
  return (
   <React.Fragment>
      <GlobalStyle />
      <Wrapper color={weatherColor} >
      <section>
        <Title>Weather App</Title>
        <SearchForm onLocationChange={setLocation}  />
        <GetInfo location={location} setColorHash={setWeatherColor}/>
      </section>
    </Wrapper>
   </React.Fragment>
   
  );
}

export default App;
