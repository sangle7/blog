import React from "react";

export default class loading extends React.Component {

	render() {
		return (
			<div ref='loading' className={style.loading}>
		  <div className="spinner bounce1"></div>
		   <div className="spinner bounce2"></div>
		   <div className="spinner bounce3"></div>
		</div>)
	}
}