import React from 'react'

class SongList extends React.Component{
	render(){
		return (
			<div>
				<div>
					{this.props.data.map((value,index)=>{
						return <p key={index}>{((value.song)[0].song[0]).title}</p>
					})}					
				</div>
				<div>
					{this.props.data.map((value,index)=>{
						if((value.song)[1] !== 'likeBtn') return false;
						return <p key={index}>{((value.song)[0].song[0]).title}</p>
					})}					
				</div>				
			</div>		
		)
	}
}

export default SongList