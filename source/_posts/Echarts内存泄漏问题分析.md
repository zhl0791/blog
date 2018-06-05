---
layout: post
title: Echarts内存泄漏问题分析
date: 2018-06-05 12:44:02
categories: 
- ["framework", "angular"]
- ["language", "javascript"]
- ["visualization", "echarts"]
tags: 
- angular
- 内存泄漏
permalink: 
description: 
draft: false
cover_img: 
toc-disable:
comments:
---

## 内存泄漏的场景

## 解决方案

组件销毁的时候释放资源：释放定时器、解除绑定的事件、释放图表实例

对于地图来说，攻击线属于无限循环的动画，基于 requestAnimationFrame 进行实现，若不主动进行释放（this.map.dispose()），则会一直常驻内存并占用cpu资源。
关于 requestAnimationFrame 的自动终止和手动终止，分别参考如下文献：
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame

```javascript
ngOnChanges(changes: SimpleChanges) {
    if (changes['appMapRender']) {
        this.freeChart();
        this.initChart();
        // code
    }
}
ngOnDestroy() {
    this.freeChart();
}
```

```javascript
initChart() {
    this.map = echarts.init(this.elem);
    const resize = this.map.resize;
    $(window).on('resize.map', debounce(resize, 200, false));
    // code
}
freeChart() {
    $(window).off('resize.map');
    this.map && this.map.dispose();
    clearInterval(this.intervalID);
}
```

## 典型的内存泄漏方式

## 开发者工具监控浏览器内存

<br/><br/><br/><br/>