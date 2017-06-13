今天面试被问了两次数组去重，简直一部血泪史==|||不忍直视

## 基本方法

### 双重遍历

#### 思路

1. 构建一个新的数组存放结果
2. for循环中每次从原数组中取出一个元素，用这个元素循环与结果数组对比
3. 若结果数组中没有该元素，则存到结果数组中

#### 代码

```javascript
Array.prototype.unique1 = function() {
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (this[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(this[i]);
        }
    }
    return res;
}
var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0]
alert(arr.unique1());
```

这种太基础了没啥好说的。

### 排序后循环

#### 思路

1. 先将原数组进行排序
2. 检查原数组中的第i个元素 与 结果数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置
3. 如果不相同，则将该元素存入结果数组中

#### 代码

```javascript
Array.prototype.unique2 = function() {
    this.sort(); 
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== res[res.length - 1]) {
            res.push(this[i]);
        }
    }
    return res;
}
var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0]
alert(arr.unique2());

```

#### 优点

1. 少遍历一次，节省内存

#### 缺点

1. 顺序和去重前不一致
2. 存在隐式转换

### 对象循环

#### 思路

1. 创建一个新的数组存放结果
2. 创建一个空对象
3. for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。

*说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复。*

#### 代码

```javascript
Array.prototype.unique3 = function() {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
var arr = [112, 112, 34, '你好', 112, 112, 34, '你好', 'str', 'str1'];
alert(arr.unique3());

```

#### 优点

1. 顺序和去重前一致，节省内存

#### 缺点

1. 存在隐式转换

### ES6高级去重

#### 思路

关于[set](http://es6.ruanyifeng.com/#docs/set-map)和[Array.from]()(http://es6.ruanyifeng.com/#docs/array)的更多介绍

#### 代码

```javascript
var arr=[1,1,'1','1,',null,null,undefined,undefined];
var newArr=Array.from(new Set(arr))
console.log(newArr)
```

#### 优势

1. 不会隐式转换
2. 顺序与去重前一致

