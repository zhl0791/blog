---
layout: post
title: useState带来的性能问题
draft: false
date: 2019-11-05 10:20:00
categories:
  - ['react', 'javascript']
tags:
  - react
permalink:
description:
cover_img:
toc-disable:
comments:
---

## 遇到的如下

如下代码：

```js
import React, { useState, use } from 'react';

function Example() {
  const [str1, setStr1] = useState(0);
  const [str2, setStr2] = useState(0);

  console.log(str1, str2); // 这里会执行 3 次

  useEffect(() => {
    setStr1(1);
    setStr2(1);
  }, []);

  return (
    <div>
      <div>{str1}</div>
      <div>{str2}</div>
    </div>
  );
}
```

上述代码的问题是，连续调用 setStr1() 和 setStr2() 会导致组件渲染两次，这里与 class 组件的 setState() 是不一样的，因为 setState() 会对状态进行合并，连续多次调用 setState() 仅会触发一次 render 。

## 解决办法之一：合并 state

将多个 useState 合并成一个：

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [str, setStr] = useState({
    key1: 0,
    key2: 0,
  });

  console.log(str); // 这里会执行 2 次

  useEffect(() => {
    setStr({
      key1: 1,
      key2: 1,
    });
  }, []);

  return (
    <div>
      <div>{str.key1}</div>
      <div>{str.key2}</div>
    </div>
  );
}
```

## 解决办法之二：useReducer

当 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 时，useReducer 会比 useState 更适用。

```js
import React, { useState, useEffect, useReducer } from 'react';

const initialState = {
  key1: 0,
  key2: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'changeKey':
      return { ...state, key1: 1, key2: 1 };
    default:
      throw new Error();
  }
}

function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'changeKey',
    });
  }, []);

  return (
    <>
      {state.key1}
      {state.key2}
    </>
  );
}
```
