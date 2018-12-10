import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import './App.css';
import Header from './components/header/header.js'
import Audio from './components/audio/audio.js'
import List from './components/list/list.js'
import Lyric from './components/lyric/lyric.js'
import Pic from './components/pic/pic.js'
import Canvas from './components/canvas/canvas.js'
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Header />
          <Canvas/>
              <Switch>
              <Route path='/list' component={List}></Route>
              <Route path='/pic/:mid' component={Pic}></Route>
              <Route path='/lyric/:mid' component={Lyric}></Route>
              <Redirect from='*' to="/list" />
              </Switch>
           
          <Audio />
      </div>
      </Router>
    );
  }
}

export default App;
