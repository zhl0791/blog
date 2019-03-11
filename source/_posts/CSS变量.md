---
layout: post
title: CSS变量
draft: false
date: 2019-03-09 10:37:57
categories:
tags:
permalink:
description:
cover_img:
toc-disable:
comments:
---

CSS 变量技术，其兼容性可点击如下链接查看： [CSS Variable兼容性](https://caniuse.com/#search=CSS%20Variable)

## 具体用法

使用 `--` 声明变量，使用 `var()` 函数获取变量。

```css
:root{
    --header-height: 70px;
}

body {
    --color: white;
}

.header {
    height: var(--header-height);
}
```

`var()` 函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```css
color: var(--color);
```

## 与 `calc` 结合使用

```css
height: calc(100vh - var(--header-height));
```

## 变量作用域

所在选择器优先级高的变量声明会覆盖优先级低的。

```
body {
    --color: red;
}

p {
    --color: black;
}
```

```html
<p>显示为黑色</p>
```

## javascript 检测浏览器支持

```javascript
const isSupported =
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--a', 0);
```

## javascript 操作css变量

读取变量的值：
```javascript
const dom = document.querySelector('selector');
dom.style.getPropertyValue('--color');
```

修改css变量的值：
```javascript
const dom = document.querySelector('selector');
dom.style.setProperty('--color', 'white');
```
