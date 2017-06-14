import React from "react";

export default class ErrorPage extends React.Component {
    componentWillMount() {
        document.title = "Error";
    }
    render() {
        return (
            <div style={{'width':'100%'}}>
			<h1 style={{'margin':'200px auto 0 auto','textAlign':'center','color':'#222222'}}>404 Error</h1>
			<h3 style={{'margin':'30px auto','textAlign':'center','color':'#222222'}}>本页是不存在的，你们还是要提高自己的姿势水平</h3>
		</div>)
    }
}
