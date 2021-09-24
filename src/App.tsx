import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Takenpage from './pages/Takenpage';
import styled from 'styled-components';

interface AppProps {
  className?: string;
}


function App(props: AppProps) {

  return (
    <div className={props.className}>
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
    </div>
  );
}

export default styled(App)`
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
`;


//<Route path="/dashboard" component={() => <Dashboard stuff={stuff} />} />  
