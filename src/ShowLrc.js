import React from 'react'
import Ajax from './Ajax'
import './ShowLrc.css'

class ShowLrc extends React.Component{
	constructor(props){
		super(props);
		this.state={
			lrc:[],
			state:true,
			sid:null,
		}
	}

	componentDidUpdate(nextProps){
		if(this.props.sid !== nextProps.sid){
			this.getLrc(this.props.sid)

		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.sid){
			this.getLrc(this.props.sid)
		}

	}


	getLrc(sid){
		console.log(1)
		let that = this;
		let audioObject = new Ajax('https://jirenguapi.applinzi.com/fm/getLyric.php','get',{sid:sid},false)
		audioObject.getMsg().then(function(data){
			that.setState({state:false})
			that.showLrc(data.lyric)
		})		
	}

	showLrc(lyric){
		var that = this;
		var lines = lyric.split('\n'),
	        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	        result = []
	    while (!pattern.test(lines[0])) {
	        lines = lines.slice(1);
	    }
	    console.log(lines)
	    lines[lines.length - 1].length === 0 && lines.pop()
	    lines.forEach(function(v,i,a){
	    	var time = v.match(pattern),
	    		value = v.replace(pattern,'')
	    	if(time == null) return;
	    	time.forEach(function(v1,i1,a1){
	    		var t = v1.slice(1,-1).split(':')
	    		result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
	    	})
	    })

	    result.sort(function(a, b) {
	        return a[0] - b[0];
	    })
	    this.setState({
	    	lrc:result
	    })
	    let LrcList = document.getElementsByClassName('LrcList')[0]
		this.props.music.ontimeupdate = function(){
			for (var i = 0, l = result.length; i < l; i++){
				if(that.props.music.currentTime>result[i][0]){
					LrcList.style.top=-i*40+200+'px'
					for(let i=0;i<LrcList.getElementsByTagName("li").length;i++){
						LrcList.getElementsByTagName("li")[i].style.color='rgba(255,255,255,.7)'
					}
					LrcList.children[i].style.color = '#1abc9c'

				}
			}
		}	    
	}



	render(){
		return(
			<div id='Lyric-page'>
				<ul className='LrcList'>
					{this.state.lrc.map((value,index)=>{
						return( <li key={index}>{value[1]}</li>)
					})}
					{this.state.state && <div className='seachLrc'><img src={require('./IMG/Lrc.png')}/></div>}
				</ul>
			</div>
		)
	}
}

export default ShowLrc
	
