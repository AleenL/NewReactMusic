import React from 'react'
import MusicBackground from './MusicBackground'
import Channels from './Channels'
import Ajax from './Ajax'

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
		}
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

	getMusic(e){
		this.setState({load:true})
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
				load:false,
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

render(){
		return (
			<div>
				<MusicBackground state={this.state.playstate} picture={this.state.picture}/>
				<p onClick={this.getChannels.bind(this)}>获取音乐</p>
				<Channels channels={this.state.channels} getMusic={this.getMusic.bind(this)}/>
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