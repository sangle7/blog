## 启动与停止

**启动:** `net start MySQL`

**停止:** `quit;`+`net stop MySQL`

**卸载:** `sc delete MySQL`

## 登录

cmd >`mysql -h 主机名 -u 用户名 -p`

- **-h : **该命令用于指定客户端所要登录的MySQL主机名, 登录当前机器该参数可以省略;
- **-u : **所要登录的用户名;
- **-p : **告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

## 数据库

### 创建数据库

`create database 数据库名 [其他选项];`

为了便于在命令提示符下显示中文, 在创建时通过 character set gbk 将数据库字符编码指定为 gbk。

`create database samp_db character set gbk;`

> **注意:** MySQL语句以分号(;)作为语句的结束, 若在语句结尾不添加分号时, 命令提示符会以 -> 提示你继续输入(有个别特例, 但加分号是一定不会错的);
>
> **提示:** 可以使用 show databases; 命令查看已经创建了哪些数据库。

利用`use 数据库名`选择数据库

### 创建数据库表

`create table 表名称(列声明);`

对于一些较长的语句在命令提示符下可能容易输错, 因此我们可以通过任何文本编辑器将语句输入好后保存为 createtable.sql 的文件中, 通过命令提示符下的文件重定向执行执行该脚本。

```mysql
create table students(
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		name CHAR(8) not null,
		sex CHAR(4) not null,
		age tinyint unsigned not null,
		tel CHAR(13) null default "-",
		primary key(id)
	);
```

`mysql -D 数据库名 -u root -p < createtable.sql`

**语句说明**：以 `id int unsigned not null auto_increment primary key`行进行介绍:

- "id" 为列的名称;
- "int" 指定该列的类型为 int(取值范围为 -8388608到8388607), 在后面我们又用 "unsigned" 加以修饰, 表示该类型为无符号型, 此时该列的取值范围为 0到16777215;
- "not null" 说明该列的值不能为空, 必须要填, 如果不指定该属性, 默认可为空;
- "auto_increment" 需在整数列中使用, 其作用是在插入数据时若该列为 NULL, MySQL将自动产生一个比现存值更大的唯一标识符值。在每张表中仅能有一个这样的值且所在列必须为索引列。
- "primary key" 表示该列是表的主键, 本列的值必须唯一, MySQL将自动索引该列。

下面的 char(8) 表示存储的字符长度为8, tinyint的取值范围为 -127到128, default 属性指定当该列值为空时的默认值。

> 1. 使用 show tables; 命令可查看已创建了表的名称; 
>
> 2. 使用 describe 表名; 命令可查看已创建的表的详细信息。

### 操作数据库

#### 向表中插入数据

`insert [into] 表名 [(列名1, 列名2, 列名3, ...)] values (值1, 值2, 值3, ...);`

其中 [] 内的内容是可选的, 例如, 要给 samp_db 数据库中的 students 表插入一条记录, 执行语句:

`insert into students values(NULL, "王刚", "男", 20, "13811371377");`

有时我们只需要插入部分数据, 或者不按照列的顺序进行插入, 可以使用这样的形式进行插入:

`insert into students (name, sex, age) values("孙丽华", "女", 21);`

#### 查询表中的数据

`select 列名称 from 表名称 [查询条件];`

例如`select name, age from students; `

也可以使用通配符` *` 查询表中所有的内容, 语句: `select * from students;`

#### 筛选表中的数据

`select 列名称 from 表名称 where 条件;`

**示例:**

以查询所有性别为女的信息为例, 输入查询语句: `select * from students where sex="女";`

查询名字中带有 "王" 字的所有人信息: `select * from students where name like "%王%";`

查询id小于5且年龄大于20的所有人信息: `select * from students where id<5 and age>20;`

#### 更新表中的数据

`update 表名称 set 列名称=新值 where 更新条件;`

**示例:**

将id为5的手机号改为默认的"-": `update students set tel=default where id=5;`

将所有人的年龄增加1: `update students set age=age+1;`

#### 删除表中的数据

`delete from 表名称 where 删除条件;`

**示例:**

删除id为2的行: `delete from students where id=2;`

删除所有年龄小于21岁的数据: `delete from students where age<20;`

---

### 创建后表的修改

#### 添加列

`alter table 表名 add 列名 列数据类型 [after 插入位置];`

**示例:**

在表的最后追加列 `address: alter table students add address char(60);`

在名为 age 的列后插入列 `birthday: alter table students add birthday date after age;`

#### 修改列

`alter table 表名 change 列名称 列新名称 新数据类型;`

**示例:**

将表 tel 列改名为 `telphone: alter table students change tel telphone char(13) default "-";`

将 name 列的数据类型改为 char(16): `alter table students change name name char(16) not null;`

#### 删除列

`alter table 表名 drop 列名称;`

#### 重命名表

`alter table 表名 rename 新表名;`

#### 删除整张表

`drop table 表名;`

#### 删除整个数据库

`drop database 数据库名;`

