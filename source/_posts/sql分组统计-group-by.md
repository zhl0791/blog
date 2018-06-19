---
layout: post
title: sql分组统计“group by”
draft: false
date: 2018-06-19 13:51:21
categories: 
- ["database", "postgreSQL"]
- ["language", "sql"]
tags: 
- sql
- group by
permalink:
description:
cover_img:
toc-disable:
comments:
---

GROUP BY 语句用于结合聚合函数，根据一个或多个列对结果集进行分组。

## 准备数据
先准备数据，数据如图所示：
![数据](./data.png)

## 按app字段分组

```sql
select
  fun(logs.id) as c, -- fun表示聚合函数
  logs.app
from public.logs as logs
group by logs.app;
```

### 计数 count
```sql
select
  count(logs.id) as c,
  logs.app
from public.logs as logs
group by logs.app
order by c desc
limit 10;
```

### 求和 sum
```sql
select
  sum(logs.packets) as s,
  logs.app
from public.logs as logs
group by logs.app
order by s desc
limit 10;
```

### 求均值 avg
```sql
select
  avg(logs.packets) as s,
  logs.app
from public.logs as logs
group by logs.app
order by s desc
limit 10;
```

### 取最大值 max
```sql
select
  max(logs.packets) as s,
  logs.app
from public.logs as logs
group by logs.app
order by s desc
limit 10;
```

### 取最小值 max
```sql
select
  min(logs.packets) as s,
  logs.app
from public.logs as logs
group by logs.app
order by s desc
limit 10;
```

### 取平均值大于11710, having
```sql
select
  avg(logs.packets) as s,
  logs.app
from public.logs as logs
group by logs.app
having avg(logs.packets) > 11710
order by s desc
limit 10;
```

### 大小写 upper 和 lower
```sql
select upper(logs.d_region), lower(logs.s_region)
from public.logs as logs
limit 10;
```

### 字符串长度
```sql
select length(logs.d_region) as length_of_region
from public.logs as logs
limit 10;
```

### 取平均值大于11710，并且四舍五入 round
```sql
select
  round(avg(logs.packets), 2) as s,
  logs.app,
  now()                       as date
from public.logs as logs
group by logs.app
HAVING avg(logs.packets) > 11710
order by s desc
limit 10;
```
