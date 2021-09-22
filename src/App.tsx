import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Takenpage from './pages/Takenpage';





function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/taken-game" component={Takenpage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


//<Route path="/dashboard" component={() => <Dashboard stuff={stuff} />} />  
