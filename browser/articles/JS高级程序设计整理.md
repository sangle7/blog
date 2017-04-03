**只记自己不熟的**

## 数据类型

基本数据类型：`Undefined Null Boolean Number String`

复杂数据类型（引用类型）：`Object` （包括`Array function Object Math Date RegExp`）

基本包装类型：`Boolean String Number`**只在直接赋值(`let x='hi'`)时**

### 类型检验操作符

+ typeof

  ```javascript
  typeof(123)//"number"
  typeof(x)//"undefined"
  typeof('hello')//"string"
  typeof(null)//"object"
  typeof(true)//"boolean"
  typeof(function(){...})"function"
  ```

+ instance of **只能用于对象**

  ```javascript
  value instance of Array //return true or false 
  p instance of Person//检查Person的原型是否在p的原型链上
  ```

  ​

## 函数

### 参数（arguments）

> arguments对象是类数组，命名参数在函数中并不是必须的

```javascript
function doAdd(num1,num2){
  if(arguments.length==1){
    alert(num1+10);
  }else if(arguments.length==2){
    alert(arguments[0]+num2)
  }
}
```

### new Operator

假如我们new了一个Foo函数，那么发生了什么事情？new操作总共干了三件事。

1. 第一件事情就是创造一个继承 Foo.prototype的新对象。
2. 第二件事情就是Foo函数使用new的时候输入的参数被执行，把Foo函数的this重新绑定新的对象。
3. 构造函数Foo执行的返回值作为新的表达式。如果没有返回，那么之前生成的对象，就作为返回。

## 优化

### 垃圾收集机制

+ 标记清除

  > 当变量进入环境就将其标记为**进入环境**，从逻辑上讲，永远不能释放进入环境的变量所占用的内存。而当变量离开环境时，将其标记为**离开环境**

+ 引用计数

  > 跟踪每个值被引用的次数，当这个值的引用次数变为0时，将其占用的内存回收。
  >
  > 存在的问题：*循环引用*



## 原型和原型链

> 每个函数都有一个prototype属性

### 继承

