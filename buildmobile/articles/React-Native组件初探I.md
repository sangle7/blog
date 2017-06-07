这几天在修改之前用RN写的todolist，就我在这个项目中用到的组件写一写自己的想法。

## View

`View`是一个支持Flexbox布局、样式、一些触摸处理的容器。对应HTML中的`<div>`

```JSX
<View style={styles.container}>
              <Text style={{color:'white', fontSize: 18}}>所有任务</Text>
            </View>
```

+ 最基本的组件，常用于包裹其他子组件。
+ 通常要设置Flexbox布局（使用`flexDirection`、`alignItems`和 `justifyContent`三个样式属性）
+ 我觉得`<View>`基本是个纯展示层，通常不参与触摸等动作响应（你应该使用`<TouchableOpacity>`或`<TouchableHighlight>`）

## Text

一个用于显示文本的React组件，也支持嵌套、样式，以及触摸处理。

```JSX
renderText: function() {
  return (
      <Text onPress={this.onPressTitle}>
        HELLO WORLD
      </Text>
      <Text numberOfLines={5}>
      HI
      </Text>
  );
},
```

+ 注意：所有文字必须用`<Text>`组件包裹，不能直接写在`<View>`等容器中

### 常用props

#### adjustsFontSizeToFit

bool, 指定字体是否随着给定样式的限制而自动缩放。

#### numberOfLines

number, 用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。

#### selectable

func, 决定用户是否可以长按选择文本，以便复制和粘贴。

## DrawerLayoutAndroid

救命组件，封装了平台`DrawerLayout`的React组件。`DrawerLayoutAndroid`的直接子视图会成为主视图（用于放置你的内容）。

```JSX
render: function() {
  var navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff',padding:30}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text style={styles.Text} onPress={this.handleCategory.bind(this,rowData)}>{rowData}</Text>}
      />
    </View>
		);
		return (
			<DrawerLayoutAndroid
			ref='DRAWER'
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <View style={{flex: 1, alignItems: 'center'}}>
      <Appbar openDrawer={this.openDrawer.bind(this)}/>
      <TodoSection />
      </View>
      <ColoredRaisedButton  ref="raisedButton">
      <Icon name="add" size={30} color="#FFF"/>
      </ColoredRaisedButton>
    </DrawerLayoutAndroid>
  );
},
```

放张官方的图举个例子

![](http://reactnative.cn/static/docs/0.43/img/components/drawerlayoutandroid.png)

### 常用props

#### renderNavigationView

func, 用于绘制抽屉内的组件，使用方法可以参照上面的例子

#### drawerPosition 

enum(DrawerConsts.DrawerPosition.Left, DrawerConsts.DrawerPosition.Right), 用于指定抽屉可以从屏幕的哪一边拖入

#### drawerWidth 

number, 指定抽屉的宽度。

#### onDrawerOpen 

func, 每当抽屉被打开之后调用此回调函数。

#### onDrawerClose 

func, 每当抽屉被打开之后调用此回调函数。

### 常用方法

#### openDrawer()

打开抽屉

#### closeDrawer()

关闭抽屉

**通过添加ref调用**：

```JSX
openDrawer() {
		this.refs['DRAWER'].openDrawer()
	}
render() {
		var navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff',padding:30}}></View>
		);
		return (
			<DrawerLayoutAndroid
			ref='DRAWER'
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <Appbar openDrawer={this.openDrawer.bind(this)}/>
    </DrawerLayoutAndroid>
		);
	}
```

## Button

一个简（丑）单（陋）的跨平台的按钮组件。

```JSX
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

官方例图：

![](http://reactnative.cn/static/docs/0.43/img/components/buttonExample.png)



### 常用props

#### color 

color, 文本的颜色(iOS)，或是按钮的背景色(Android)

#### disabled

bool, 设置为true时此按钮将不可点击

#### onPress 

func, 用户点击此按钮时所调用的处理函数

#### title 

string, 按钮内显示的文本



由于自带的button组件可定制性不强，（而且在安卓上挺突兀的=-=）我们通常会使用`<TouchableOpacity>`或`<TouchableHighlight>`自定义按钮，或者也可以选择第三方库。这里安利两个我在项目中用到的并且感觉不错的组件库

+ [**react-native-material-kit**](https://github.com/xinthink/react-native-material-kit):含有包括按钮，进度条，多选框在内的多个组件，符合material design，按钮触摸时的动画效果做的非常好，强烈推荐。
+ [**react-native-vector-icons**](https://github.com/oblador/react-native-vector-icons):图标包，含有几千个图标，质量非常高，同时也可以定义带图标的按钮，导航栏以及Toolbar。

## TouchableHighlight

用于自定义按钮，当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。用不好就车祸。

```JSX
renderButton: function() {
  return (
    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('./button.png')}
      />
    </TouchableHighlight>
  );
},
```

> **注意**：`<TouchableHighlight>`只支持一个子节点
>
> 如果你希望包含多个子组件，用一个`<View>`来包装它们。

### 常用props

#### activeOpacity 

number, 指定封装的视图在被触摸操作激活时以多少不透明度显示（通常在0到1之间）。

#### onHideUnderlay 

func, 当底层的颜色被隐藏的时候调用。

#### onShowUnderlay 

func, 当底层的颜色被显示的时候调用。

#### underlayColor 

string, 有触摸操作时显示出来的底层的颜色。

## TouchableOpacity

同样用于自定义按钮，当按下的时候，封装的视图的不透明度会降低。比上面那个适用范围广，~~但都不如第三方库~~，不是，不存在的。但是我还是要说，这货真的很丑啊......

```JSX
renderButton: function() {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('image!myButton')}
      />
    </TouchableOpacity>
  );
},
```

### 常用props

#### activeOpacity 

number, 指定封装的视图在被触摸操作激活时以多少不透明度显示（通常在0到1之间）。

