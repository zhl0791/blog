---
title: 借助Babel 6平台使用ES6新特性
date: 2015-11-30 13:57:16
tags: [Javascript]
---
## ES6新特性

关于ES6新特性我就不废话太多了，这里仅简单罗列一下：

1.  **箭头函数**

2.  **类**

3.  **增强的Object字面量 **

4.  **模板字符串**

5.  **解构**

6.  **参数默认值，不定参数，拓展参数**

7.  **let与const 关键字**

8.  **for of 值遍历**

9.  **模块**

10.  **Map和Set类型**

11.  **Proxies**

12.  **Symbols**

13.  **Math，Number，String，Object 的新API**

14.  **Promises异步对象**

参考1：[http://www.cnblogs.com/Wayou/p/es6_new_features.html](http://www.cnblogs.com/Wayou/p/es6_new_features.html)

参考2：[http://babeljs.io/docs/learn-es2015/](http://babeljs.io/docs/learn-es2015/)

## Babel 6

由于目前主要浏览器不能够完全支持ES6，因此通常借助一些工具将ES6语法翻译成ES5，Babel即是这样一款工具。

最新的Babel 6与Babel 5及更早的版本有很大的差别，Babel变成了一个平台，而其他各种工具则以插件的形式安装。

通过控制台全局安装babel：

```bash
npm install -g babel-cli
```

此时，全局安装的模块默认位于“C:\Users\zhl\AppData\Roaming\npm\node_modules”（Windows系统），为了正常使用Babel，一定要添加环境变量“NODE_PATH”，并指向上述路径。

为了使用Babel的翻译功能，安装ES6翻译插件（仍然全局安装）：

```bash
npm install -g babel-preset-es2015
```

此时，在任意工作目录，建立src和lib两个文件夹，并且在src文件夹中建立.babelrc文本文件，写入如下内容启用ES6翻译预设配置：

```json
{
  "presets": ["es2015"]
}
```

此时，在命令行中，CD到当前工作目录，运行如下命令：

```bash
babel src --watch --out-dir lib
```

此时，在src文件夹中，建立的任何扩展名为js（或者es6）的文件均会被翻译成ES5语法，并将输出的文件保存到lib文件夹下，由于启用了--watch参数，任何修改均会被立即翻译。

再补充如下几个常用命令：

1.  翻译指定文件：babel script.js --out-file script-compiled.js

2.  当文件改动时自动翻译：babel script.js --watch --out-file script-compiled.js

3.  翻译文件夹下所有JS：babel src --out-dir lib

4.  包含map文件：babel script.js --out-file script-compiled.js --source-maps

## 使用Polyfill

Polyfill是一个插件，用于提供那些开发者们希望浏览器原生提供支持的功能。Babel翻译后的JS部分仍需要基于Polyfill才能正常运行，因此，如果是在浏览器环境中，应在所有脚本之前引入polyfill.js。

使用如下命令全局安装polyfill插件：

```bash
npm install -g babel-polyfill
```

安装完毕后应该可以在C:\Users\zhl\AppData\Roaming\npm\node_modules\babel-polyfill\dist中找到polyfill.min.js文件。