## 前言

这两天折腾了一下终于把 Node应用成功部署到服务器，下面就说说如何部署以及其中常见的坑。

我们选择的是 **pm2守护进程+Nginx反向代理**，此外，本教程基于Debian 8 X64

## 安装Node.js

我们将安装Node.js的最新LTS版，采用了[NodeSource](https://github.com/nodesource/distributions)包文件。

首先，您需要安装NodeSource PPA才能访问其内容。确保您在您的主目录中，并使用curl检索Node.js 6.x存档的安装脚本：

```powershell
cd ~
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
```

可以使用nano检查此脚本的内容：

```powershell
nano nodesource_setup.sh
```

运行该脚本：

```powershell
bash nodesource_setup.sh
```

PPA将添加到您的配置中，并且本地包缓存将自动更新。从nodesource运行安装脚本后，您可以按照上面的方式安装Node.js包：

```powershell
apt-get install nodejs
```

该`nodejs`包中包含`nodejs`二进制以及`npm` ，所以你不需要安装`npm`分开。 但是，为了对一些`npm`包工作（如那些需要从源代码编译），您将需要安装`build-essential`包：

```powershell
apt-get install build-essential
```

Node.js运行时现在已安装，并准备运行应用程序！让我们编写一个Node.js应用程序。

## 创建Node.js应用程序

我们将编写一个*Hello World*应用程序，它只是返回的“Hello World”的任何HTTP请求。这是一个示例应用程序，将帮助您获得您的Node.js设置，您可以替换为您自己的应用程序 – 只是确保您修改您的应用程序以监听相应的IP地址和端口。

### Hello World代码

首先，创建并打开您的Node.js应用程序以进行编辑。在本教程中，我们将使用`nano`编辑示例应用程序调用`hello.js` ：

```powershell
cd ~
nano hello.js
```

将以下代码插入到文件中。如果你愿意，你可以更换高亮度显示端口， `8080` ，在这两个位置（一定要使用非管理端口，即1024或更高版本）：

hello.js

```javascript
#!/usr/bin/env nodejs
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
```

现在保存并退出。

这Node.js的应用程序只监听指定的地址（ `localhost` ）和端口（ `8080` ），和一个返回“Hello World”的`200` HTTP成功代码。 由于我们监听**localhost，**远程客户端将无法连接到我们的应用程序。

### 测试应用程序

为了使我们能够测试应用程序，标志`hello.js`可执行文件：

```powershell
chmod +x ./hello.js
```

并运行它像这样：

```powershell
./hello.js
```

```powershell
Output
Server running at http://localhost:8080/
```

**注：**以这种方式运行的Node.js应用程序会阻止其他命令，直到应用程序按**Ctrl-C**杀害。

为了测试应用程序，您的服务器上打开另一个终端会话，并与连接到**本地主机** `curl` ：

```powershell
curl http://localhost:8080
```

如果看到以下输出，应用程序正常工作并监听正确的地址和端口：

```powershell
Output
Hello World
```

如果没有看到正确的输出，请确保您的Node.js应用程序正在运行，并配置为监听正确的地址和端口。

一旦你确定它的工作，杀死应用程序（如果您还没有），按**Ctrl + C。**

## git

### 安装git

```powershell
apt-get update
apt-get install git-core
```

### 配置

Git使用两个主要设置实现版本控制：

- 用户名
- 用户的电子邮件

这些信息将嵌入到您使用Git所做的每个提交中，以便跟踪谁在做哪些提交。

我们需要在我们的Git配置文件中添加这两个设置。 这可以在git config实用程序的帮助下完成。 就是这样：

**设置git用户名:**

```powershell
git config --global user.name "Sammy Shark"
```

**设置电子邮件:**

```powershell
git config --global user.email sammy@example.com
```

**查看git设置:**

使用`git config --list`查看这些所有git设置

```powershell
git config --list
```

你以该可以看到

```powershell
Outputuser.name=Sammy Shark
user.email=sammy@example.com
```

现在你已经成功配置了git，可以使用`git clone`将远程仓库克隆到服务器了。

## pm2

### 安装PM2

```powershell
npm install -g pm2
```

### 使用PM2管理应用程序

PM2简单易用。我们将介绍PM2的几个基本用途。

### 启动应用程序

你会想要做的第一件事就是使用`pm2 start`命令来运行你的应用程序， `hello.js` ，在后台：

```powershell
pm2 start hello.js
```

这也将您的应用程序添加到PM2的进程列表，这是每次启动应用程序时输出：

```powershell
Output[PM2] Spawning PM2 daemon
[PM2] PM2 Successfully daemonized
[PM2] Starting hello.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid  │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ hello    │ 0  │ fork │ 3524 │ online │ 0       │ 0s     │ 21.566 MB   │ disabled │
└──────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

正如你所看到的，PM2自动分配一个**应用程序名称** （基于文件名，没有`.js`扩展名）和PM2 **ID。** PM2还维护的其它信息，如进程的**PID，**其当前状态，和存储器使用率。

## 部署应用

首先我需要checkout GitHub 上的 repo:

```powershell
git clone https://github.com/sangle7/blog.git
```

安装依赖：`npm install`修改原来项目种的package.json中的scripts:

```powershell
pm2 start ./src/server
```

这样就可以通过 `npm start` 来运行我们的项目了，如果使用项目默认的3000端口的话就可以直接运行了。

现在Node.js应用程序正在运行，并由PM2管理，让我们设置反向代理。

## Nginx

nginx（发音同engine x）是一款由俄罗斯程序员Igor Sysoev所开发轻量级的网页服务器、反向代理服务器以及电子邮件（IMAP/POP3）代理服务器。

关于反向代理，[摸我](http://www.open-open.com/lib/view/open1417488526633.html)了解更多

### 安装

```powershell
apt-get install nginx
```

### 升级

编辑 `/etc/apt/sources.list` ，添加以下两行：（注意代号前后都有空格）
`deb http://nginx.org/packages/debian/ 版本代号 nginx`
`deb-src http://nginx.org/packages/debian/ 版本代号 nginx`

而Debian版本代号分别为5.0的 **lenny**，6.0的 **squeeze** ，7.0的 **wheezy** 和8.0的 **jessie**，至于还没发布的9.0则为 **stretch**，你只需要根据你使用的版本更换对应的版本代号即可。

```powershell
wget http://nginx.org/keys/nginx_signing.key && apt-key add nginx_signing.key && apt-get update && apt-get install nginx
```

即可升级到最新版nginx（笔者使用的是1.12.0）

**注：nginx 1.7.3 前的版本会丢失E-tag，所以建议升级**

### 配置

接下来需要修改Nginx的配置文件才能将3000端口转发到Nginx的80端口上，配置文件默认是在  `/etc/nginx/conf.d/default.conf`:

```powershell
upstream blog {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://blog;
    }
}
```

现在你已经可以通过IP地址直接访问网页了

## bug处理

1. 重启nginx时出现[error] open() "/run/nginx.pid" failed (2: No such file or directory)

### 卸载

- `apt-get remove nginx` # 可删除除/etc/nginx 配置文件外的所有文件
- `apt-get purge nginx` or `rm -rf /etc/nginx` #删除nginx配置文件
- `apt-get autoremove` #自动删除安装nginx时安装的依赖包

### 重装

```powershell
apt-get -o DPkg::options::=--force-confmiss --reinstall install nginx
```

解决配置文件缺失，无法启动nginx问题

