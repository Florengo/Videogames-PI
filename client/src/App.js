import './App.css';
import {BrowserRouter, Route, } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
<Route path ='/home' component={Home}/>

      </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
