import React from 'react'
import './PlayBar.css'

class PlayBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			time:"00:00",
			all:'00:00'
		}
	}	
	componentDidUpdate(nextProps){
		if(this.props.music !== nextProps.music){
			setInterval(()=>this.getTime(this.props.music.currentTime),1000)
			this.props.music.ended=function(){
				console.log('end')
			}
		}
	}

	getTime(node){	
		let [Min,Sec,now,all] = [
			Math.floor(node/60),
			Math.floor(node%60),
			(node/this.props.music.duration).toFixed(4)*100+'%',
			Math.floor(this.props.music.duration)]
		if(Sec<10){Sec=`0${Sec}`} 

		let last = all - node+1;
		if(isNaN(last)) return;
		let lastMin = Math.floor(last/60),
			lastSec = Math.floor(last%60)
		if(lastSec<10){lastSec=`0${lastSec}`} 
		this.setState({
			time:`0${Min}:${Sec}`,
			now:now,
			all:`0${lastMin}:${lastSec}`
		})
	}

	changeTime(e){
		let time;
		if(e.target.className.indexOf('bar')>-1){
			time = (e.pageX-e.target.offsetLeft)/e.target.clientWidth*this.props.music.duration
		}else(
			time = (e.pageX - e.target.parentNode.offsetLeft)/e.target.parentNode.clientWidth*this.props.music.duration)
		this.props.music.currentTime = time
		
	}

	render(){
		return(
			<div className='playBar'>
				<div className="time">{this.state.time}</div>
				<div className="progress" >
            		<div className="bar" onClick={this.changeTime.bind(this)} >
               			<div style={{width:this.state.now}} className="progress-now"></div>
            		</div>
        		</div>
        		<div className="time">{this.state.all}</div>
        	</div>		
		)
	}
}

export default PlayBar