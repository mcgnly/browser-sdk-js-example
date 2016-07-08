import React from "react";
import Title from "./Header/Title"

export default

class Header extends React.Component{

//this is the method that is being called below
	//it gets the element "onChange", gets the relevant value out of it, calls the changeTitle method which lives in the layout, which sets the state 
	handleChange(element){
		const title = element.target.value;
		this.props.changeTitle(title);
	}

//this is what gets passed to the html, like a template I guess?
	render(){
		//this.props.title got piped in from layout and is being piped further to the title.js thing
		//onChange executes the fn that's assigned to it
			//bound to this context as well to make sure it runs here
		//the input value defaults to this.props.title
		return (
			<div>
			<Title title={this.props.title} />
			<input onChange={this.handleChange.bind(this)} />
			</div>
			);
	}
}

