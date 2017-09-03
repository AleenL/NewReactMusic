import React from 'react'
import MusicBackground from './MusicBackground'
import PlayBar from './PlayBar'
import Channels from './Channels'
import Ajax from './Ajax'
import ShowLrc from './ShowLrc'
import './MusicPage.css'

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


	componentDidMount(){
		this.getChannels()
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
		console.log(e.target)
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
			setTimeout(()=>(that.setState({load:false})),1000)
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

	stylePage(e){
		let Page = document.getElementsByClassName('MusicPage')[0]
		if(e.target.className.indexOf('style')>-1){
			Page.style.marginLeft = '0px'
		}else if(e.target.className.indexOf('play')>-1){
			Page.style.marginLeft = '-100vw'
		}else{
			Page.style.marginLeft = '-200vw'
		}
	}

render(){
		return (
			<div className='MusicPage'>
				<div className="styleItems">
					<Channels channels={this.state.channels} getMusic={this.getMusic.bind(this)}/>
				</div>				
				<div className='playPage'>
					<MusicBackground state={this.state.playstate} picture={this.state.picture}/>
					<PlayBar music={this.state.music} />
				</div>
				<div className='LrcPage'>
				 <ShowLrc music={this.state.music} sid={this.state.sid}/>
				</div>
				<div className='bottomBtn'>
					<p className='stylePage' onClick={this.stylePage.bind(this)}>1</p>
					<p className='playPage' onClick={this.stylePage.bind(this)}>2</p>
					<p className='lrcPage' onClick={this.stylePage.bind(this)}>3</p>
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