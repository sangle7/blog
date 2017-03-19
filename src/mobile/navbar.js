import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import {
	observer
} from 'mobx-react';
import {
	AppState
} from './AppState.js';
import style from "./css/sidebar.scss";
import Back from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default @observer class Navbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			wcopen: false,
		};
	}

	handleHover() {
		AppState.showWechatImg();
	}
	handleOut() {
		AppState.hideWechatImg();
	}

	handleToggle = () => this.setState({
		open: !this.state.open
	});

	handleClose = () => this.setState({
		open: false
	});


	handleOpen = () => {
		this.setState({
			wcopen: true
		});
	};

	handleWcClose = () => {
		this.setState({
			wcopen: false
		});
	};


	render() {
		const actions = [
			<FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleWcClose}
      />,
		];

		return (<div><AppBar title={AppState.appbar} style={{'position':'fixed','height':'70px','top':'0','background':'#EA6F5A'}}
    iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={this.handleToggle}
  /> <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          swipeAreaWidth={null}
		width = {
			0.75 * document.body.clientWidth
		}
        >
        <div className={style.sidebar}>
		<div className={style.personalinfo}>
			<img src={require('./../img/info.jpg')}className={style.infopic}/>
			<p>Sangle</p>
			</div>
			<address className={style.address}>
		<div className={style.infoline}>
				<div>
				<i className="fa fa-github" aria-hidden="true"></i>
				<a href="https://github.com/sangle7"> Sangle7</a>
				</div>
				<div>
				<i className="fa fa-weibo" aria-hidden="true"></i>
				<a href="http://weibo.com/523374254"> 4ever_Sangle</a>
				</div>
			</div>
			<div className={style.infoline}>
				<div onClick={this.handleOpen} >
				<i className="fa fa-weixin" aria-hidden="true"></i>
				<a href="#"> Sangle</a>
				</div>
				<div>
				<i className="fa fa-envelope-o" aria-hidden="true"></i>
				<a href="mailto:whb97@163.com"> SangleWang</a>
				</div>
			</div>
			</address>
		</div>
		 <Menu>
        <Link to='/'><MenuItem primaryText="所有文章"  onTouchTap={this.handleClose}/></Link>
         <Divider />
          <Link to='/articles/编程'><MenuItem primaryText="编程"  onTouchTap={this.handleClose}/></Link>
          <Link to='/articles/生活'><MenuItem primaryText="生活"  onTouchTap={this.handleClose}/></Link>
           <Divider />
         <Link to='/music'><MenuItem primaryText="音乐"  onTouchTap={this.handleClose}/></Link>
          <Divider />
		<Link to='/aboutme'><MenuItem primaryText="关于我"  onTouchTap={this.handleClose}/></Link>
		</Menu>
		<Dialog
          title="Wechat"
          actions={actions}
          modal={false}
          open={this.state.wcopen}
          onRequestClose={this.handleClose}
        >
          <img src={require('./../img/wechati.jpg')} style={{ 'marginLeft': '50%', 'transform': 'translateX(-50%)'}}height="150" width="150"/>
        </Dialog>
        </Drawer></div>)
	}
}