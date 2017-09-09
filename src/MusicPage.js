import React from 'react'
import MusicBackground from './MusicBackground'
import PlayBar from './PlayBar'
import Channels from './Channels'
import Ajax from './Ajax'
import ShowLrc from './ShowLrc'
import './MusicPage.css'
import SongList from './SongList'

class MusicPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			music:null,
			channels:[],
			data:[],
			channel:'',
			index:0,
			load:false,
			like:false,
			playstate:false
		}
	}


	componentDidMount(){
		this.getChannels()

	}

	componentDidUpdate(){
		if(!this.state.music) return false;
		setInterval(()=>{
			if(this.state.music.ended){
				this.nextMusic()
			}
		},1000)
		
	}

	getChannels(){
		var that = this;
		let audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getChannels.php','get')
		audioObject.getMsg().then(function(data){
			that.setState({channels:data.channels})
		},function(error){
			//未获取到就返回失败
			console.log('失败')
		}).catch(function(Error){
			console.log('Error')
		})			
	}

	getMusic(value){
			
		this.setState({load:true,playstate:true})
		console.log(1)
		let [that,audioObject] = [this,undefined]
		if(!value){
			audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getSong.php','get',false)
		}else{
			this.setState({channel:value})
			audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getSong.php','get',{channel:value},false)
		}
		audioObject.getMsg().then(function(data){
			if(!data.song[0].url){that.getMusic()}
			if(!data.song[0].url) return false;
			that.setState({
				data:that.state.data.concat({song:[data,'NotlikeBtn']}),
				index:that.state.data.length+1
			})
			var music = document.getElementById('music')
			music.src = data.song[0].url
			setTimeout(()=>(that.setState({load:false})),1000)
			that.setState({
				music:music,
				picture:data.song[0].picture,
				sid:data.song[0].sid,
				lrc:data.song[0].lrc,
				url:data.song[0].url,
				title:data.song[0].title,
				artist:data.song[0].artist
			})
		},function(error){
			//未获取到就返回失败
			console.log('失败')
		}).catch(function(Error){
			console.log('Error')
		})		
	}

	chooseMusic(e){
		this.getMusic(e.target.className)
	}

	nextMusic(){

		this.setState({load:true})
		console.log(this.state.index)
		if(this.state.data.length > this.state.index){
			let value = (this.state.data[this.state.index].song[0]).song[0]
			this.MusicPlay(value)
			this.setState({index:this.state.index+1})
		}else{
			this.getMusic(this.state.channel)
		}
	}
	

	stop(e){
		if(this.state.playstate){
			this.state.music.pause()
			this.setState({
				playstate:false
			})
		}else{
			this.state.music.play()
			this.setState({
				playstate:true
			})			
		}
	}

	like(e){
		let data = this.state.data
		if(e.target.className.indexOf('NotlikeBtn')>-1){
			(data[this.state.index-1].song)[1] = 'likeBtn'
			this.setState(
				data:data
			)
		}else{
			(data[this.state.index-1].song)[1] = 'NotlikeBtn'
			this.setState(
				data:data
			)			
		}
	}

	MusicPlay(value){
		let music = document.getElementById('music')	
		music.src = value.url
			setTimeout(()=>(this.setState({load:false})),1000)
			this.setState({
				music:music,
				picture:value.picture,
				sid:value.sid,
				lrc:value.lrc,
				url:value.url,
				title:value.title,
				artist:value.artist,
			})		
	}

	ListPlay(e){
		let data=[];
		let index = parseInt(e.target.className.match(/\d/))
		
		this.setState({
			playstate:true
		})
		
		if(e.target.className.indexOf('song')>-1){
			this.setState({like:false})
			data = this.state.data

		}else{
			this.setState({like:true})
			this.state.data.forEach((e)=>{
			if((e.song)[1] === 'likeBtn'){
					data.push(e)
				}
			})			
		}
		let value = (data[index].song[0]).song[0]
		this.MusicPlay(value)
		this.setState({index:index+1})
	}

render(){
		return (
			<div className='MusicPage'>
				<div className="styleItems">
					<Channels channels={this.state.channels} getMusic={this.chooseMusic.bind(this)}/>
					{this.state.load && <div className='loading'>load..</div>}
				</div>				
				<div className='playPage'>
					{this.state.load && <div className='loading'>load..</div>}
					<MusicBackground state={this.state.playstate} picture={this.state.picture}/>
					<div className='MusicTitle' id={this.state.channel}>
						<p>{this.state.title}</p>
						<p>{this.state.artist}</p>
					</div>
					<div className='PlayBtn'>
						{!!this.state.data.length && <p className={(this.state.data[this.state.index-1].song)[1]} onClick={this.like.bind(this)}></p>}
						<p className={this.state.playstate?'playBtn':'pausedBtn'} onClick={this.stop.bind(this)}></p>
						<p className='nextBtn' onClick={this.nextMusic.bind(this)}></p>
					</div>
					<PlayBar music={this.state.music} />
				</div>
				<div className='LrcPage'>
				 <ShowLrc music={this.state.music} sid={this.state.sid}/>
				</div>
				<SongList data={this.state.data} ListPlay={this.ListPlay.bind(this)} />
				
				<audio id="music" autoPlay='autoplay'></audio>
				
			</div>	
		)
	}		
}

export default MusicPage