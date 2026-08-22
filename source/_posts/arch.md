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

# Pacman配置
因为刚装好本地密钥库（keyring）太旧了，导致 Pacman 根本不信任新下载的软件包。但如果直接 pacman -S archlinux-keyring 更新密钥，Pacman 又会因为旧密钥校验不过去而拒绝下载它，陷入“先有鸡还是先有蛋”的死循环。
## 禁用密钥签名校验
`sed -i 's/SigLevel    = .*/SigLevel = Never/g' /etc/pacman.conf`
## 沙盒
`sed -i 's/#DisableSandbox/DisableSandbox/g' /etc/pacman.conf`

# 2. 初始化密钥环目录
```
pacman-key --init
pacman-key --populate archlinux
```
# 3. 强行安装/更新 keyring
`
pacman -S --noconfirm archlinux-keyring
`

改回
`sed -i 's/SigLevel    = .*/SigLevel = Required DatabaseOptional/g; s/SigLevel = Never/SigLevel = Required DatabaseOptional/g' /etc/pacman.conf`

# Zsh配置

## 安装zsh及其依赖
`pacman -S --noconfirm zsh zsh-completions git curl wget
`

## Oh My Zsh

### 第二阶段：安装 Oh My Zsh 框架（交互模式）

直接运行官方脚本，脚本会在中途询问是否将默认 Shell 切换为 Zsh：

```bash
sh -c "$(curl -fsSL [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"
```

---

### 第三阶段：下载美化插件与主题

```bash
# 1. 下载自动补全插件 (zsh-autosuggestions)
git clone [https://github.com/zsh-users/zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 2. 下载语法高亮插件 (zsh-syntax-highlighting)
git clone [https://github.com/zsh-users/zsh-syntax-highlightin##g.git](https://github.com/zsh-users/zsh-syntax-highlighting.git) ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 3. 下载 Powerlevel10k 现代主题
git clone --depth=1 [https://github.com/romkatv/powerlevel10k.git](https://github.com/romkatv/powerlevel10k.git) ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

---

### 第四阶段：配置 ~/.zshrc 并生效

```bash
# 1. 打开 Zsh 配置文件
nano ~/.zshrc

# -------------------------------------------------------------
# 2. 修改主题项 (找到 ZSH_THEME)：
ZSH_THEME="powerlevel10k/powerlevel10k"

# 3. 修改插件列表 (找到 plugins=(...))，添加新下载的插件：
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
)
# -------------------------------------------------------------

# 4. 保存退出后，重载配置文件应用美化并触发 p10k 交互配置向导
source ~/.zshrc
```

---

### 补充：重新调出 p10k 交互配置向导

如果后续想重新调整界面样式或图标，随时运行：

```bash
p10k configure
```
