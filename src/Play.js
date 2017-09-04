import React from 'react'
import './Play.css'
import MusicPage from './MusicPage'


class Play extends React.Component{

	stylePage(e){
		let Page = document.getElementsByClassName('MusicPage')[0]
		if(e.target.className.indexOf('style')>-1){
			Page.style.marginLeft = '0px'

		}else if(e.target.className.indexOf('play')>-1){
			Page.style.marginLeft = '-100vw'
		}else if(e.target.className.indexOf('song')>-1){
			Page.style.marginLeft = '-300vw'
		}else{
			Page.style.marginLeft = '-200vw'
		}
	}

	render(){
		return(
			<div className='musicPlay'>
				<MusicPage />
				<div className='bottomBtn'>
					<p className='stylePage' onClick={this.stylePage.bind(this)}>1</p>
					<p className='playPage' onClick={this.stylePage.bind(this)}>2</p>
					<p className='lrcPage' onClick={this.stylePage.bind(this)}>3</p>
					<p className='songPage' onClick={this.stylePage.bind(this)}>4</p>
				</div>				
			</div>
		)
	}
}

export default Play