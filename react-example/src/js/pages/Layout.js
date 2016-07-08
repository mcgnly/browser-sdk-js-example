import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router";

export default

class Layout extends React.Component{
constructor(){
	//you have to do the super() thing first if you are doing a constructor
	super();
//if the state changes, it rerenders the DOM in the most efficient way, by havign a "virtual dom"
//state is good for things that are used ONLY here (in this case layout and nothing else), props are good for something that gets injected into other components like header or we
	this.state = {title1: "I'm a state!"};
}

//can make a method that does something like taking an input and passing it into a displayed state
changeTitle(title){
	this.setState({title});
}

//this is what gets passed to the html, like a template I guess?
	render() {
        //props are a bit different because they can persist between components. I can define it here, pass it to header below in the one Header title= thing...
		const title = "I'm a prop!";
        const { history }= this.props; //this can look up whether or not a page is active
        const containerStyle = {marginTop: "60px" };//you can put some css styleing here too, if you want to
    return (

			//putting things in {} in the returned means it evaluates, so it's for things like variables or math
			// <h1>Hello, it is me, {this.name}!</h1>
			//this form with the slash is how you bring in the imported thing, like a <div> or whatever
			//it's caps'd because it's a constructor- it has the capacity to render a DOM element

        //you can change the state with something like: fnName(()=>{this.setState({name:"bob"})})

        //here with the changeTitle thing you have to explicitly bind it to this particular place, so the method only gets run here, because in this case we're passing a function around
        	//it only hot-updates the title based on the input in the changeTitle version of the header because only in that one do we pass through all the methods to change it
      <div>
        <Header title = {this.state.title1} />
        <Header title = {title} />
        <Header changeTitle = {this.changeTitle.bind(this)} title = {"look another prop "+this.state.title} />
        <h1>I am in the layout</h1>
        <div className ="container" style ={containerStyle}>
        {this.props.children}
        <Link to="archives" className ="btn btn-success">archives</Link>
        <Link to="settings" className ="btn btn-success">settings</Link>
        <Link to="featured" className ="btn btn-success">featured</Link>
        </div>
        <Footer />
      </div>
    );
//in normal html, you would have class instead of className. but here, "class" is reserved for the class-ness up at the top
  }

}
