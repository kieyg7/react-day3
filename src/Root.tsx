import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import {createGlobalStyle} from 'styled-components'
import {ReactQueryDevtools} from 'react-query/devtools'
// import Header from "./components/Header";


function Root() {
  return (
      <>
        <GlobalStyle />
        <Outlet />
          <ReactQueryDevtools initialIsOpen={true}/>
      </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    padding-top: 40px;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  a {
    text-decoration:  none;
    color: inherit;
  }
`

export default Root;
