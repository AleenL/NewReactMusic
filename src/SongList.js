import React from 'react'
import './SongList.css'

class SongList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[]
		}
	}


	componentWillReceiveProps(nextProps){
		let data = []
		if(nextProps.data.length>=1){
			this.props.data.forEach((value,index)=>{
				if((value.song)[1] === 'likeBtn'){
					data.push(value)
				}
			})
		}
		this.setState({data:data})
		console.log(this.state.data)
	}

	show(e){
		if(e.target.nodeName !== 'DIV') return false;
		var node = e.target.children[1],nextNode = e.target.nextSibling
		if(e.target.getAttribute('data') === 'hide'){
			node.style.transform = 'rotateZ(90deg)'
			e.target.setAttribute('data','show')
			nextNode.style.display='block'			
		}else{
			node.style.transform = 'rotateZ(0deg)'
			e.target.setAttribute('data','hide')
			nextNode.style.display='none'			
		}
	}

	ListPlay(e){
		this.props.ListPlay(e)
	}

	render(){
		return (
			<div className='SongList'>
				<div className='song'>
					<div className='songListTitle' data='hide' onClick={this.show.bind(this)} >
						<p>试听列表</p>
						<p className='ShowList'></p>
					</div>
					<div className='songlist'>
						{this.props.data.map((value,index)=>{
							return (
								<div key={index} className={`song${index}`} onClick={this.ListPlay.bind(this)}>
									<div>
										<p>{((value.song)[0].song[0]).title}</p>
										<p>{((value.song)[0].song[0]).artist}</p>										
									</div>
									<p className='PlayThis'></p>
								</div>								
							)
						})}							
					</div>			
				</div>
				<div className='like'>
					<div className='likesongTitle'  data='show' onClick={this.show.bind(this)}>
						<p>我喜欢的</p>
						<p className='ShowList'></p>
					</div>
					<div className='likesong'>					
						{this.state.data.map((value,index)=>{
							return (
								<div key={index} className={`like${index}`} onClick={this.ListPlay.bind(this)}>
									<div>
										<p>{((value.song)[0].song[0]).title}</p>
										<p>{((value.song)[0].song[0]).artist}</p>										
									</div>
									<p className='PlayThis'></p>
								</div>								
							)
						})}	
					</div>				
				</div>				
			</div>		
		)
	}
}

export default SongList