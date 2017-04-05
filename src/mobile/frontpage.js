import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom';
import styleB from "./css/container.scss";
import Articlelist from "./articlelist.js";
import Article from './article.js';
import Musicplayer from './Musicplayer.js'
import Aboutme from "./aboutme.js";

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



export default @observer class Frontpage extends React.Component {
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
	backtotop() {
		var timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn() {
			var oTop = document.body.scrollTop || document.documentElement.scrollTop;
			if (oTop > 0) {
				document.body.scrollTop = document.documentElement.scrollTop = oTop - 200;
				timer = requestAnimationFrame(fn);
			} else {
				cancelAnimationFrame(timer);
			}
		})
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
		const actions = [<FlatButton label="Close" primary={true} onTouchTap={this.handleWcClose}/>, ];

		return (<Router>
	<div>
	<div><AppBar onDoubleClick={this.backtotop.bind(this)} title={AppState.appbar} titleStyle={{'fontSize':'1rem','lineHeight':'56px'}} style={{'position':'fixed','top':'0','height':'56px','background':'#FF5252'}}
    iconStyleLeft={{'height':'56px','width':'56px'}} onLeftIconButtonTouchTap={this.handleToggle}
  /> <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          swipeAreaWidth={100}
		width = {
			document.body.clientWidth-56
		}
		style={{'overflowX':'hidden'}}
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
        </Drawer></div>
		<div className={styleB.container}>
		<Switch>
		<Route exact path='/' component={Articlelist}/>
		<Route path='/mobile' component={Articlelist}/>
		<Route exact path="/articles/编程" component={Articlelist}/>
		<Route exact path="/articles/生活" component={Articlelist}/>
		<Route path="/articles/编程/:id" component={Article}/>
		<Route path="/articles/生活/:id" component={Article}/>
		<Route path="/music" component={Musicplayer}/>
		<Route path="/aboutme" component={Aboutme}/>
		</Switch>
		</div>
	</div>
</Router>)
	}
}