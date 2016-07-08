import React from "react";

export default

class Title extends React.Component{

//this is what gets passed to the html, like a template I guess?
	render(){
		//this.props.title got piped in from header from layout, and is actually being displayed here
		return (
			<div>
			<h1>{this.props.title}</h1>
			
			</div>
			);
	}
}