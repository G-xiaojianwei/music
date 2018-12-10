import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux'
import Header from './components/header/header.js'
import Audio from './components/audio/audio.js'
import List from './components/list/list.js'
import Lyric from './components/lyric/lyric.js'
import Pic from './components/pic/pic.js'
import Canvas from './components/canvas/canvas.js'
import Canvas2 from './components/canvas2/canvas2.js'
import Canvas3 from './components/canvas3/canvas3.js'
import Canvas4 from './components/canvas4/canvas4.js'
class AppUI extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Header />
          {this.props.tememSet===1 ? <Canvas /> : this.props.tememSet===3 ? <Canvas3 /> :this.props.tememSet===4 ? <Canvas4 /> : ""}
              <Switch>
              <Route path='/list' component={List}></Route>
              <Route path='/pic/:mid' component={Pic}></Route>
              <Route path='/lyric/:mid' component={Lyric}></Route>
              <Redirect from='*' to="/list" />
              </Switch>
           <Canvas2 />
          <Audio />
      </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return{
      //获取数据
     tememSet:state.tememSet
  }
}

function mapDispatchToProps(dispatch){
  return{
    //设置数据
    
  }
}

var App=connect(mapStateToProps,mapDispatchToProps)(AppUI)


export default App;
