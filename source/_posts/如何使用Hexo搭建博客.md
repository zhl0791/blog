---
title: 如何使用Hexo搭建博客
date: 2016-06-27 13:57:16
tags:
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

### 安装和启动

```bash
npm install hexo-cli -g
hexo init blog
cd blog
npm install
npm install hexo-deployer-git # 如果要部署到github page
hexo server
```

此时你已经可以访问 [http://localhost:4000](http://localhost:4000) 看到博客的运行效果了。

### 完善个人信息
打开_config.yml文件，适当修改你所关注的信息，比如：

```
title: 赵磊的技术博客
author: 赵磊
language: zh-CN
timezone: Asia/Shanghai
...
# 如下信息用于配置部署到github page
deploy:
  type: git
  repo: https://github.com/zhaoleiwhut/zhaoleiwhut.github.io.git ## 这是我的github博客地址
  branch: master
```

### 新建一篇文章

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### 再次运行服务器可以看到新添加的文章

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### 生成和部署

``` bash
$ hexo generate
$ hexo deploy
```

More info: [Generating](https://hexo.io/docs/generating.html)
More info: [Deployment](https://hexo.io/docs/deployment.html)
