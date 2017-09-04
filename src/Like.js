import React from 'react'

class Like extends React.Component{
	componentDidUpdate(nextProps){
		if(this.props.data !== nextProps.data){
			console.log(2)
		}
	}

	like(e){
		if(!e) return;
		this.props.Like(e)
	}

	render(){
		return <p>{!!this.props.data.length && <p className={(this.props.data[this.props.index-1].song)[1]} onClick={this.like.bind(this)}></p>}</p>
	}
}

export default Like