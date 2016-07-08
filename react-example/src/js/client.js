import React from "react";
import ReactDOM from "react-dom";
import Layout from "./pages/Layout";
import User from "./pages/User";
import Device from "./pages/Device";
// import Transmitter from "./pages/Transmitter";
// import Model from "./pages/Model";
// import Group from "./pages/Group";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
// import Bootstrap from "./vendor/bootstrap-without-jquery";

const app = document.getElementById('app');

//now instead of rendering the layout directly, we're rendering the router, which picks what thigs it is supposed to make the page from
//the history thing does something with making the back button work?
//you give the router the path of the child it should render here, so when it sees that path, it can load that cmoponent
//the :device part is a param in the url
//wrapping it in () makes it optional 
ReactDOM.render(
    <Router history = {hashHistory}>
		<Route path="/" component={Layout}>
		</Route>
		<IndexRoute component={User}>
		</IndexRoute>
		<Route path="devices(/:device)" name="devices" component={Device}>
		</Route>
		
	</Router>,
    app
);


