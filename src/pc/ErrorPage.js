import React from "react";

export default class ErrorPage extends React.Component {
    componentWillMount() {
        document.title = "Error";
    }
    render() {
        return (
            <div style={{'width':'100%','height':'100%'}}>
			<h1 style={{'margin':'200px auto 0 auto','textAlign':'center'}}>404 Error</h1>
			<h4 style={{'margin':'30px auto','textAlign':'center'}}>本页是不存在的，你们还是要提高自己的姿势水平</h4>
		</div>)
    }
}
