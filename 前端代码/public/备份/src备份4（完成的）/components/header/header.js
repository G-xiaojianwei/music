import React, { Component } from 'react';
import './header.css';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class HeaderUI extends Component {
	constructor(){
		super();
		this.handleGoHistory=this.handleGoHistory.bind(this);
	}
  render() {
    return (
      <div id="musicHeader">
			{this.props.isMusicBack && <a  onTouchStart={this.handleGoHistory}>&lt;</a> }{this.props.musicName}
	  </div>
    );
  }
  componentDidMount(){

  }
  handleGoHistory(){
  	window.history.go(-1);
  	// to={this.props.historyInfo}
  // 	if(this.props.pathName==="lyric"){
  // 		this.props.handleHistoryInfo('/pic/'+this.props.musicId);
  // 	}else if(this.props.pathName==="pic"){
		// this.props.handleHistoryInfo('/list');
  // 	}
  	
  }
  
}
function mapStateToProps(state){
	return{
			//获取数据
			isMusicBack:state.isMusicBack,
			musicName:state.musicName,
			isMusicPlay:state.isMusicPlay
			// pathName:state.pathName,
			// musicId:state.musicId
			// historyInfo:state.historyInfo
	}
}

function mapDispatchToProps(dispatch){
	return{
		// handleHistoryInfo(data){
		// 	dispatch({type:'HISTORY_INFO',payload:data})
		// }
	}
}

var Header=connect(mapStateToProps,mapDispatchToProps)(HeaderUI)

export default Header;
