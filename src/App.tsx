import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Takenpage from './pages/Takenpage';
import ThemeApplier from './components/ThemeApplier';
import Sudokupage from './pages/Sudokupage';




function App(): JSX.Element {

  return (
    <ThemeApplier>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/taken-game" component={Takenpage} />
          <Route path="/sudoku-game" component={Sudokupage} />
        </Switch>
        <Footer />
      </Router>
    </ThemeApplier>
  );
}

export default App;


//<Route path="/dashboard" component={() => <Dashboard stuff={stuff} />} />  
