import './App.css';
import React from 'react';
import { Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import DetailPage from './pages/Detail/Detail';
import CreatePage from './pages/Create/Create';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
    
        <Route path="/"><NavBar/></Route>
        <Route exact path="/"><LandingPage /></Route>
        <Route exact path="/home"><Home /></Route>
        <Route exact path="/dog/:id" component={DetailPage} />
        <Route exact path="/dogs/create" component={CreatePage} />
    
    </div>
  );
}

export default App;
