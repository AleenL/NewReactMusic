import React from 'react'import './musicBackground.css'class MusicBackground extends React.Component{	componentDidUpdate(nextProps){		if(this.props.state !== nextProps.state){					this.animate(this.props.state)		}	}	animate(node){		let animate = document.getElementsByClassName('musicBackground')[0],			point =  document.getElementsByClassName('MusicPoint')[0]		if(node){			animate.style.animationPlayState = 'paused'			point.style.webkitTransform='rotateZ(-14deg)'		}else{			animate.style.animationPlayState = 'running'			point.style.webkitTransform='rotateZ(0deg)'		}	}	render(){		return (			<div>				<a className='MusicPoint'><img src={require('./IMG/point.png')}/></a>				<div 				className='musicBackground' >										<p style={{backgroundImage:`url(${this.props.picture})`}}>						<span></span>					</p>				</div>							</div>					)	}}export default MusicBackground