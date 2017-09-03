import React from 'react'
import './Channels.css'

class Channels extends React.Component{
	constructor(props){
		super(props);
		this.state={
			imgUrl:[require('./IMG/music1.jpg'),
			require('./IMG/music2.jpg'),
			require('./IMG/music3.jpg'),
			require('./IMG/music4.jpg'),
			require('./IMG/music5.jpg'),
			require('./IMG/music6.jpg'),
			require('./IMG/music7.jpg'),
			require('./IMG/music8.jpg'),
			require('./IMG/music9.jpg'),
			require('./IMG/music10.jpg'),
			require('./IMG/music11.jpg'),
			require('./IMG/music12.jpg'),
			require('./IMG/music13.jpg'),
			require('./IMG/music14.jpg'),]
		}
	}	
	componentDidUpdate(nextProps){
		if(this.props.music !== nextProps.music){
			this.getChannels(nextProps.music)
		}
	}

	getMusic(e){
		if(!e) return;
		this.props.getMusic(e)
	}

	render(){
		return(
			<div className='styleList'>
				{this.props.channels.map((value,index)=>{
					return (
						<p key={index} 
						className={value.channel_id} 
						onClick={this.getMusic.bind(this)}
						style={{backgroundImage:'url('+this.state.imgUrl[index%14]+')'}}
						><span className={value.channel_id} >{value.name}</span></p>
					)
				})}
			</div>
		)
	}
}

export default Channels