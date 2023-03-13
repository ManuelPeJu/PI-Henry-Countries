import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from "./components/Detail"
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/countries/:id" component={Detail} />
          <Route exact path="/Activity" component={CreateActivity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Abrazamos  App() con browser router para poder rutear nuestros componentes