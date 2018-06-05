---
title: Ubuntu解决wifi无法连接的问题
date: 2015-07-17 10:21:44
tags:
---
最近给dell笔记本安装最新版Ubuntu15.04，发现wifi能识别，但是输入密码后却无法连接网络。

查找资料发现，原来驱动都是正确安装了的，但是笔记本需要按Fn+F2开启无线wifi连接。

命令行终端输入：lshw -C network

*-network               
       description: Ethernet interface
       product: RTL8101E/RTL8102E PCI Express Fast Ethernet controller
       vendor: Realtek Semiconductor Co., Ltd.
       physical id: 0
       bus info: pci@0000:02:00.0
       logical name: eth0
       version: 07
       serial: 34:17:eb:86:74:2c
       size: 10Mbit/s
       capacity: 100Mbit/s
       width: 64 bits
       clock: 33MHz
       capabilities: bus_master cap_list ethernet physical tp mii 10bt 10bt-fd 100bt 100bt-fd autonegotiation
       configuration: autonegotiation=on broadcast=yes driver=r8169 driverversion=2.3LK-NAPI duplex=half firmware=rtl8106e-1_0.0.1 06/29/12 latency=0 link=no multicast=yes port=MII speed=10Mbit/s
       resources: irq:48 ioport:4000(size=256) memory:d2200000-d2200fff memory:d2000000-d2003fff
  *-network DISABLE
       description: Wireless interface
       product: Wireless 3160
       vendor: Intel Corporation
       physical id: 0
       bus info: pci@0000:03:00.0
       logical name: wlan0
       version: 83
       serial: d0:7e:35:83:42:49
       width: 64 bits
       clock: 33MHz
       capabilities: bus_master cap_list ethernet physical wireless
       configuration: broadcast=yes driver=iwlwifi driverversion=3.19.0-15-generic firmware=25.15.12.0 ip=192.168.1.110 latency=0 link=yes multicast=yes wireless=IEEE 802.11abgn
       resources: irq:51 memory:d2100000-d2101fff
WARNING: output may be incomplete or inaccurate, you should run this program as super-user.

可以看到第二个network是DISABLE状态，按下Fn+F2键后再次运行该命令即可发现DISABLE状态消失了，此时重启系统即可正常连接wifi了。

解决过程很简单，留下笔记，说不定能帮到别人。
