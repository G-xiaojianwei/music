import React, { Component } from 'react';
import './pic.css';
// import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

class PicUI extends Component {
	constructor(){
		super();
		this.handleGoLyric=this.handleGoLyric.bind(this);
		this.state={
			list:[4,3,2,1]
		}
		
	}
  render() {
    return (
      <div id="pic">
			<div className="big">
				<div className="small" ref="small">
					<div className="circle">
						<img src={"https://api.mlwei.com/music/api/?key=523077333&cache=1&type=pic&id="+this.props.musicId} alt=""/>
					</div>
				</div>
			</div>
			{
				this.state.list.map((item,index)=>{
					return <div className={"setTemem"+item} key={index} onTouchStart={()=>this.handleSetTemem(index+1)} >{"主题"+(index+1)}</div>;
				})
			}
			<div className="lyric" onTouchStart={this.handleGoLyric}>词</div>
	  </div>
    );
  }
  componentDidMount(){
  	var pathname=this.props.location.pathname;
  	var reg=/[^\/]+/;
  	pathname.replace(reg,($0)=>{
		this.props.handlePathName($0);
  	})
	this.props.handleBack(true);
	// this.refs.small.style.animation:circleMove  10s linear infinite;

  }
  handleSetTemem(num){
		this.props.handleSet(num);
  }
  handleGoLyric(){
  	var mid=this.props.match.params.mid;
	this.props.history.push('/lyric/'+mid);
  }
}
function mapStateToProps(state){
	return{
			isMusicPlay:state.isMusicPlay,
			musicId:state.musicId
	}
}

function mapDispatchToProps(dispatch){
	return{
		handleBack(bool){
			dispatch({type:'IS_MUSIC_BACK',payload:bool})
		},
		handlePathName(data){
			dispatch({type:"PATH_NAME",payload:data})
		},
		handleSet(num){
			dispatch({type:"TEMEM_SET",payload:num})
		}
	}
}

var Pic=connect(mapStateToProps,mapDispatchToProps)(PicUI)

export default Pic;
