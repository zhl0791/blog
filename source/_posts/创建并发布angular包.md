---
layout: post
title: 创建并发布angular库
draft: false
date: 2018-08-30 10:54:37
categories:
tags:
permalink:
description:
cover_img:
toc-disable:
comments:
---

angular cli 6.0 提供了快速创建angular库的命令。

## 创建库

首先安装 angular cli，可以全局安装也可以局部安装，本人通常选择局部安装：

```
npm install angular cli
```

创建项目：

```
F:\my-project\angular-cli\node_modules\.bin\ng new demo --style=scss --routing
```

创建库：

```
npm run ng generate library angular-uploader
```

angular 6提供了多项目管理的能力，此时会在 `projects/angular-uploader` 下得到一个库。其包含了一个模块，带有一个组件和一个服务。

在本地项目中使用库


## 发布到 npm
