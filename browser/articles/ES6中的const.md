原文：https://medium.com/the-node-js-collection/what-does-const-stand-for-in-es6-f7ab3d9e06fc

----

如果你先前学过C语言，你可能会好奇为什么第一个JavaScript代码是有效的，但是第二个C程序会使编译器失败。

```javascript
# JavaScript
const numbers = [1, 2, 3, 4, 6]
numbers[4] = 5
console.log(numbers[4]) // print 5 
```

```javascript
# C
const int numbers[] = {1, 2, 3, 4, 6};
numbers[4] = 5; // error: read-only variable is not assignable
printf("%d\n", numbers[4]); 
```

原因是在C语言中，`const`定义的是只读而不可更改的变量，而在JavaScript中，`const`定义的变量并不是只读的。相反，它创建了一个不可变的绑定（对该值的只读引用），并保证不会重新分配。因此，以下代码将抛出错误：

```javascript
const numbers = [1, 2, 3, 4, 6]
numbers = [7, 8, 9, 10, 11] // error: assignment to constant variable
console.log(numbers[4])
```

为了更好地理解变量的概念，我们来看一下下面的图像，其中解释了变量标识符（或变量名），其值和物理内存之间的通用关系。

![](http://onvaoy58z.bkt.clouddn.com/const1.png)



从模式图中可以看出，变量标识符通过一个地址（引用）来指向物理内存单元，其中存储了赋值给变量的值。 只读变量不允许更改其值。 对该值的只读参考根本不允许重新分配变量标识符，但是标识符本身保持的值仍然可以改变。 例如，在JavaScript中，当值是一个对象时，对象本身可以被改变。

## 使value不可变

[原始数据类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)总是不可变的，因为它们的性质。 以下代码片段直观地解释了为什么。

```javascript
# Example 1
const a = 10
a = a + 1 // error: assignment to constant variable
# Example 2
const isTrue = true
isTrue = false // error: assignment to constant variable
# Example 3
const sLower = 'hello world'
const sUpper = sLower.toUpperCase() // create a new string
console.log(sLower) // print hello world
console.log(sUpper) // print HELLO WORLD
```

想要使对象的值不可变，你可以运用`Object.freeze()`。然而，它只在属性值对对象中生效，这意味着它不能与其他对象（如Date，Map和Set）配合使用。

```javascript
# Example 4
const me = Object.freeze({name: “Jacopo”})
me.age = 28
console.log(me.age) // print undefined
# Example 5
const arr = Object.freeze([-1, 1, 2, 3])
arr[0] = 0
console.log(arr[0]) // print -1
# Example 6
const me = Object.freeze({
  name: 'Jacopo', 
  pet: {
    type: 'dog',
    name: 'Spock'
  }
})
me.pet.name = 'Rocky'
me.pet.breed = 'German Shepherd'
console.log(me.pet.name) // print Rocky
console.log(me.pet.breed) // print German Shepherd
```

在最后一个例子中，冻结对象中的嵌套对象仍然可以被改变。要使对象值完全不变，您可能需要使用自定义[deepFreeze()方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)。 另一个选择是使用[Immutable.js](https://facebook.github.io/immutable-js/)，这个库并不会将对象变成不可变的，而是提供了许多Persistent Immutable数据结构，包括List，Stack，Map，OrderedMap，Set，OrderedSet和Record。

## var/let/const

在ES6中，开发人员不应该使用`var`定义变量或常量。 事实上，当您在JavaScript中定义变量时，`var`现在是最弱的变量信号。

一个明确定义的变量不应用于表示多个概念。 这样可以确保代码更清晰，更易于理解。 由于JavaScript中的`const`意味着不能重新分配标识符，所以最好对程序中不应重新分配的所有标识符使用`const`。 然而，当需要重新分配标识符时，程序员应该使用`let`。 例如通常情况下，循环结构中的计数器或算法子例程中的值交换。

## 最后

重申一遍：如果您使用ES6代码，默认情况下使用`const`，不要使用`var`，并在需要重新绑定的地方使用`let`。 如果您对此有任何疑问，请在[Jacopo Daeli](https://twitter.com/JacopoDaeli)上与我联系。