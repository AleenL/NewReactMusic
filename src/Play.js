import React from 'react'
import './Play.css'
import MusicPage from './MusicPage'

class Play extends React.Component{
	render(){
		return(
			<div className='musicPlay'>
				<MusicPage />
			</div>
		)
	}
}

export default Play