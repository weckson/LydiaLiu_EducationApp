# 部署与更新指南

## 日常更新流程

### 场景：我在本地改了代码，想同步到 Lightsail 服务器

---

## 🅰️ 方式 A：通过 Git（推荐，最省心）

### 一次性设置（只需做一次）

**1. 在本地（Windows PowerShell）**

```powershell
cd D:\LydiaLiu_EducationApp
git init
git add .
git commit -m "initial commit"
```

**2. 去 GitHub 创建一个私有仓库**

- 打开 https://github.com/new
- Repository name: `LydiaLiu_EducationApp`
- 选 **Private**（⚠️ 必须私有，你的知识库是商业资产）
- 不要勾任何初始化选项
- Create repository

**3. 把本地代码推上去**

按 GitHub 页面上的指示：
```powershell
git remote add origin https://github.com/你的用户名/LydiaLiu_EducationApp.git
git branch -M main
git push -u origin main
```

**4. 在 Lightsail 服务器上配置 git**

```bash
cd ~
# 如果之前是 scp 上传的，先把旧目录备份
mv LydiaLiu_EducationApp LydiaLiu_EducationApp.old

# 克隆私有仓库（会提示输入 GitHub 用户名和 token）
git clone https://github.com/你的用户名/LydiaLiu_EducationApp.git

# 把旧的 .env 和 dev.db 迁移过来
cp LydiaLiu_EducationApp.old/.env LydiaLiu_EducationApp/
cp LydiaLiu_EducationApp.old/prisma/dev.db LydiaLiu_EducationApp/prisma/

# 确认新目录可用后删除备份
# rm -rf LydiaLiu_EducationApp.old
```

> 💡 GitHub 不再支持明文密码，需要 [Personal Access Token](https://github.com/settings/tokens)。
> 创建 token 时勾 `repo` 权限，用 token 代替密码。

### 以后每次更新（只要 2 个命令）

**1. 本地改好代码后**
```powershell
cd D:\LydiaLiu_EducationApp
git add .
git commit -m "update: 美化界面"
git push
```

**2. 登录 Lightsail 服务器**
```bash
cd ~/LydiaLiu_EducationApp
bash deploy/update.sh
```

`update.sh` 会自动完成：拉代码 → 装依赖 → 同步数据库 → 生产构建 → 重启。

---

## 🅱️ 方式 B：通过 scp/rsync（不用 GitHub）

### 在本地（Windows PowerShell）

**1. 打包发送**（每次更新运行这个）

```powershell
cd D:\LydiaLiu_EducationApp

# 用 scp 传源码（排除 node_modules 和 dev.db）
# 假设你的 SSH key 是 D:\lightsail-key.pem
scp -i D:\lightsail-key.pem -r `
  app components lib prisma public deploy `
  package.json package-lock.json tsconfig.json `
  next.config.mjs tailwind.config.ts postcss.config.mjs `
  ubuntu@52.64.107.186:~/LydiaLiu_EducationApp/
```

**或者用 rsync（更快，只传变化的文件）**

如果你的电脑有 WSL 或 Git Bash，rsync 比 scp 快很多：
```bash
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='prisma/dev.db*' \
  -e "ssh -i /path/to/lightsail-key.pem" \
  /d/LydiaLiu_EducationApp/ \
  ubuntu@52.64.107.186:~/LydiaLiu_EducationApp/
```

### 在服务器（SSH 登录后）

```bash
cd ~/LydiaLiu_EducationApp
bash deploy/update.sh
```

---

## 🧪 只改了前端样式（CSS/JSX），不需要全流程

如果你确定只动了 UI 代码（没改依赖、没改数据库），可以跳过一些步骤：

```bash
cd ~/LydiaLiu_EducationApp
# 传完代码后
NODE_OPTIONS="--max-old-space-size=2048" npm run build
pm2 restart lydia-app
```

用时更短（大约 1-2 分钟 vs 完整流程 5 分钟）。

---

## 🆘 常见问题

### Q: `npm run build` 卡住或被 Killed
A: 内存不够。检查 swap：
```bash
free -h
```
Swap 应该有至少 2G。没有的话：
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Q: 更新后页面还是旧的
A: 浏览器缓存。按 **Ctrl + F5** 强制刷新，或清除浏览器缓存。

### Q: pm2 重启后网站 502
A: 查日志：
```bash
pm2 logs lydia-app --lines 50
```
常见原因：`.env` 缺失 / `OPENAI_API_KEY` 无效 / 端口冲突。

### Q: 想看服务器上的数据库内容
A: 
```bash
cd ~/LydiaLiu_EducationApp
npx prisma studio
```
会启动在服务器 5555 端口。你可以临时用 SSH 端口转发访问：
```bash
# 在本地电脑
ssh -i key.pem -L 5555:localhost:5555 ubuntu@52.64.107.186
```
然后本地浏览器打开 http://localhost:5555

### Q: 数据库升级失败怎么恢复？
A: 每次 `update.sh` 会自动备份数据库到 `prisma/dev.db.backup-时间戳`。
恢复：
```bash
cp prisma/dev.db.backup-XXXXXXXX prisma/dev.db
pm2 restart lydia-app
```
