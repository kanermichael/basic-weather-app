import React from 'react';
import styled from 'styled-components';

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


export default function SearchForm({onLocationChange}){

    const [text, setText] = React.useState('')
  
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