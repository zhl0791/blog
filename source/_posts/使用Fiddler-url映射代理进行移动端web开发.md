---
layout: post
title: 使用Fiddler url映射代理进行移动端web开发
draft: false
date: 2019-03-06 00:12:33
categories: 
- ["移动端", "开发环境"]
tags: 
- 移动端
- fiddler
permalink:
description:
cover_img:
toc-disable:
comments:
---

在移动端web开发过程中，经常遇到需要在已发布的app的webview中调试本地代码的情况。

使用Fiddler的AutoResponder特性即可解决该问题。

## 设置http代理

完成该任务需要执行三个步骤。

### 设置https拦截
Tools——Options——HTTPS：
![设置https拦截](./1-1.jpg)

### 设置代理端口
Tools——Options——Connections：
![设置代理端口](./1-2.jpg)

### 安装证书
Tools——Options——HTTPS——Actions：
点击“Trust Root Certificate”，然后按照提示操作即可。

手机端用第三方浏览器（有的手机自带浏览器有问题无法如预期工作）访问本机的代理端口，将证书下载到手机本地并安装，如图：
![设置代理端口](./1-3.jpg)

## 设置AutoResponder转发请求

- 点击“Add Rule”，分别输入 `regex:https://xxx.com/newoperation\/(?<name>.+)$` 和 `E:\fff\${name}` 。
- 选择“Enable rules”和“Unmatched requests passthrough”。

如图所示：
![autoresponder](./autoresponder.jpg)

**最后设置好后，Fiddler记得重启！**

比如移动端访问 `https://xxx.com/newoperation/page.html` ，将指向 `E:\fff\page.html` 。

