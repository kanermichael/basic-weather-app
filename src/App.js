import React from 'react';

import GlobalStyle from '../src/theme/globalStyle';
import {WeatherProvider} from './context/WeatherContext'
import Wrapper from './components/Wrapper'



function App() {

 
  return (

   <React.Fragment>
      <GlobalStyle />
      <WeatherProvider>
        <Wrapper />
    </WeatherProvider>
   </React.Fragment>
  
  );
}

export default App;
