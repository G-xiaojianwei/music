import React, { Component } from 'react';
import './audio.css';
import axios from 'axios'
import {getSessionStorage,setSessionStorage} from '../../tools/index.js'
import {connect} from 'react-redux'
class AudioUI extends Component {
	constructor(){
		super();
		this.handlePlayBtn=this.handlePlayBtn.bind(this);
	}
  render() {
    return (
      <div id="musicAudio">
			<div className="audioPlay" ref="audioPlay" onTouchStart={this.handlePlayBtn}></div>
			<div className="audioProgress" ref="audioProgress">
				<div className="audioBar" ref="audioBar"></div>
				<div className="audioNow" ref="audioNow"></div>
			</div>
			<audio  ref="audio" src={this.props.musicId &&"https://api.mlwei.com/music/api/?key=523077333&type=url&id="+this.props.musicId+"&size=hq"} id="audio"></audio>
			</div>
    );
  }
  componentDidMount(){
  	this.musicBarDrag();
  }
  componentDidUpdate(){
	if(this.props.pathName==="pic"){
		if(this.props.isMusicPlay){
			this.playMusic();
		}else{
			this.pauseMusic();
		}
	}
  }
  playMusic(){
	this.refs.audioPlay.style.backgroundImage="url(/images/list_audioPause.png)";
	this.refs.audio.play();
	this.playingRun();
	this.props.handleMusicOver(-1);
	this.timers = setInterval(this.playingRun.bind(this),1000);
	clearInterval(this.timer);
  }
  pauseMusic(){
	this.refs.audioPlay.style.backgroundImage="url(/images/list_audioPlay.png)";
  	this.refs.audio.pause();
  	clearInterval(this.timers);
  }
  handlePlayBtn(){
  	var small=document.getElementsByClassName("small")[0];
  	if(this.refs.audio.getAttribute("src")===""){
		return;
  	}
  	if(this.refs.audio.paused){
		this.playMusic();
		this.props.handleMusicPlay(true);
		if(this.props.pathName==="pic"){
			small.style.animationPlayState="running";
		}
		
  	}else{
  		// console.log(this.history)
  		if(this.props.pathName==="pic"){
			small.style.animationPlayState="paused";
		}
  		this.pauseMusic();
  		this.props.handleMusicPlay(false);
  	}
  }
  playingRun(){
  	//监听进度条
	var audioNow=this.refs.audioNow;
  	var audioCurrentTime=this.refs.audio;
  	var audioBar=this.refs.audioBar;
  	var scale=audioCurrentTime.currentTime/audioCurrentTime.duration;
  	audioBar.style.left=scale*audioBar.parentNode.offsetWidth-7+'px';
  	audioNow.style.width=(scale*100)+"%";
	
	//播放结束后执行的代码
  	if(scale===1){
  		this.props.handleMusicPlay(false);
  		this.pauseMusic();
  		this.props.handleLocalLyric("");
  		audioNow.style.width=(0)+"%";
  		audioBar.style.left='-7px';
  		if(this.props.pathName==="lyric"){
			document.getElementById("lyricUl").style.top="0px";
  		}
  		var songList=JSON.parse(getSessionStorage('songList'));
  		for(var i=0;i<songList.length;i++){
			if(songList[i].mid===this.props.musicId){
				//将得到的内容存到状态管理中去
				try{
					axios.get("/music/api/?key=523077333&type=url&id="+songList[i+1].mid+"&size=hq").then((res)=>{
					// console.log(res.Code==="OK")
						if(res.data.Code==='OK'){
							setSessionStorage('songList',JSON.stringify(res.data.Body));
							this.setState({
								list:res.data.Body,
								isLoading:true
							});
							
						}
						
				  	})	
				}catch(err){
					console.log(err)
				}
				this.props.handleNextSong(songList[i+1]);
				//播放第二首歌曲
				this.refs.audio.setAttribute("src",this.props.nextSong.url);
				this.props.handleMusicId(this.props.nextSong.mid);
				this.props.handleMusicName(this.props.nextSong.title);
				// this.props.handleMusicPlay(true);
				if(this.refs.audio.paused){
					console.log(1)
					this.props.handleMusicPlay(true);
					this.playMusic();
					return;
				}else{
					return;
				}

			}
  		}
  	}
  }
   musicBarDrag(){
  	//拖拽
  	var audioNow=this.refs.audioNow;
  	var audioCurrentTime=this.refs.audio;
  	var audioBar=this.refs.audioBar;
	audioBar.ontouchstart=function(ev){
		var disX=0;
		var touch=ev.changedTouches[0];
		disX=touch.pageX-this.offsetLeft;
		document.ontouchmove=(ev)=>{
			var touch=ev.changedTouches[0];
			var L=touch.pageX-disX;
			if(L<-7){
				L=-7;
			}else if(L>this.parentNode.offsetWidth-7){
				L=this.parentNode.offsetWidth-7;
			}
			
			this.style.left=L+'px';

			var scale=(L+7)/this.parentNode.offsetWidth;
			audioNow.style.width=(scale*100).toFixed(2)+'%';
			audioCurrentTime.currentTime=scale*audioCurrentTime.duration;
		};
		document.ontouchend=function(){
			document.ontouchmove=document.ontouchend=null;
		}
		return false;
		//audio.currentTime当前播放时间
		//audio.duration播放总时间
	}
  }
 }
function mapStateToProps(state){
	return{
		musicId:state.musicId,
		isMusicPlay:state.isMusicPlay,
		pathName:state.pathName,
		overTime:state.overTime,
		nextSong:state.nextSong
	}
}

function mapDispatchToProps(dispatch){
	return{
		handleMusicPlay(bool){
			dispatch({type:"IS_MUSIC_PLAY",payload:bool})
		},
		handleMusicOver(num){
			dispatch({type:'OVER_TIME',payload:num})
		},
		handleNextSong(data){
			dispatch({type:"NEXT_SONG",payload:data})
		},
		handleMusicId(mid){
			dispatch({type:'MUSIC_ID',payload:mid})
		},
		handleMusicName(name){
			dispatch({type:"MUSIC_NAME",payload:name})
		},
		handleLocalLyric(data){
			dispatch({type:"LOCAL_LYRIC",payload:data})
		}
	}
}

var Audio=connect(mapStateToProps,mapDispatchToProps)(AudioUI)

export default Audio;
