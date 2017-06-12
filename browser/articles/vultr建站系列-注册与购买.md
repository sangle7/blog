## 迁移

这两天用了一点时间把博客从000webhost迁移到了Vultr上，其实本来也可以维持正常运行，这次迁移主要是基于以下几个原因的考虑：

1. 我最近撸了一个web app，想把它放到子域名上，而用000webhost无法解析子域名。
2. 去年买的的梯子到期了

## 虚拟主机/VPS/云主机

一开始我也分不清三者的差别，查询了一些资料后

### 虚拟主机

Virtual  hosts （Vhost）虚拟主机是通过，物理服务器，VPS或者云服务器安装例如CPanel，Plesk等面板搭建的。其实是在一套安装好的操作系统上将环境配置好。

### VPS

Virtual Private Server ，指一个独立服务器通过虚拟化技术虚拟成多个虚拟专用服务器。常见的虚拟化技术包括OpenVZ（超售严重），Xen（几乎无法超售，贵），KVM，Hyper-V（支持windows）等。

### 云服务器

Elastic Compute Service, 简称ECS。云服务器是一个计算，网络，存储的组合。简单点说就是通过多个CPU，内存，硬盘组成的计算池和存储池和网络的组合。



后端方面，由于我想由逐渐转向node环境，~~也因为要搭建梯子，而阿里云又要备案又贵~~，就选择了VPS。

顺便一提，国外的VPS推荐可以看这里：

https://www.vpser.net/ten-dollars-vps

http://www.laozuo.org/myvps

## 注册

打开[vultr官网](https://www.vultr.com/)，点击右上角的`Create Account`，按照步骤注册即可。

![1497235627187](http://onvaoy58z.bkt.clouddn.com/1497235627187.png)

## 网速自测

[测试节点网速请戳我并拉到页面最下面](https://www.vultr.com/faq/)

了解更多，请戳[Vultr 节点哪个比较快？](https://www.v2ex.com/t/276585)

## 购买

1. 在`Billing`页面设置用于支付的信用卡/Paypal
  ![1497235753287](http://onvaoy58z.bkt.clouddn.com/1497235753287.png)

2. 进入`Server`页面点击`deploy new server`

3. 进入选择页面：

   ![1497235950786](http://onvaoy58z.bkt.clouddn.com/1497235950786.png)

4. 地点，系统等都可根据需要选择。我选的是日本+Debian。另外如果是搭建简单的网站2.5刀的就够用了不过最近总是sold out

5. additional feature中的Enable IPv6可以勾上，选择完毕后点击deploy now即可开始使用。第一次使用前要等待安装1-2分钟。

6. 注册账号后通过推特可以获取3刀的优惠，其他优惠码可以自行寻找。另外注意vultr是不允许两个账号绑定同一张信用卡的，会造成封号。



