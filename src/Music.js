import React from 'react'
import MusicBackground from './MusicBackground'
import PlayBar from './PlayBar'
import Ajax from './Ajax'

class Music extends React.Component{
	constructor(props){
		super(props);
		this.state={
			music:null,
			channels:[],
			data:[],
			channel:'',
			index:0
		}
	}


	componentDidMount(){	
		this.getMusicUrl()
		this.getMusic()
		
	}

	getMusicUrl(data){
		var that = this;
		let audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getChannels.php','get')
		audioObject.getMsg().then(function(data){
			that.setState({
				channels:data.channels
			})
			
		},function(error){
			//未获取到就返回失败
			console.log('失败')
		}).catch(function(Error){
			console.log('Error')
		})	
	}

	stop(){
		if(this.state.music.paused){
			this.state.music.play()
			this.setState({
				playstate:false
			})
		}else{
			this.state.music.pause()
			this.setState({
				playstate:true
			})			
		}
	}

	getLrc(sid){
		let audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getLyric.php','get',{sid:sid},false)
		audioObject.getMsg().then(function(data){
			console.log(data)
		})

	}


	getMusic(e){
		let [that,audioObject] = [this,undefined]
		if(!e){
			this.setState({index:this.state.index+1})
			audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getSong.php','get',false)
		}else{
			this.setState({channel:e.target.className,index:this.state.index+1})
			audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getSong.php','get',{channel:e.target.className},false)
		}
		audioObject.getMsg().then(function(data){
			that.state.data.push(data)
			var music = document.getElementById('music')
			music.src = data.song[0].url
			that.setState({
				music:music,
				picture:data.song[0].picture,
				sid:data.song[0].sid,
				lrc:data.song[0].lrc,
				url:data.song[0].url,
				title:data.song[0].title,
				artist:data.song[0].title
			})
			that.getLrc(data.song[0].sid)
		},function(error){
			//未获取到就返回失败
			console.log('失败')
		}).catch(function(Error){
			console.log('Error')
		})
		
	}

	perMusic(e){
		this.setState({index:this.state.index-1})
		console.log(this.state.index)
		let data = this.state.data[0]
		console.log(data)
		this.state.music.src = data.song[0].url
		this.setState({
			music:this.state.music,
			picture:data.song[0].picture,
			sid:data.song[0].sid,
			lrc:data.song[0].lrc,
			url:data.song[0].url,
			title:data.song[0].title,
			artist:data.song[0].title
		})
		this.getLrc(data.song[0].sid)	
	}

	render(){
		return (
			<div>
				<MusicBackground state={this.state.playstate} picture={this.state.picture}/>
				<PlayBar music={this.state.music} />
				<p onClick={this.stop.bind(this)}>sss</p>
				<p className={this.state.channel} onClick={this.getMusic.bind(this)}>aaaa</p>
				<p onClick={this.perMusic.bind(this)}>aaaa</p>
				<div>
					{this.state.channels.map((value,index)=>{
						return <p key={index} className={value.channel_id} onClick={this.getMusic.bind(this)}>{value.name}</p>
					})}
				</div>
				<audio id="music" autoPlay='autoplay'></audio>
			</div>	
		)
	}	
}

export default Music