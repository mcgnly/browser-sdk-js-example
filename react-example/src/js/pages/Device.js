import React from "react";

export default

class Device extends React.Component {

    //this is what gets passed to the html, like a template I guess?
    render() {
        //this.props.params.article got passed in from the route in client.js, you can shorten the variable name in the display tag by predefining bits of it here
        const { params } = this.props;
        const { article } = params;
        //the query parameters are found in this,props.location
        const { query } = this.props.location;
        const { date, filter } = query;
        return (
            <div class="panel panel-default">
  <div className="panel-body">
            <div>
            <h1>Archives</h1>
            <h2>{article}</h2>
            <h4> date: {date}, filter {filter}</h4>
            </div>
  < /div> < /div>

        );
    }
}
