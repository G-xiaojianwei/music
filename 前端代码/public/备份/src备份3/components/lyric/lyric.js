import React, { Component } from 'react';
import './lyric.css';
import axios from 'axios'
import {connect} from 'react-redux'
class LyricUI extends Component {
	constructor(){
		super();
		this.state={
			isActive:-1,
			js:0,
			xi:-1,
			pervMid:""
		}
		
	}
  render() {
    return (
      <div id="musicLyric">
		<ul ref="lyricUl" id="lyricUl">
			{/*<li>歌词测试文字</li>
            <li className="active">歌词测试文字</li>
            <li>歌词测试文字</li>
            <li>歌词测试文字</li>
        	*/}
        	{
        		this.props.localLyric && this.props.localLyric.map((item,index)=>{
					return <li id="lyli" className={this.state.isActive===index ? 'active' : ''}  key={index}>{item.lyric}</li>
        		})
        	}
		</ul>
		
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
  	var mid=this.props.musicId;
  	axios.get('/music/api/?key=523077333&cache=1&type=lrc&id='+mid).then((res)=>{
		this.props.handleLocalLyric(this.formatLyric(res.data));
		if(this.props.isMusicPlay){
			this.playLyric();
		}else{
			this.pauseLyric();
		}
	})	
  }
  componentDidUpdate(){
	this.handleNoIt(this.props.musicId);
  }
   componentWillUnmount(){
  	this.pauseLyric(this.props.musicId);
  }
  formatLyric(data){
	var result = [];
	var reg=/\[([^\]]+)\]([^\[]+)/g;
	data.replace(reg,($0,$1,$2)=>{
		result.push({time:this.formatTimeToSec($1),lyric:$2})
	})
	return result;
  }
  formatTimeToSec(time){
	//将时间转换为分钟形式
	var result=time.split(":");
	return (parseFloat(result[0]*60)+parseFloat(result[1])).toFixed(2)
  }
  playLyric(){
  	this.props.handleMusicOver(-1)
  	this.lyricRuning();
	this.timer=setInterval(this.lyricRuning.bind(this),500);
  }
  pauseLyric(){
	clearInterval(this.timer)
  }
  handleNoIt(mid){
		if(mid!==this.state.pervMid){
			axios.get('/music/api/?key=523077333&cache=1&type=lrc&id='+mid).then((res)=>{
				this.props.handleLocalLyric(this.formatLyric(res.data));
				if(this.props.isMusicPlay){
					this.playLyric();
				}else{
					this.pauseLyric();
				}
			})	
			this.setState({
				pervMid:mid
			})
		}
  }
  lyricRuning(){
	//先是获取当前的歌词
	//然后是获取音频播放时间
	try{
	var lyricList=this.props.localLyric;
	var audio=document.getElementById('audio');
	var lyricUl=this.refs.lyricUl;
	var num=lyricUl.children.length;
	for(var i=0;i<lyricList.length;i++){
				if(audio.currentTime > lyricList[i].time && audio.currentTime < lyricList[i+1].time){
					this.setState({
						isActive:i
					});

					if(this.state.xi!=i){
						var sum=0;
						for(var j=0;j<=i;j++){
							sum+=lyricUl.children[j].offsetHeight
						}
						lyricUl.style.top=-(sum)+'px';
						if(lyricList.length-2===i){
							var This=this;
							setTimeout(()=>{
								This.pauseLyric();
								This.setState({
									isActive:lyricList.length-1
								});
							},500)
							
						}
						}
				}
			}
		}catch(err){
			console.log(err)
		}

  }
 }
function mapStateToProps(state){
	return{
			isMusicPlay:state.isMusicPlay,
			musicId:state.musicId,
			localLyric:state.localLyric,
			pathName:state.pathName
	}
}

function mapDispatchToProps(dispatch){
	return{
		//设置数据
		handleBack(bool){
			dispatch({type:'IS_MUSIC_BACK',payload:bool})
		},
		handlePathName(data){
			dispatch({type:"PATH_NAME",payload:data})
		},
		handleMusicOver(num){
			dispatch({type:'OVER_TIME',payload:num})
		},
		handleLocalLyric(data){
			dispatch({type:"LOCAL_LYRIC",payload:data})
		}
	}
}

var Lyric=connect(mapStateToProps,mapDispatchToProps)(LyricUI)

export default Lyric;
