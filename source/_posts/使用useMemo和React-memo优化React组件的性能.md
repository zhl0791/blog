---
layout: post
title: 使用useMemo和React.memo优化React组件的性能
draft: false
date: 2019-11-02 15:54:40
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

使用 hooks 开发函数组件逐渐成为主流，甚至官方推荐未来新的项目都采用hooks，并且官方承诺，未来会对hooks进行不断的优化，不断提升hooks的性能和使用的便利性。

但是刚迁移到hooks的写法后，稍不注意还是会写出性能较低的代码。

## 开发中遇到的问题

父组件改变自身state，即使子组件所依赖的数据没发生变化，父组件每次render时也会同时渲染子组件。

对于如下组件：

Father.js 代码如下：

```js
import React, { useState, useEffect } from 'react';
import Son from './Son';

export default () => {
  const [data, setData] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setInterval(() => setData(Date.now().toString()), 1000);
  }, []);

  return (
    <div>
      {data}
      <Son value={name} />
    </div>
  );
};
```

Son.js 代码如下：

```js
import React, { useState } from 'react';

export default (props) => {
  const { value } = props;
  console.log(value); // 这里每次都会打印，哪怕属性值 value 并未发生变化

  return (
    <div>{value}</div>
  );
};
```

每一次父组件重新渲染，子组件所依赖的属性尽管没有变化，也会一并重新渲染。而显然这样的渲染多数情况下不是必要的。对于 Son 组件来说，会有额外的执行消耗。

## 使用 `React.memo()`

将 Son.js 重构成如下即可解决上述问题：

```js
import React, { useState, memo } from 'react';

export default memo((props) => {
  const { value } = props;
  console.log(value); // 只有 value 发生变化时才会打印

  return (
    <div>{value}</div>
  );
});
```

`React.memo()` 和 `React.PureComponent` 组件目的是相同的：`React.memo()` 是函数组件，`React.PureComponent` 用于类组件，他们都是对接收的props参数进行浅比较，解决组件在运行时的效率问题，优化组件的重渲染行为。

## 另一种优化办法方法：`useMemo` hooks

同样是上述问题，将 Father 组件进行如下重构亦可解决问题：

```js
import React, { useState, useEffect } from 'react';
import Son from './Son';

export default () => {
  const [data, setData] = useState('');
  const [name, setName] = useState('');

  const memoizedSon = useMemo(() => Son({value: name}), [name]);

  useEffect(() => {
    setInterval(() => setData(Date.now().toString()), 1000);
  }, []);

  return (
    <div>
      {data}
      <memoizedSon />
    </div>
  );
};
```

凡是高开销的计算任务均可用 useMemo() 进行优化。

把函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。useMemo 的函数会在渲染期间执行。不应在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

- 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值（这样的话使用 useMemo 就毫无意义了）。
- 若第二个参数为空数组，则只会在渲染组件时执行一次。

