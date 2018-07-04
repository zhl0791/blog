---
layout: post
title: moment、dayjs、date-fns时间日期库比较
draft: false
date: 2018-07-04 14:44:41
categories: 
- ["language", "javascript"]
tags: 
- moment
- dayjs
- date-fns
permalink:
description:
cover_img:
toc-disable:
comments:
---

[moment](https://github.com/moment/moment/)、[dayjs](https://github.com/iamkun/dayjs)、[date-fns](https://github.com/date-fns/date-fns) 是三个较为广泛使用的时间库。

## 安装
三个库的安装分别如下：
```powershell
npm install moment
npm install dayjs
npm install date-fns
```

在页面引入：
```html
<script src="/node_modules/moment/min/moment.min.js"></script>
<script src="/node_modules/dayjs/dayjs.min.js"></script>
<!-- date-fns 不支持全局引入 -->
```

## 转换
moment:
```javascript
moment(); // 当前时间
moment(new Date()); // 根据Date对象创建
moment("2018-07-04 15:16:45.869"); // 根据字符串创建
moment("2018-07-04 15:16:45.869", "YYYY-MM-DD HH:mm:ss.SSS"); // 根据字符串创建(推荐)
moment('2018-07-04T07:16:45.869Z'); // 根据JSON格式创建
moment(1530688605869); // 根据毫秒创建
```

dayjs:
```javascript
dayjs(); // 当前时间
dayjs(new Date()); // 根据Date对象创建
dayjs("2018-07-04 15:16:45.869"); // 根据字符串创建
dayjs('2018-07-04T07:16:45.869Z'); // 根据JSON格式创建
dayjs(1530688605869); // 根据毫秒创建
```

date-fns:
```javascript
import { parse } from 'date-fns';

parse(new Date()); // 根据Date对象创建
parse("2018-07-04 15:16:45.869"); // 根据字符串创建
parse('2018-07-04T07:16:45.869Z'); // 根据JSON格式创建
parse(1530688605869); // 根据毫秒创建
```

## 基本操作

moment:
```javascript
moment().add(7, 'day'); // 增大7天
moment().subtract(7, 'year'); // 减小7年
moment().startOf('week'); // 当前的星期一
moment().endOf('month'); // 当前的月末
```

dayjs:
```javascript
dayjs().add(7, 'day'); // 增大7天
dayjs().subtract(7, 'year'); // 减小7年
dayjs().startOf('week'); // 当前的星期一
dayjs().endOf('month'); // 当前的月末
```

date-fns:
```javascript
import { parse, addDays, subYears, startOfWeek, endOfMonth } from 'date-fns';

const date = new Date();
addDays(date, 7); // 增大7天
subYears(date, 7); // 减小7年
startOfWeek(date); // 当前的星期一
endOfMonth(date); // 当前的月末
```

## 格式化
moment:
```javascript
moment().format('YYYY-MM-DD HH:mm:ss');
```

dayjs:
```javascript
dayjs().format();
```

date-fns:
```javascript
format(new Date(), 'yyyy-MM-dd HH:mm:ss');
```

## 总结
moment、dayjs、date-fns三个库都能满足常见的需求，但是存在如下特点：
* moment 的功能强大但是体积也最大，moment.min.js 的体积为51K，dayjs.min.js 体积为7K，date-fns由于是模块化加载，体积可以最小化；
* dayjs 和 moment 的接口几乎完全一致，相互切换的学习成本极低，date-fns接口风格差异较大；

从功能上看，dayjs、date-fns 基本上可以替代moment，同时可以大幅减小app的体积。如果考虑的兼容性，可以优先考虑dayjs，喜欢模块化的朋友可以考虑date-fns。


