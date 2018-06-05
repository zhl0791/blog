---
title: Sublime text配置前端代码（JavaScript/Html/CSS）校验工具
date: 2016-04-19 11:09:10
tags:
---
在项目开发中应用了代码检查工具，这些工具对开发工作的确很有帮助，个人深有体会，写下来，就当做做笔记了。

前端代码检查分别包括html、css、JavaScript三部分的检查，代码检查需要安装node。

## 安装Package Control

给sublime安装Package Control，Package Control是最佳的sublime插件管理工具，安装过程参考：[https://packagecontrol.io/installation](https://packagecontrol.io/installation)
所有可用的sublime插件：[https://packagecontrol.io/](https://packagecontrol.io/)

## 首先安装SublimeLinter

参考：[https://packagecontrol.io/packages/SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)

其它语法检查插件依赖此插件。

1.在sublime使用Package Control安装SublimeLinter即可
2.重启sublime

## 安装html检查工具

参考：[https://github.com/mmaday/SublimeLinter-contrib-htmlhint](https://github.com/mmaday/SublimeLinter-contrib-htmlhint)
1.首先安装node基础插件，在控制台运行：npm install -g htmlhint@latest
2.在sublime使用Package Control安装SublimeLinter-contrib-htmlhint即可
3.重启sublime

## 安装css检查工具

参考：[https://packagecontrol.io/packages/SublimeLinter-csslint](https://packagecontrol.io/packages/SublimeLinter-csslint)
1.首先安装node基础插件，在控制台运行：npm install -g csslint
2.在sublime使用Package Control安装SublimeLinter-csslint即可
3.重启sublime

## 安装JavaScript检查工具

参考： [https://packagecontrol.io/packages/SublimeLinter-jshint](https://packagecontrol.io/packages/SublimeLinter-jshint)
1.首先安装node基础插件，在控制台运行：npm install -g jshint
2.在sublime使用Package Control安装SublimeLinter-jshint即可
3.重启sublime

## 编写配置文件

需要给上述工具编写配置文件，三种类型的文件的代码检查对应的配置文件名依次为：

.htmlhintrc、.csslintrc、.jshintrc

三个配置文件需要放在工程目录的最顶层（至少应包含所有需要检测的代码文件），sublime会自动找到这些配置文件并使其生效，如图：

![](http://static.oschina.net/uploads/space/2016/0419/003349_Luu9_2261820.png)

具体的配置内容可参考插件所在链接，在这里我仍然给出我现在采用的配置参数，供参考：

**.htmlhintrc**

```
{
    "tagname-lowercase":true,
    "attr-lowercase":true,
    "attr-value-double-quotes":true,
    "attr-value-not-empty":true,
    "attr-no-duplication":true,
    "doctype-first":false,
    "tag-pair":true,
    "tag-self-close":true,
    "spec-char-escape":true,
    "id-unique":true,
    "src-not-empty":true,
    "title-require":false,
    /*规范类*/
    "doctype-html5":false,
    "id-class-value":false,
    "style-disabled":false,
    "inline-style-disabled":false,
    "inline-script-disabled":false,
    "space-tab-mixed-disabled":false,
    "id-class-ad-disabled":false,
    "href-abs-or-rel":false,
    "attr-unsafe-chars":false
}
```

**.csslintrc**

```
{
    "adjoining-classes": false,
    "box-model": false,
    "box-sizing": false,
    "bulletproof-font-face": false,
    "compatible-vendor-prefixes": false,
    "display-property-grouping": false,
    "duplicate-background-images": false,
    "duplicate-properties": false,
    "empty-rules": false,
    "fallback-colors": false,
    "floats": false,
    "font-faces": false,
    "font-sizes": false,
    "gradients": false,
    "ids": false,
    "import": false,
    "important": false,
    "known-properties": false,
    "non-link-hover": false,
    "outline-none": false,
    "overqualified-elements": false,
    "qualified-headings": false,
    "regex-selectors": false,
    "shorthand": false,
    "star-property-hack": false,
    "text-indent": false,
    "underscore-property-hack": false,
    "vendor-prefix": false,
    "unique-headings": false,
    "universal-selector": false,
    "unqualified-attributes": false,
    "zero-units": false
}
```

**.jshintrc**

```
{
  "node": true,
  "browser": true,
  "esnext": true,
  "bitwise": true,
  "camelcase": false,
  "curly": true,
  "eqeqeq": true,
  "immed": true,
  "indent": 2,
  "latedef": true,
  "newcap": true,
  "noarg": true,
  /*"quotmark": "single",*/
  "regexp": true,
  "undef": true,
  "unused": false,
  "strict": true,
  "trailing": true,
  "smarttabs": true,
  /*如下全局参数根据具体情况进行配置*/
  "globals": {
    "angular": true,
    "$": true,
    "jQuery": true,
    "moment":true,
    "sha1":true,
    "_":true,
    "echarts":true
  }
}
```

使用代码检测工具，以及采用统一配置文件，能帮助团队写出风格统一的代码，提高代码的可维护性，降低bug数量。

建议可以统一使用HTML-CSS-JS Prettify格式化代码。

参考：[https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify)
