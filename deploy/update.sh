#!/bin/bash
# Lightsail 服务器端更新脚本
#
# 用法：在服务器上 cd ~/LydiaLiu_EducationApp && bash deploy/update.sh
#
# 这个脚本会：
# 1. 拉最新代码（如果用 git）
# 2. 装新依赖（仅 package.json 变化时）
# 3. 同步数据库结构（仅 schema.prisma 变化时）
# 4. 生产构建
# 5. 用 pm2 重启服务
#
# 数据不会丢：dev.db 和 .env 都不会被覆盖。

set -e  # 任何命令失败立即退出

echo "═══════════════════════════════════════════"
echo " 🌸 Lydia App 更新部署"
echo "═══════════════════════════════════════════"

# —— 确认当前目录正确 ——
if [ ! -f "package.json" ]; then
  echo "❌ 当前目录不是项目根目录（找不到 package.json）"
  echo "   请 cd 到 ~/LydiaLiu_EducationApp 后再运行"
  exit 1
fi

# —— 备份数据库（安全起见） ——
if [ -f "prisma/dev.db" ]; then
  BACKUP_FILE="prisma/dev.db.backup-$(date +%Y%m%d-%H%M%S)"
  cp prisma/dev.db "$BACKUP_FILE"
  echo "✓ 数据库已备份到 $BACKUP_FILE"
fi

# —— 拉最新代码（git 方式） ——
if [ -d ".git" ]; then
  echo ""
  echo "▶ 拉取最新代码..."
  git fetch origin

  # 如果有本地未提交修改（通常是 deploy/update.sh 的权限变化等），
  # 自动暂存后再 rebase，避免每次被挡住
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️  检测到服务器本地有未提交修改，自动暂存..."
    git stash push -u -m "auto-stash-by-update-script-$(date +%s)"
    STASHED=1
  else
    STASHED=0
  fi

  git pull --rebase

  # 不恢复 stash —— 服务器的本地修改通常是无意产生的
  # 如果你确实需要恢复，手动运行 git stash list + git stash pop
  if [ "$STASHED" = "1" ]; then
    echo "ℹ️  本地修改已暂存。如需恢复，运行 git stash list / git stash pop"
  fi

  echo "✓ 代码已更新"
else
  echo ""
  echo "⚠️  没检测到 git，跳过自动拉取"
  echo "   如果你是通过 scp/rsync 上传的，确保文件已到位"
fi

# —— 检查是否需要重装依赖 ——
echo ""
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules/.package-lock.json" ] 2>/dev/null; then
  echo "▶ 依赖发生变化，重新安装..."
  npm install --no-audit --no-fund --maxsockets=2
  echo "✓ 依赖安装完成"
else
  echo "⏭  依赖无变化，跳过 npm install"
fi

# —— 同步数据库 schema（prisma db push） ——
echo ""
echo "▶ 同步数据库结构..."
npx prisma generate
npx prisma db push --skip-generate
echo "✓ 数据库结构已同步"

# —— 生产构建 ——
echo ""
echo "▶ 生产构建（需要几分钟）..."
NODE_OPTIONS="--max-old-space-size=2048" npm run build
echo "✓ 构建完成"

# —— 重启 pm2 ——
echo ""
echo "▶ 重启服务..."
if pm2 list | grep -q "lydia-app"; then
  pm2 restart lydia-app --update-env
  echo "✓ 服务已重启"
else
  echo "⚠️  pm2 里没找到 lydia-app，启动新进程..."
  pm2 start npm --name "lydia-app" -- start
  pm2 save
fi

# —— 清理老备份（只保留最近 5 份） ——
echo ""
echo "▶ 清理老的数据库备份（保留最近 5 份）..."
ls -1t prisma/dev.db.backup-* 2>/dev/null | tail -n +6 | xargs -r rm -f
echo "✓ 清理完成"

echo ""
echo "═══════════════════════════════════════════"
echo " ✨ 部署完成！"
echo " 访问：http://$(curl -s ifconfig.me)"
echo "═══════════════════════════════════════════"

# —— 显示状态 ——
pm2 list
