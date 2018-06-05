# zhl的博客

https://zhaoleiwhut.github.io

## 安装和启动

```bash
npm install hexo-cli -g # 全局安装
hexo init blog
cd blog
npm install
npm install hexo-deployer-git # 如果要部署到 github page
hexo server
```

此时你已经可以访问 [http://localhost:4000](http://localhost:4000) 看到博客的运行效果了。

## 完善个人信息
打开_config.yml文件，适当修改你所关注的信息，比如：

```
title: zhl的技术博客
author: zhl
language: zh-CN
timezone: Asia/Shanghai
...
# 如下信息用于配置部署到github page
deploy:
  type: git
  repo: https://github.com/zhaoleiwhut/zhaoleiwhut.github.io.git ## 这是我的github博客地址
  branch: master
```

## 主题
https://github.com/huyingjie/hexo-theme-A-RSnippet
http://arsnippet.yingjiehu.com/

## 新建一篇文章

``` bash
$ npm run hexo new "新文章"
```

More info: [Writing](https://hexo.io/docs/writing.html)

## 再次运行服务器可以看到新添加的文章

``` bash
$ npm run server
# 或
$ npm run hexo server
```

参考: [Server](https://hexo.io/docs/server.html)

## 生成和部署

``` bash
$ npm run deploy
# 或
$ npm run hexo generate
$ npm run hexo deploy
```

参考: [Generating](https://hexo.io/docs/generating.html)
参考: [Deployment](https://hexo.io/docs/deployment.html)
