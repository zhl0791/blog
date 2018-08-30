---
layout: post
title: python运行环境管理工具virtualenv
draft: false
date: 2018-08-30 14:29:42
categories:
tags:
permalink:
description:
cover_img:
toc-disable:
comments:
---

在开发Python应用程序的时候，各项目的第三方依赖版本通常都不同，依赖被pip默认安装在Python3的site-packages目录下。

如果A项目依赖 django 1.9，B项目依赖django2.0，则会出现依赖冲突。

怎么解决呢？就要用到本文所提到的工具 virtualenv 。

> 本文是在 `windows` 进行的操作，其它系统操作过程可能略有不同。

## virtualenv 的安装和基本使用方法

```bash
# 安装
pip install virtualenv

# 检查是否安装成功
virtualenv --version
```

创建新项目和执行环境

```bash
# 创建新项目
mkdir demo
cd demo

# 创建独立的运行环境
virtualenv env

# 激活环境
./env/Scripts/activate.bat

# 解除环境（恢复到默认环境）
./env/Scripts/deactivate.bat
```

> 在linux下，激活环境的命令式 `source bin/activate` ，取消激活方法是 `deactivate` 。

## --system-site-packages 参数

使用 `virtualenv --system-site-packages env` 参数可以继承全局环境的依赖库，`...python3.7/site-packages` 中的依赖资源会被复制到新的环境中。

## --extra-search-dir 参数

使用 `--extra-search-dir` 可以指定本地其它的环境版本，假如本地同时存在 python2.7，则可按如下方式创建基于python2.7的新环境：

```bash
virtualenv --extra-search-dir=D:/Program Files/Python27 env
```

## 其它参数

- `--version` show program’s version number and exit

- `-h, --help` show this help message and exit

- `-v, --verbose` Increase verbosity.

- `-q, --quiet` Decrease verbosity.

- `-p PYTHON_EXE, --python=PYTHON_EXE` The Python interpreter to use, e.g., –python=python2.5 will use the python2.5 interpreter to create the new environment. The default is the interpreter that virtualenv was installed with (like /usr/bin/python)

- `--clear` Clear out the non-root install and start from scratch.

- `--system-site-packages` Give the virtual environment access to the global site-packages.

- `--always-copy` Always copy files rather than symlinking.

- `--relocatable` Make an EXISTING virtualenv environment relocatable. This fixes up scripts and makes all .pth files relative.

- `--unzip-setuptools` Unzip Setuptools when installing it.

- `--no-setuptools` Do not install setuptools in the new virtualenv.

- `--no-pip` Do not install pip in the new virtualenv.

- `--no-wheel` Do not install wheel in the new virtualenv.

- `--extra-search-dir=DIR` Directory to look for setuptools/pip distributions in. This option can be specified multiple times.

- `--prompt=PROMPT` Provides an alternative prompt prefix for this environment.

- `--download` Download preinstalled packages from PyPI.

- `--no-download` Do not download preinstalled packages from PyPI.

- `--no-site-packages` DEPRECATED. Retained only for backward compatibility. Not having access to global site-packages is now the default behavior.

- `--distribute`

- `--setuptools` Legacy; now have no effect. Before version 1.10 these could be used to choose whether to install Distribute or Setuptools into the created virtualenv. Distribute has now been merged into Setuptools, and the latter is always installed.

