---
title: 在线安装 IntelliJ IDEA的 golang 插件
date: 2015-11-10 10:32:44
tags:
---
IntelliJ IDEA是非常受欢迎的开发工具，如果我们希望使用IntelliJ IDEA 进行Go语言的开发，需要安装Golang插件。

网上的资料几乎都是建议开发者编译源码进行安装，但这是不必要的。还有更简单快捷的在线安装方式，这里给出基本步骤（基于IntelliJ IDEA 14.1，不同版本界面会有细微差异，但步骤相似）：

### 1\. 在“Settings”菜单，点击“Plugins”，打开插件管理窗口：

![](http://static.oschina.net/uploads/space/2015/1110/233741_0ECH_2261820.jpg)

### 2\. 点击“ Browse repositories”，打开插件仓库管理窗口：

![](http://static.oschina.net/uploads/space/2015/1110/233854_lonU_2261820.png)

### 3\. 点击“Manage repositories...”，打开自定义仓库窗口：

![](http://static.oschina.net/uploads/space/2015/1110/234443_zdmc_2261820.png)

### 4\. 在URL中输入：

[https://plugins.jetbrains.com/plugins/alpha/5047](https://plugins.jetbrains.com/plugins/alpha/5047)

### 5\. 点击“OK”保存，然后即可在“Browse repositories”窗口搜索到golang的插件，安装即可：

![](http://static.oschina.net/uploads/space/2015/1110/234836_JsTL_2261820.png)

由于我已安装该插件，所以右侧“安装”按钮时隐藏的。

### 说明：

通过此种模式，也可以安装其它各种类型的插件，其中关键步骤在于第四步，需要给出有效的插件仓库的URL。
