---
layout: post
title: Dart 语言入门
draft: false
date: 2018-08-09 12:02:46
categories:
tags:
permalink:
description:
cover_img:
toc-disable:
comments:
---

昨天google发布了dart 2.0稳定版。

## Dart SDK 安装

Dart提供了三种安装方式，分别是使用 Chocolatey 包管理工具安装、在线安装、离线包安装，具体参看 [安装教程](https://www.dartlang.org/tools/sdk#install-the-sdk) 页面。

目前来看因为墙的缘故在线安装会失败，可以选择离线宝安装，具体步骤为：

1. 下载SDK的离线zip包直接解压，[离线下载地址](https://www.dartlang.org/tools/sdk/archive)；
2. 然后将解压后的bin目录添加到path路径即可。

离线下载地址为：

```
# 离线下载通用格式：
https://storage.googleapis.com/dart-archive/channels/<stable|dev>/release/<release>/sdk/dartsdk-<platform>-<architecture>-release.zip

# Windows系统x64架构版本的示例如下:
https://storage.googleapis.com/dart-archive/channels/stable/release/2.0.0/sdk/dartsdk-windows-x64-release.zip
```

安装完毕后，命令行运行 `dart --version` 或 `pub --version` 可打印出版本号。

Dart SDK 包含如下组件：

| 组件         | 功能                |
|:-------------|:------------------|
| dart | Dart 虚拟机 |
| dart2js | Dart-to-JavaScript 编译器 (仅用于web开发) |
| dartanalyzer | 静态分析工具 |
| dartdevc | 开发模式编译器 (仅用于web开发) |
| dartdoc | 文档生成器 |
| dartfmt | 代码格式化工具 |
| pub | 包管理工具 |

## 包管理工具 pub

pub是Dart默认集成的构建工具和依赖管理工具，类似于npm或yarn之于Javascript、pip之于Python、maven之于Java。

使用pub进行依赖管理，在 https://pub.dartlang.org/ 可以查看所有可用的Dart包。

运行 `pub -h` 可打印出帮助信息：

```
Pub is a package manager for Dart.

Usage: pub <command> [arguments]

Global options:
-h, --help             Print this usage information.
    --version          Print pub version.
    --[no-]trace       Print debugging information when an error occurs.
    --verbosity        Control output verbosity.

          [all]        Show all output including internal tracing messages.
          [error]      Show only errors.
          [io]         Also show IO operations.
          [normal]     Show errors, warnings, and user messages.
          [solver]     Show steps during version resolution.
          [warning]    Show only errors and warnings.

-v, --verbose          Shortcut for "--verbosity=all".

Available commands:
  cache       Work with the system cache.
  deps        Print package dependencies.
  downgrade   Downgrade the current package's dependencies to oldest versions.
  get         Get the current package's dependencies.
  global      Work with global packages.
  help        Display help information for pub.
  publish     Publish the current package to pub.dartlang.org.
  run         Run an executable from a package.
  upgrade     Upgrade the current package's dependencies to latest versions.
  uploader    Manage uploaders for a package on pub.dartlang.org.
  version     Print pub version.

Run "pub help <command>" for more information about a command.
See http://dartlang.org/tools/pub for detailed documentation.
```

### 脚手架工具 Stagehand 

Dart 官方团队推出了基于pub的脚手架工具 [Stagehand](https://pub.dartlang.org/packages/stagehand)。

```bash
# 安装 (或升级) Stagehand
pub global activate stagehand
```

### 创建 Dart 项目

```bash
mkdir app1
cd app1
stagehand package-simple
```

> **注意**，Stagehand 预设了如下几种项目模板：
- console-full - *命令行项目*
- package-simple - *用于独立项目或 Dart 库*
- server-shelf - *用 shelf 库构建的web服务端项目*
- web-angular - *集成 material design 组件库的 web app*
- web-simple - *仅使用 Dart 核心库的web app*
- web-stagexl - *一个 2D 动画和游戏项目*

### 执行项目

```bash
# 获取依赖
pub get

# 运行
pub run example/app1_example.dart
# 或者
dart example/app1_example.dart
```

### 安装依赖

pubspec.yaml 配置文件包含项目的元数据，比如项目名、项目描述、依赖、命令等。

在 pubspec.yaml 添加如下设置：

```
dependencies:
  js: ^0.3.0
```

运行 `pub get` 即可自动安装依赖。
