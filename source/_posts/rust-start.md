---
layout: post
title: Rust 入门
draft: false
date: 2018-07-14 20:11:15
categories:
tags:
permalink:
description:
cover_img:
toc-disable:
comments:
---

本人为windows系统，从rust的 [下载页面](https://www.rust-lang.org/zh-CN/install.html) 下载在线安装程序 rustup‑init.exe ，运行即可在线安装。需要注意的是，rust默认安装在 `C:\Users\<用户名>\.cargo` 路径下。

安装完毕后，命令行运行 `rustc --version` 或 `cargo --version` 可打印出版本号。

如果需要升级rust，可以重复安装或者直接运行 `rustup update` 即可。

## 关于cargo

cargo是rust默认集成的构建工具和依赖管理工具，类似于npm或yarn之于Javascript、pip之于Python、maven之于Java。

运行 `cargo -h` 可打印出帮助信息：

```
OPTIONS:
    -V, --version           Print version info and exit
        --list              List installed commands
        --explain <CODE>    Run `rustc --explain CODE`
    -v, --verbose           Use verbose output (-vv very verbose/build.rs output)
    -q, --quiet             No output printed to stdout
        --color <WHEN>      Coloring: auto, always, never
        --frozen            Require Cargo.lock and cache are up to date
        --locked            Require Cargo.lock is up to date
    -Z <FLAG>...            Unstable (nightly-only) flags to Cargo, see 'cargo -Z help' for details
    -h, --help              Prints help information

Some common cargo commands are (see all commands with --list):
    build       Compile the current project
    check       Analyze the current project and report errors, but don't build object files
    clean       Remove the target directory
    doc         Build this project's and its dependencies' documentation
    new         Create a new cargo project
    init        Create a new cargo project in an existing directory
    run         Build and execute src/main.rs
    test        Run the tests
    bench       Run the benchmarks
    update      Update dependencies listed in Cargo.lock
    search      Search registry for crates
    publish     Package and upload this project to the registry
    install     Install a Rust binary
    uninstall   Uninstall a Rust binary
```

## 创建新项目

```bash
cargo new hello_cargo --bin # --bin 表示这是生成一个可执行程序，而不是一个库
```

## 编译项目

```bash
cd ./hello_cargo/
cargo build

# 优化编译项目，可以让 Rust 代码运行的更快
cargo build --release
```

## 执行

```bash
cargo run # 如果源码发生了变化会先构建再运行
```