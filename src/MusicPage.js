import React from 'react'
import MusicBackground from './MusicBackground'
import PlayBar from './PlayBar'
import Channels from './Channels'
import Ajax from './Ajax'
import ShowLrc from './ShowLrc'
import './MusicPage.css'
import Like from './Like'

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
			like:[],
		}
	}


	componentDidMount(){
		this.getChannels()
		this.getMusic('public_tuijian_billboard')

	}

	componentDidUpdate(){
		if(!this.state.music) return false;
		setInterval(()=>{
			if(this.state.music.ended){
				if(this.state.channel){
					this.getMusic(this.state.channel)
				}else{
					this.getMusic()
				}
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
		this.setState({load:true})
		let [that,audioObject] = [this,undefined]
		if(!value){
			audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getSong.php','get',false)
		}else{
			this.setState({channel:value})
			audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getSong.php','get',{channel:value},false)
		}
		audioObject.getMsg().then(function(data){
			that.setState({
				data:that.state.data.concat({song:[data,'NotlikeBtn']}),
				index:that.state.index+1
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
			that.getLrc(data.song[0].sid)
		},function(error){
			//未获取到就返回失败
			console.log('失败')
		}).catch(function(Error){
			console.log('Error')
		})		
	}

	chooseMusic(e){
		if(e.target.className === 'nextBtn'){
			this.getMusic(this.state.channel)
		}else{
			this.getMusic(e.target.className)
		}
	}

	

	stop(e){
		if(this.state.music.paused){
			this.state.music.play()
			e.target.className = 'playBtn'
			this.setState({
				playstate:false
			})
		}else{
			this.state.music.pause()
			e.target.className = 'pausedBtn'
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

render(){
		return (
			<div className='MusicPage'>
				<div className="styleItems">
					<Channels channels={this.state.channels} getMusic={this.chooseMusic.bind(this)}/>
				</div>				
				<div className='playPage'>
					<MusicBackground state={this.state.playstate} picture={this.state.picture}/>
					<div className='MusicTitle' id={this.state.channel}>
						<p>{this.state.title}</p>
						<p>{this.state.artist}</p>
					</div>
					<div className='PlayBtn'>
						{!!this.state.data.length && <p className={(this.state.data[this.state.index-1].song)[1]} onClick={this.like.bind(this)}></p>}
						<p className='playBtn' onClick={this.stop.bind(this)}></p>
						<p className='nextBtn' onClick={this.chooseMusic.bind(this)}></p>
					</div>
					<PlayBar music={this.state.music} />
				</div>
				<div className='LrcPage'>
				 <ShowLrc music={this.state.music} sid={this.state.sid}/>
				</div>
				
				<audio id="music" autoPlay='autoplay'></audio>
				{this.state.load && <div className='loading' style={{
					width:'100%',
					height:'100vh',
					background: 'rgba(0,0,0,.5)',
					position: 'fixed',
					zIndex:'99',
					top:'0'					
				}}>load..</div>}
			</div>	
		)
	}		
}

export default MusicPage