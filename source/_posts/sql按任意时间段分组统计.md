---
layout: post
title: sql按任意时间段分组统计
draft: false
date: 2018-06-19 14:29:32
categories: 
- ["database", "postgreSQL"]
- ["language", "sql"]
tags: 
- sql
- group by
- 按时间分组
permalink:
description:
cover_img:
toc-disable:
comments:
---

任意时间序列数据都可以按时间分组。
timestamp 为时间戳。

**按每五分钟统计日志的数目**
```sql
select
  floor(cast(logs.timestamp as int) / 60 / 5) as dt,
  count(logs.id)
from (
       select
         logs.id,
         logs.timestamp
       from public.logs as logs
       order by logs.id asc
       limit 10) as logs
group by floor(cast(logs.timestamp as int) / 60 / 5);
```
