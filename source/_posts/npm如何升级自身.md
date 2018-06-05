---
title: npm如何升级自身
date: 2015-07-25 10:26:59
tags:
---
其实使用npm升级各种插件是很方便的，比如我想升级express框架，使用如下命令

```
npm update express
```

如果你的express是全局安装，则

```
npm update -g express
```

<span style="background-color:rgb(248, 248, 248); color:rgb(51, 51, 51)">也可以使用安装命令来重装，在这里是等效于update：</span>

```
npm install -g express
```

<span style="background-color:rgb(248, 248, 248); color:rgb(51, 51, 51)">但是如果想升级npm自身，则会遇到一点问题，因为nodejs附带了npm，因此无法全局升级npm，需要在nodejs的安装目录下局部升级npm：</span>

```
D:
cd "Program Files\nodejs"
npm update npm
```
