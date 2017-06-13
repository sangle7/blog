[本博客](http://sangle7.com)使用的是国外的免费虚拟主机[000webhost](https://link.zhihu.com/?target=https%3A//www.000webhost.com/934994.html)。

> 000webhost是国外著名空间商Hosting24旗下的免费虚拟主机产品，提供的免费服务包括：全能PHP空间1G ，支持PHP，支持绑定顶级域名，无任何广告，独立控制面板，免费创建Mysql数据库，FTP上传下载，在线压缩解压。



![000webhost](http://onvaoy58z.bkt.clouddn.com/000webhost.JPG)

### 前期准备

1. 一个靠谱的梯子
2. 基础的php和数据库操作知识
3. 基本的建站知识

### 注册

进入首页后按照步骤注册即可，需要注意的是注册邮箱推荐使用[gmail](https://mail.google.com)等国外邮箱，国内邮箱可能无法注册成功。此外，注册时必须进行谷歌人机验证，所以需要一个梯子。注册完毕后进入邮箱激活你的账户。

### 建站

新建站点时首先会让你设置服务器密码,然后点击manage website。![](http://onvaoy58z.bkt.clouddn.com/buildwebsite.JPG)

可以看到有三种建站方式供选择。

#### 第一种 在线网页设计

这种设计完全是模板化拖拽控件，选择你需要的控件，然后编辑发布即可！

如果你完全没有任何编程经验，推荐使用这种建站方式。

#### 第二种 WordPress建站

如果你不知道什么是WordPress，可以看他们的[官方网站](https://wordpress.org/)。

> 简单来说，WordPress是一种使用PHP语言开发的博客平台，用户可以在支持PHP和MySQL数据库的服务器上架设属于自己的网站。同时WordPress有许多第三方开发的免费模板，你不需要懂得前端代码也能轻易上手。

新建时会让你设置 管理员用户名密码 ，选择语言，然后点击安装，几分钟之类完成。请记住之前创建的服务器用户名密码，更换主题时需要用到。

网上关于WordPress的教程有很多，如果你有一些基础的php和数据库知识，不熟悉或不想在前端设计上花太多时间，推荐使用这种建站方式。

#### 第三种 在线FTP上传网站

支持在线tar.gz ,zip格式解压 ，目录权限修改，文件移动 。

这是我的博客的根目录

![](http://onvaoy58z.bkt.clouddn.com/public.JPG)



如果你有已经写好的网页文件，推荐使用这种方式。

### 数据库

**如果是静态页面不需要数据库，可以跳过这一步。**

上传完毕后需要新建数据库，返回管理面板，点击manage database - new database 新建。

![](http://onvaoy58z.bkt.clouddn.com/database.JPG)

**注意：实际的数据库名称和用户名也是以id....开头的**

数据库可以通过Manage ->PhpMyAdmin 进行管理，PhpMyAdmin可以通过web方式控制和操作MySQL数据库，同时支持SQL语句。详细的使用教程请参考[官方文档](https://docs.phpmyadmin.net/en/latest/)。

### 绑定域名

现在你已经可以通过[sangle.000webhostapp.com](http://sangle7.com/)访问搭建好的网站了。

如果你想绑定自己的域名，首先在域名注册商那里将DNS服务器指向**ns01.000webhost.com** 和 **ns02.000webhost.com** 。

然后在网站控制面板，点击Set web address - use my own domain ,填入我的域名sangle7.com ，再等一段时间（24小时到72小时不等）就生效了。如果遇到问题，可以参考[How to point domain name to 000webhost.com](https://www.000webhost.com/forum/t/how-to-point-domain-name-to-000webhost-com/38026)



