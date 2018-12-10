import React, { Component } from 'react';
import './list.css';
import axios from 'axios'
import {connect} from 'react-redux'
import {setSessionStorage,getSessionStorage} from '../../tools/index.js'
import Loading from '../loading/loading.js'
class ListUI extends Component {
	constructor(){
		super();
		this.handleMove=this.handleMove.bind(this);
		this.handleEnd=this.handleEnd.bind(this);
		this.state={
			list:[],
			isLoading:false
		}
	}
  render() {
    return (
      <div id="musicList">
			
			{
				this.state.isLoading?<ul>
				
				{
					this.state.list.map((item,index)=>{
						return <li className={this.props.musicId===item.mid ? 'active' : ''} key={item.mid}>
							<div onTouchMove={this.handleMove}  onTouchEnd={()=>this.handleEnd(item.mid)}>
								<div className="listOrder">{index+1}</div>
								<div className="listName">
									<h3>{item.title}</h3>
									<p>{item.author}</p>
								</div>
							</div>
						</li>
					})
				}
			</ul>:<Loading />
		}
		</div>
    );
  }
  componentDidMount(){
  	var pathname=this.props.location.pathname;
  	var reg=/[^\/]+/;
  	pathname.replace(reg,($0)=>{
		this.props.handlePathName($0);
  	})
	//设置header的箭头
  	this.props.handleBack(false);
  	var data=getSessionStorage("songList");
	if(data){
		this.setState({
			list:JSON.parse(data),
			isLoading:true
		})
	}else{
		axios.get('/music/api/?key=523077333&id=3641614987&type=songlist&cache=1&size=hq').then((res)=>{
		// console.log(res.Code==="OK")
			if(res.data.Code==='OK'){
				setSessionStorage('songList',JSON.stringify(res.data.Body));
				this.setState({
					list:res.data.Body,
					isLoading:true
				});
				
			}
			
	  	})	
	}
  }
  handleMove(){
		this.isMove=true;
  }
  handleEnd(mid){
  	if(this.isMove){
		this.isMove=false;
  	}else{
  		// this.props.history.push('lyric/'+mid);
  		this.props.history.push('pic/'+mid);
  		this.props.handleBack(true);
  		this.props.handleMusicId(mid);
  		this.props.handleNusicPlay(true);
  		var listName=this.state.list.filter((item)=>{
  			if(item.mid===mid){
				return item
  			}
  		})
  		this.props.handleMusicName(listName[0].title);
  		this.props.handleSongUrl(listName[0].url);
  		
  	}
		
  	}
  }
function mapStateToProps(state){
	return{
			//获取数据
			musicData:state.allMusicData,
			musicId:state.musicId
	}
}

function mapDispatchToProps(dispatch){
	return{
		//设置数据
		handleBack(bool){
			dispatch({type:'IS_MUSIC_BACK',payload:bool})
		},
		handleMusicId(mid){
			dispatch({type:'MUSIC_ID',payload:mid})
		},
		handleNusicPlay(bool){
			dispatch({type:'IS_MUSIC_PLAY',payload:bool})
		},
		handleMusicName(name){
			dispatch({type:"MUSIC_NAME",payload:name})
		},
		handlePathName(data){
			dispatch({type:"PATH_NAME",payload:data})
		},
		handleSongUrl(url){
			dispatch({type:"SONG_URL",payload:url})
		}
	}
}

var List=connect(mapStateToProps,mapDispatchToProps)(ListUI)

export default List;
