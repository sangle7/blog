代码已上传至[github](https://github.com/sangle7/react-native-todolist)

项目展示效果：

![](http://onvaoy58z.bkt.clouddn.com/rntdldisplay2.jpg)

项目目录：

![](http://onvaoy58z.bkt.clouddn.com/rntdlml.JPG)



入口文件为`index.android.js`, 组件代码位于`/src`

```JSX
//index.android.js

import React, {
	Component,
} from 'react';
import {
	AppRegistry,
	Image,
	ListView,
	StyleSheet,
	Text,
	View,
	AsyncStorage
} from 'react-native';
import TodoHeader from "./src/TodoHeader.js";
import TodoMain from "./src/TodoMain.js";
import TodoFooter from "./src/TodoFooter.js";

class AwesomeProject extends Component {
	constructor() {
		super();
		this.state = {
			todos: [],
			isAllChecked: false
		};
	}
	componentWillMount() {
		//读取储存的待办事项
		AsyncStorage.getItem('todolists', (errs, result) => {
			if (result) {
				let _arr = result.split('^')
				let _temp = _arr.map((elem) => {
					return {
						isDone: /true/.test(elem.split('/')[0]) ? true : false,
						text: elem.split('/')[1]
					}
				})
				console.log(_temp)
				let isAllChecked = false;
				if (_temp.every((elem) => elem.isDone)) {
					isAllChecked = true;
				}
				this.setState({
					todos: _temp,
					isAllChecked
				})
			}
		});
	}
	// 判断是否所有任务的状态都完成，同步底部的全选框
	allChecked() {
		let isAllChecked = false;
		if (this.state.todos.every((todo) => todo.isDone)) {
			isAllChecked = true;
		}
		this.setState({
			todos: this.state.todos,
			isAllChecked
		});
	}

	// 添加任务，是传递给Header组件的方法
	addTodo(todoItem) {
		this.state.todos.push(todoItem);
		this.allChecked();
	}

	// 改变任务状态，传递给TodoItem和Footer组件的方法
	changeTodoState(index, isDone, isChangeAll = false) {
		if (isChangeAll) {
			this.setState({
				todos: this.state.todos.map((todo) => {
					todo.isDone = isDone;
					return todo;
				}),
				isAllChecked: isDone
			})
		} else {
			this.state.todos[index].isDone = isDone;
			this.allChecked();
		}
	}

	// 清除已完成的任务，传递给Footer组件的方法
	clearDone() {
		let todos = this.state.todos.filter(todo => !todo.isDone);
		this.setState({
			todos: todos,
			isAllChecked: false
		});
	}

	// 删除当前的任务，传递给TodoItem的方法
	deleteTodo(index) {
		this.state.todos.splice(index, 1);
		this.setState({
			todos: this.state.todos
		});
	}

	componentDidUpdate(nextProp) {
        //储存待办事项(转换为String储存)
		let todoName = this.state.todos.map((elem) => {
			return elem.isDone + '/' + elem.text
		})
		let todoString = todoName.join('^')
		AsyncStorage.setItem('todolists', todoString, (errs) => {
			if (errs) {
				console.log('存储错误');
			}
			if (!errs) {
				console.log(todoString);
			}
		});

	}

	render() {
		let props = {
			todoCount: this.state.todos.length || 0,
			todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
		};
		return (
			<View style={styles.container}>
                <TodoHeader addTodo={this.addTodo.bind(this)}/>
                <TodoMain deleteTodo={this.deleteTodo.bind(this)} todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)}/>
                <TodoFooter isAllChecked={this.state.isAllChecked} clearDone={this.clearDone.bind(this)} {...props} changeTodoState={this.changeTodoState.bind(this)}/>
            </View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```

`TodoHeader`负责处理输入，添加事件
```JSX
//TodoHeader.js

import React from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
} from 'react-native';

export default class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
        };
    }

    handleSubmit(e) {
      //添加事件
        if (this.state.text) {
            let newTodoItem = {
                text: this.state.text,
                isDone: false
            };
            this.props.addTodo(newTodoItem);
            this.setState({
                text: '',
            })
        }
    }

    render() {
        return (
            <View style={styles.View}>
        <TextInput style={styles.TextInput} underlineColorAndroid="#2196f3" selectionColor="#2196f3" placeholder="what's your task ?" onSubmitEditing={this.handleSubmit.bind(this)}  onChangeText={(text) => this.setState({text})} value={this.state.text} />
        <Button style={styles.Button} onPress={this.handleSubmit.bind(this)} title="Add"/>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    View: {
        height: 50,
        width: '100%',
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        width: '80%'
    },
    Button: {
        width: '20%',
        height: 40,
        right: 0,
        fontSize: 15,
        lineHeight: 30,
        textAlignVertical: 'bottom'
    },
});
```

`TodoMain`展示待办事项

```JSX
//TodoMain.js

import React from 'react';
import TodoItem from './TodoItem.js';
import {
    StyleSheet,
    ListView,
    View
} from 'react-native';


class TodoMain extends React.Component {
    // 遍历显示任务，转发props
    render() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let dataSource = ds.cloneWithRows(this.props.todos)
        return (
            <ListView style = {styles.container}
            dataSource = {dataSource}
            renderRow = {(rowData, sectionID, rowID) =><TodoItem key={rowID} {...rowData} index={rowID} {...this.props}/>
        }
        />
    )
}
let styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    }
});
export default TodoMain;
```

`TodoItem`展示每一个待办事项

```JSX
//TodoItem.js

import React from "react";
import {
    Text,
    Button,
    TextInput,
    StyleSheet,
    View
} from 'react-native';
import CheckBox from 'react-native-checkbox';


export default class TodoItem extends React.Component {

    // 处理任务是否完成状态
    handlerChange() {
        let bool = /true/.test(this.props.isDone) ? true : false
        let isDone = !bool;
        this.props.changeTodoState(this.props.index, isDone);
    }

    // 删除当前任务
    handlerDelete() {
        this.props.deleteTodo(this.props.index);
    }

    render() {
        let bool = /true/.test(this.props.isDone) ? true : false
        let styleForText = bool ? styles.TextLine : styles.Text

        return (
            <View style={styles.View}>
            <CheckBox 
            uncheckedImage={require('./checkboxu.png')} 
            checkedImage={require('./checkbox.png')}
            label=''
            checked={bool}
            onChange={this.handlerChange.bind(this)}
            />
                <Text style={styleForText} >{this.props.text}</Text>
                <Button onPress={this.handlerDelete.bind(this)}  title="删除" />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    View: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#2196f3',
        borderBottomWidth: 1
    },
    Text: {
        width: '60%',
        textAlignVertical: 'center',
        textDecorationLine: 'none',
    },
    TextLine: {
        width: '60%',
        textAlignVertical: 'center',
        textDecorationLine: 'line-through',
    },
    Button: {
        width: '20%',
        right: 0,
        fontSize: 15,
        textAlignVertical: 'center'
    },

});
```

`TodoFooter`负责处理事件全选与删除

```JSX
//TodoFooter.js

import React from "react";
import {
    Button,
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';
import CheckBox from 'react-native-checkbox';
export default class TodoFooter extends React.Component {

    // 处理全选与全不选的状态
    handlerAllState(e) {
        if (this.props.isAllChecked) {
            this.props.changeTodoState(null, false, true);
            this.refs.checkbox.state.internalChecked = true;
        } else {
            this.props.changeTodoState(null, this.refs.checkbox.state.internalChecked, true);
            this.refs.checkbox.state.internalChecked = !this.refs.checkbox.state.internalChecked;
        }
    }

    // 绑定点击事件，清除已完成
    handlerClick() {
        this.props.clearDone();
    }

    render() {
        return (
            <View style={styles.View}>
            <CheckBox
            ref='checkbox'
            uncheckedImage={require('./checkboxu.png')} 
            checkedImage={require('./checkbox.png')}
            label=''
            checked={this.props.isAllChecked}
            onChange={this.handlerAllState.bind(this)}
            underlayColor='transparent'
            />
                <Text style={styles.Text} >{this.props.todoDoneCount}已完成 / {this.props.todoCount}总数</Text>
                <Button style={styles.Button} onPress={this.handlerClick.bind(this)} title="清除已完成" />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    View: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    Text: {
        width: '60%',
        textAlignVertical: 'center'
    },
    Button: {
        width: '20%',
        right: 0,
        fontSize: 15,
        textAlignVertical: 'center'
    },

});
```

