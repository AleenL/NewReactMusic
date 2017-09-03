import React from 'react'
import './PlayBar.css'

class PlayBar extends React.Component{
constructor(props){
		super(props);
		this.state={
			time:"00:00"
		}
	}	
	componentDidUpdate(nextProps){
		if(this.props.music !== nextProps.music){
			setInterval(()=>this.getTime(this.props.music.currentTime),1000)

		}
	}

	getTime(node){
		
		let [Min,Sec,now,all] = [
			Math.floor(node/60),
			Math.floor(node%60),
			(node/this.props.music.duration).toFixed(4)*100+'%',
			Math.floor(this.props.music.duration)]
		if(Sec<10){Sec=`0${Sec}`}
		this.setState({
			time:`0${Min}:${Sec}`,
			now:now,
			all:all
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
			<div className="progress" >
            	<div className="bar" onClick={this.changeTime.bind(this)} >
               		<div style={{width:this.state.now}} className="progress-now"></div>
            	</div>
            	<div className="time">{this.state.time}</div>
        	</div>			
		)
	}
}

export default PlayBar