import React from 'react';
import useFetch from '../hooks/useFetch'
import styled from 'styled-components';

const WeatherOutput = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: #000;
  font-weight: 300;
  margin-top: 1em;
`;

const WeatherData = styled.ul`
  font-size: 0.9em;
  text-align: center;
  color: #000;
  font-weight: 500;
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
background: #fafafa;
margin-bottom: 10px;
opacity: 0.9;
border-radius:5px;
box-shadow: 10px 10px 24px -15px rgba(0,0,0,0.75);
padding: 10px 10px;
display: block;
margin-left: 10px;
flex: 1;
displaY: flex;
flex-direction: column;
min-width: 100px;

`;

export default function GetInfo(){
   
    const {state} = useFetch();
    const [status, setStatus] = React.useState(null)

    React.useEffect(()=> {
        const statusMsg = {
            idle: "Please enter a location",
            resolved: renderWeatherData(),
            error: "The location you have entered is not valid"
        }

        function renderWeatherData(){
            const {main, clouds} = state.data || {};
           
            return (
                <WeatherData>
                    <ListItem><span>Current:</span> <span>{Math.round(main?.temp)}°C</span></ListItem>
                    <ListItem><span>Max:</span> <span>{Math.round(main?.temp_max)}°C</span></ListItem>
                    <ListItem><span>Min:</span> <span>{Math.round(main?.temp_min)}°C</span></ListItem>
                    <ListItem><span>Clouds:</span> <span>{clouds?.all}%</span></ListItem>
                </WeatherData>
            )
        }

        setStatus(statusMsg[state.status] || statusMsg.error)
    
    }, [state])
   
    
    return <WeatherOutput>{status}</WeatherOutput>    
}