## VPS信息

进入Servers页可以看到我们新购买的VPS

![1497236514023](http://onvaoy58z.bkt.clouddn.com/1497236514023.png)

点击可查看详细信息

![1497236570301](http://onvaoy58z.bkt.clouddn.com/1497236570301.png)

## PuTTY

这里推荐使用[PuTTY](http://www.putty.org/)进行操作：(Xshell也不错)

![1497236680961](http://onvaoy58z.bkt.clouddn.com/1497236680961.png)

输入IP地址即可，端口为默认的22

在随后的登录界面输入用户名(root)和密码，**注意PuTTY输入密码时并不会显示**，

输入后出现此界面即为成功登录：

![1497237026738](http://onvaoy58z.bkt.clouddn.com/1497237026738.png)

## 安装SS

```powershell
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-libev-debian.sh && chmod +x shadowsocks-libev-debian.sh && ./shadowsocks-libev-debian.sh 2>&1 | tee shadowsocks-libev-debian.log
```

根据提示设置端口，用户名，密码即可。

## 客户端搭建

到 [Shadowsocks官方网站](http://shadowsocks.org/en/download/clients.html) 下载客户端(PC/Android/iOS都有)，填写服务器配置，右键选择>启用系统代理 即可。

更多关于SS客户端的配置可以戳：https://www.v2ex.com/t/161035

## 加速

我用的是最简单的锐速，关于google BBR的加速请[摸我](https://my.oschina.net/u/1167564/blog/851680)（原文章被锁定，只剩这个转载的）

### 安装

```powershell
wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/serverspeeder/master/serverspeeder-all.sh && bash serverspeeder-all.sh 
```

### 卸载

```powershell
chattr -i /serverspeeder/etc/apx* && /serverspeeder/bin/serverSpeeder.sh uninstall -f 
```
