---
layout: post
title: 造轮子：如何自己创造一个React库
draft: false
date: 2019-12-14 09:56:55
categories:
- ["react", "javascript"]
tags:
- react
permalink:
description:
cover_img:
toc-disable:
comments:
---

从零开始构建一个react是很复杂的，但是借助现有的一些组件，快速实现react库的主要功能，则并不那么难。

我们构建的react库应当包含如下元素：

- JSX
- 函数组件
- 类组件
- 生命周期钩子函数

## 依赖的部件

我们不会从零开始，可以使用 `snabbdom` 实现虚拟DOM的功能，使用 `@babel/plugin-transform-react-jsx` 插件对jsx进行转译。

### @babel/plugin-transform-react-jsx

首先需要了解 `@babel/plugin-transform-react-jsx` 插件到底做了什么。

```javascript
const App = (
    <div>
        <h1 className="primary">QndReact is Quick and dirty react</h1>
        <p>It is about building your own React in 90 lines of JavsScript</p>
    </div>
);
```

上面的 jsx 被转换成下面这样：

```javascript
var App = React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        {
            className: "primary"
        },
        "QndReact is Quick and dirty react"
    ),
    React.createElement(
        "p",
        null,
        "It is about building your own React in 90 lines of JavsScript"
    )
);
```

### snabbdom

`snabbdom` 是虚拟DOM的一种实现。

https://github.com/snabbdom/snabbdom

## 先让react运行起来

先忽略各种技术的细节，clone 如下仓库，先让项目运行起来。

https://github.com/iDo-0791/webpack-starter-pack

运行效果如下：

![demo](./demo.jpg)


## 开始构建过程

### 基本的组件

### 底层的支撑函数

#### 什么是

#### 什么是



