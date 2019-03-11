---
layout: post
title: Genymotion虚拟机安装
draft: false
date: 2019-03-06 00:12:30
categories:
tags:
permalink:
description:
cover_img:
toc-disable:
comments:
---

## Genymotion下载并安装

在官网下载 Genymotion 安装包： https://www.genymotion.com/ ，按照提示安装即可。

> 注意：建议下载免费个人版，仔细找找

## 第三方apk包安装出错解决方案

将第三方的安装包直接拖拽到虚拟机界面，会弹出安装失败的提示，官网给出的解释，Genymotion模拟器使用的是x86架构，在第三方市场上的应用有部分不采用x86这么一种架构，所以在编译的时候不通过。

可以下载Genymotion提供的ARM转换工具包，将应用市场中的ARM架构的apk转换成Genymotion可以编译的x86架构，参考 https://www.jianshu.com/p/97b8250f359e 。

将对应版本的 Translation 工具拖拽到虚拟机界面安装即可。重启虚拟机即可安装任意第三方app。
