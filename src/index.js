import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Index from "./pages/index";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Page403 from "./pages/403";
import {ThemeProvider} from "@mui/material";
import {themeDark, themeLight} from "./constants/config";
import {MaterialUISwitch} from "./components/MaterialUISwitch/MaterialUISwitch";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const App = () => {
  const [state, setState] = React.useState({checked: true, theme: themeDark});

  const handleChange = (event) => {
    setState({...state, checked: event.target.checked, theme: !state.theme});
  };

  return (
    <Router>
      <ThemeProvider theme={state.theme ? themeDark : themeLight}>
        <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
        <CssBaseline/>
        <Header swich={<MaterialUISwitch sx={{m: 1}} checked={state.checked} onChange={handleChange} name="checked"/>}/>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/index' element={<Index/>}/>
          <Route path='/403' element={<Page403/>}/>
        </Routes>
        <Footer/>
      </ThemeProvider>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
