---
title: Termux安装Arch
date: 2026-8-22 15:01:00
categories:
- tech
tags:
---

#安装Arch Linux
用termux配合tmoe安装脚本来安装Arch

## 下载Termux
<https://github.com/termux/termux-app/releases/tag/v0.118.3>

## 下载tmoe
`awk -f <(curl -L l.tmoe.me/2.awk)`

# Arch配置
因为刚装好本地密钥库（keyring）太旧了，导致 Pacman 根本不信任新下载的软件包。但如果直接 pacman -S archlinux-keyring 更新密钥，Pacman 又会因为旧密钥校验不过去而拒绝下载它，陷入“先有鸡还是先有蛋”的死循环。
## 禁用密钥签名校验
`sed -i 's/SigLevel    = .*/SigLevel = Never/g' /etc/pacman.conf`
## 沙盒
`sed -i 's/#DisableSandbox/DisableSandbox/g' /etc/pacman.conf`

## 1. 强行安装最新版密钥包
`pacman -Sy --noconfirm archlinux-keyring`

## 2. 重新初始化并填充官方密钥
```
pacman-key --init
pacman-key --populate archlinux
```
改回
`sed -i 's/SigLevel    = .*/SigLevel = Required DatabaseOptional/g; s/SigLevel = Never/SigLevel = Required DatabaseOptional/g' /etc/pacman.conf`
