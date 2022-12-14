import React from 'react';
import './styles/reset.css';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import reportWebVitals from './reportWebVitals';

import router from "./router";
import {lightTheme} from './styles/theme'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={lightTheme}>
            <RouterProvider router={router} />
          </ThemeProvider>
      </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
