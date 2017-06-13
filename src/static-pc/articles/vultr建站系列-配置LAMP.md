这篇文章配置了Apache/MySQL/PHP环境，~~其实我PHP写的超烂配置这个环境是为了方便迁移，已（打算）换Nginx~~

## 准备工作

1. 有一个解析到服务器IP的域名
   - 没有域名？注册[摸我](https://sg.godaddy.com/zh?isc=gennbacn01&ci=)
   - 域名解析[摸我](http://godaddy.idcspy.com/godaddy-jx)
2. 会~~一点~~PHP
   + PHP在线基础教程[摸我](https://www.codecademy.com/learn/php)

## 安装和配置Apache

### 升级系统组件

```powershell
apt-get update
apt-get upgrade --show-upgraded
```

### 安装Apache2

```powershell
apt-get install apache2
```

### 开启rewrite

```powershell
a2enmod rewrite
```

### 启动Apache

```powershell
service apache2 restart
```

访问服务器IP，出现以下网页即为成功运行

![1497240435954](http://onvaoy58z.bkt.clouddn.com/1497240435954.png)

另外，默认网页路径位于 */var/www/html* 中，你可以尝试修改 *index.html* 并观察变化

### 配置文件

Apache的各项配置文件位于 */etc/apache2/* 中

![1497239843795](http://onvaoy58z.bkt.clouddn.com/1497239843795.png)

其中主配置文件为 *apache2.conf*

### 站点配置

*/sites-available/*用来存放所有站点的站点域名配置文件

![1497239933891](http://onvaoy58z.bkt.clouddn.com/1497239933891.png)

设置站点时用域名命名，例如我们要建立一个 *sangle7.com* 的站点，就新建一个*sangle7.com.conf* 进行设置

*/etc/apache2/sites-available/sangle7.com.conf*

```php
<VirtualHost *:80>
ServerAdmin admin@sangle7.com  //站点管理员的邮箱地址
ServerName sangle7.com  //站点域名
ServerAlias www.sangle7.com  //泛域名
DocumentRoot /srv/www/sangle7.com/public_html/   //站点文件地址
ErrorLog /srv/www/sangle7.com/logs/error.log   //错误存放地址
CustomLog /srv/www/sangle7.com/logs/access.log combined
</VirtualHost>
```

新建上面提到的几个目录:

```powershell
mkdir -p /srv/www/sangle7.com/public_html
mkdir /srv/www/sangle7.com/logs
```

启动站点

```powershell
a2ensite sangle7.com.conf
```

重启Apache

```powershell
service apache2 reload
```

**备注：**如果我们希望取消这个站点运行，那就用这个命令取消这个站点

```powershell
a2dissite sangle7.com.conf
```

这时候访问我们的网址会出现 403 Forbidden，因为我们没有访问该文件夹的权利

在 *apache2.conf* 中，将

```php
<Directory /srv/>
	Options Indexes FollowSymLinks
	AllowOverride All  //注意这一行
	Require all granted
</Directory>
```

前的#号删去，重启apache即可正常访问

## MySQL

###  安装

```powershell
apt-get install mysql-server
```

在执行过程中需要我们输入MYSQL的ROOT用户密码，这个要稍微复杂些。数据库配置文件在/etc/mysql/my.cnf，如果我们需要调整尽量先备份一个。

### 建立数据库

```powershell
mysql_secure_installation
```

需要我们输入上面设置的MYSQL数据库ROOT密码才可以进入，首次进入会问是否需要修改，以及其他的各种设置，根据需要选择。

```sql
mysql -u root -p

create database XXX;
grant all on sangle7.* to 'USER' identified by 'sangle7.com';
```

利用root权限进入MYSQL数据库，输入我们之前设置的密码进入，然后建立XXX数据库名，USER数据表，以及sangle7.com设置数据库密码。

创建完毕之后输入 quit 退出

更多SQL命令[摸我](http://sangle7.com/articles/%E7%BC%96%E7%A8%8B/%E5%88%9D%E8%AF%86mySQL)

## PHP

```powershell
apt-get install php5 php-pear
```

安装之后我们需要配置php.ini文件（*/etc/php5/apache2/php.ini*）**可以默认不改**

```php
max_execution_time = 30
memory_limit = 128M
error_reporting = E_COMPILE_ERROR|E_RECOVERABLE_ERROR|E_ERROR|E_CORE_ERROR
display_errors = Off
log_errors = On
error_log = /var/log/php.log
register_globals = Off
max_input_time = 30
```

创建日志目录且设置权限

```powershell
mkdir /var/log/php
chown www-data /var/log/php
```

如果我们需要MySQL的PHP支持，那么我们必须安装PHP5 MySQL包下面的命令：

```powershell
apt-get install php5-mysql
```

启动apache

```powershell
service apache2 reload
```

这样，通过上面的四步，就可以搭建站点、数据库，后面我们就只需要到*/srv/www/sangle7.com/public_html*上传网页程序，然后根据提示安装就可以了。