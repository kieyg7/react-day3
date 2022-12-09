import React, {useState} from 'react';
import './App.css';
import styled, {ThemeProvider} from "styled-components"

function App() {
  const [themeType, setThemeType] = useState<string>('dark')
    const darkTheme = {
        backgroundColor: '#111',
        textColor: 'whitesmoke'
    }

    const lightTheme = {
        backgroundColor: 'whitesmoke',
        textColor: '#111',
    }

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      const {currentTarget: {value}, } = e;
    }

  return (

        <RootWrap className="App">
            hello
            <button onClick={() => setThemeType(themeType === 'dark'? 'white' : 'dark')}>change Theme</button>
            <input type="text" onChange={onChange}/>
        </RootWrap>

  );
}



const RootWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;


export default App;
