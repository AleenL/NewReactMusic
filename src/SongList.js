import React from 'react'
import './SongList.css'

class SongList extends React.Component{
	render(){
		return (
			<div className='SongList'>
				<div className='song'>
					<div className='songListTitle'>
						<p>试听列表</p>
						<p></p>
					</div>
					<div className='songlist'>
						{this.props.data.map((value,index)=>{
							return (
								<div key={index}>
									<div>
										<p>{((value.song)[0].song[0]).title}</p>
										<p>{((value.song)[0].song[0]).artist}</p>										
									</div>
									<p>></p>
								</div>								
							)
						})}							
					</div>			
				</div>
				<div className='like'>
					<div className='likesongTitle'>
						<p>我喜欢的</p>
						<p></p>
					</div>
					<div className='likesong'>					
						{this.props.data.map((value,index)=>{
							if((value.song)[1] !== 'likeBtn') return false;
							return (
								<div key={index}>
									<p>{((value.song)[0].song[0]).title}</p>
									<p>{((value.song)[0].song[0]).artist}</p>
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