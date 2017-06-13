单独把写了一篇ListView基于以下几个原因

1. `ListView`是RN最核心的组件之一
2. 其API众多且复杂，数据传递方式也和其他组件不同
3. 我对`ListView`的掌握还不够熟练=-=


## ListView

> ListView - 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表。最基本的使用方式就是创建一个`ListView.DataSource`数据源，然后给它传递一个普通的数据数组，再使用数据源来实例化一个`ListView`组件，并且定义它的`renderRow`回调函数，这个函数会接受数组中的每个数据作为参数，返回一个可渲染的组件（作为listview的每一行）。

```JSX
constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  };
}
render() {
  return (
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
  );
}
```

先说说如何定义`<ListView>`的每行显示数据

### renderRow

func, (rowData, sectionID, rowID,  => renderable

这个props传输每行渲染的数据，从数据源(Data source)中接受一条数据，以及它和它所在section的ID。返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，不过也可以提供一些转换器。

输出一个react组件

- 只能输出一个，如果想渲染多个组件，请用`<View>`包裹。

#### 参数

- rowData：必需，每行显示的数据，在上面的例子中为'row 1'和'row 2'
- sectionID：非必需，这个我没有用过所以不太清楚作用...
- rowID：非必需，每行的ID，在上例中分别为1和2
- highlightRow：非必需，通过调用highlightRow函数设置高亮行，当一行被高亮时，其两侧的分割线会被隐藏。

### ListView.DataSource

上面的renderRow用于渲染，数据的构建就要用到`ListView.DataSource`

> `ListViewDataSource`为`ListView`组件提供高性能的数据处理和访问。我们需要调用方法从原始输入数据中抽取数据来创建`ListViewDataSource`对象，并用其进行数据变更的比较。原始输入数据可以是简单的字符串数组，也可以是复杂嵌套的对象——分不同区(section)各自包含若干行(row)数据。

### 构建

```JSX
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
```

以下所有参数都是**可选**的

#### rowHasChanged

func,(prevRowData, nextRowData)

定义数据对比方法，每次更新数据后都会自动提取新数据并使用该方法进行逐行对比，以决定哪些行需要重新渲染。

#### sectionHeaderHasChanged

func, (prevSectionData, nextSectionData);

定义数据对比方法，每次更新数据后都会自动提取新数据并使用该方法进行逐行对比，以决定哪些section需要重新渲染。

#### getRowData

func, (dataBlob, sectionID, rowID);

定义提取行数据的方法，如果不设置，会使用默认的`defaultGetRowData`方法来提取行数据

#### getSectionHeaderData

func, (dataBlob, sectionID);

定义提取section标题的方法，如果不设置，会使用默认的`defaultGetSectionHeaderData`方法来提取section标题

### 更新

```JSX
this.setState({
    dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  });
```

#### cloneWithRows

func,(dataBlob, rowIdentities) 

每次更新数据都要调用该方法（如果用到了section，则调用`cloneWithRowsAndSections`方法），数据源（即ds中的数据）本身是不可修改的

在上面的例子中，我们将`['row1','row2']`复制到了数据中。

- dataBlob：必需，需要复制的数据

- rowIdentities：非必需，是一个二维数组，包含了行数据对应的id标识符，例如[['a1', 'a2'], ['b1', 'b2', 'b3'], ...]。如果没有指定此数组，则默认取行数据的key。

  **注意：此方法并不会将数据添加到末尾，而是抛弃了之前的数据，如果你需要保留之前的数据，需要自己先进行新老数据的合并处理，并将结果作为`dataBlob`传递。**

#### cloneWithRowsAndSections

func,(dataBlob, sectionIdentities, rowIdentities)

此方法作用基本等同`cloneWithRows`，区别在于可以额外指定`sectionIdentities` 。如果你不需要section，则直接使用`cloneWithRows`即可。

`sectionIdentities`同理是包含了section标识符的数组。例如['s1', 's2', ...]。如果没有指定此数组，则默认取section的key。

**注意：和`cloneWithRows`一样，此方法并不会将数据添加到末尾，而是抛弃了之前的数据。**