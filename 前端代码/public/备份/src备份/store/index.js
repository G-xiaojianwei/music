import {createStore,combineReducers} from 'redux'

function isMusicBackReducer(state=false,action) {
	if(action.type==='IS_MUSIC_BACK'){
		return action.payload
	}else{
		return state
	}
}

function musicIdReducer(state="",action) {
	if(action.type==='MUSIC_ID'){
		return action.payload
	}else{
		return state
	}
}

function isMusicPlayReducer(state=false,action) {
	if(action.type==='IS_MUSIC_PLAY'){
		return action.payload
	}else{
		return state
	}
}

function musicNameReducer(state="巅峰榜 · 热歌",action) {
	if(action.type==='MUSIC_NAME'){
		return action.payload
	}else{
		return state
	}
}

function pathNameReducer(state="",action) {
	if(action.type==='PATH_NAME'){
		return action.payload
	}else{
		return state
	}
}

function ovarTimeReducer(state=-1,action) {
	if(action.type==='OVER_TIME'){
		return action.payload
	}else{
		return state
	}
}

function nextSongReducer(state="",action) {
	if(action.type==='NEXT_SONG'){
		return action.payload
	}else{
		return state
	}
}

var reducer=combineReducers({
	isMusicBack:isMusicBackReducer,//返回按钮
	musicId:musicIdReducer,//控制每首歌曲的id
	isMusicPlay:isMusicPlayReducer,//控制音乐是否播放
	musicName:musicNameReducer,//控制音乐名称
	pathName:pathNameReducer,//控制路径名称
	ovarTime:ovarTimeReducer,//控制定时器是否关闭
	nextSong:nextSongReducer//存储下一条歌曲内容
})

var store=createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store