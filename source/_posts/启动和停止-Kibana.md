---
title: 启动和停止 Kibana
date: 2018-05-11 14:07:56
tags:
---

- 操作系统：CentOS
- kibana 版本：6.2.4

如果 kibana 实例已存在，需要先关停：

```bash
# 先根据端口号找到进程
fuser -n tcp 5601
# 获取进程id后杀死进程(假设进程号是1111)
kill -9 1111
```

下载 kibana 并解压，修改 kibana-6.2.4-linux-x86_64/config/kibana.yml ，加入如下两行：

```yml
# IP1为kibana实例所在服务器
server.host: "IP1"

# IP2为ES实例所在服务器
elasticsearch.url: "http://IP2:9200"
```

开启文件夹权限：

```
sudo chmod -R 777 ./kibana-6.2.4-linux-x86_64
sudo chown -R root:root ./kibana-6.2.4-linux-x86_64
```

启动：

```
nohup ./kibana-6.2.4-linux-x86_64/bin/kibana &
```

访问 http://IP1:5601/

