# 刘丽航专属澳洲留学 App

一个属于 **刘丽航 (Lydia Liu)** 的个人知识管理 + AI 问答 + 学生服务工具，专为澳洲留学/移民顾问业务打造。

---

## 这是什么？

三合一工具：
1. **个人知识库** —— 日常沉淀签证、院校、政策、案例知识，打标签、搜索
2. **RAG 智能问答** —— 用 AI 结合你自己的知识库回答问题（Phase 2 启用）
3. **学生服务端** —— 学生登录后可以提问、填资料、跟踪申请进度（Phase 3 启用）

---

## 首次运行步骤（超详细，跟着做就行）

### 1. 安装 Node.js（一次性，约 5 分钟）

1. 打开 https://nodejs.org/ 
2. 下载 **LTS 版本**（左边那个绿色按钮，显示 "Recommended For Most Users"）
3. 双击安装包，一路点 Next 即可
4. 安装完后打开 **PowerShell**（开始菜单搜 "powershell"），输入下面两个命令验证：
   ```
   node --version
   npm --version
   ```
   如果都显示出版本号（比如 `v20.xx.x` 和 `10.x.x`），说明安装成功。

### 2. 安装项目依赖（第一次需要，约 2-5 分钟）

打开 PowerShell，切到项目目录：
```powershell
cd D:\LydiaLiu_EducationApp
npm install
```
这一步会下载所有需要的库，时间取决于你的网速。

### 3. 配置环境变量

复制一份 `.env.example` 为 `.env`：
```powershell
copy .env.example .env
```

**打开 `.env` 文件**（用记事本或 VS Code），填入你的 OpenAI Key：
```
OPENAI_API_KEY="sk-proj-你的key粘贴到这里"
```

> 💡 Phase 2 开始，AI 问答功能会用到 OpenAI。如果暂时不想配置 Key，知识库的录入/搜索功能照样能用，只是 AI 问答页会报错。

### 4. 初始化数据库

```powershell
npm run db:push
```
这会在 `prisma/dev.db` 生成本地 SQLite 数据库文件。

### 5. （可选）导入初始知识库数据

我为你准备了 **69 条**初始知识（35 条签证 + 34 条院校）作为起点：

```powershell
npm run db:seed
```

这一步会读取 `prisma/seed/` 下的数据文件，批量写入数据库。脚本是**幂等的**——重复跑不会产生重复条目。

> ⚠️ **重要提醒**：这些初始数据是我基于 2025 年 12 月前公开信息整理的**骨架**，作为专业顾问你必须在使用前**逐条核对**，尤其是费用、分数、配额、英语门槛等经常变动的数字。每条知识都带了 `sourceUrl` 指向官方页面，方便你快速复核。

### 5.5 为所有知识生成 AI 向量（Phase 2 新增）

```powershell
npm run db:embed
```

这一步会调用 OpenAI API 给 69 条种子数据一次性生成向量（约 30 秒，成本 < ¥0.1）。没有向量的条目不会出现在 AI 问答的检索结果里。

> 之后你每次在 app 里**新增或修改**知识条目，系统会自动调用 OpenAI 生成向量，不需要再手动跑这个命令。只有在**批量导入或换模型**时才需要重跑。

### 6. 启动应用 🎉

```powershell
npm run dev
```
看到类似 `Ready in 2.3s` 和 `Local: http://localhost:3000` 时，说明已经跑起来了。

打开浏览器访问：**http://localhost:3000**

---

## 日常使用

**每次打开电脑想用 app 时：**
1. 打开 PowerShell
2. `cd D:\LydiaLiu_EducationApp`
3. `npm run dev`
4. 浏览器打开 http://localhost:3000

**关闭 app：** 在 PowerShell 窗口按 `Ctrl + C`。

**查看数据库原始数据：**
```powershell
npm run db:studio
```
会打开一个网页可视化地浏览数据。

---

## 目录结构一览

```
LydiaLiu_EducationApp/
├── app/                    Next.js 页面
│   ├── page.tsx            首页（统计 + 最近更新）
│   └── knowledge/          知识库页面
│       ├── page.tsx        列表 + 搜索
│       ├── new/            新增
│       └── [id]/           详情 / 编辑
├── components/             共享组件
│   └── EntryForm.tsx       录入/编辑表单
├── lib/
│   ├── db.ts               Prisma 数据库客户端
│   ├── actions.ts          Server Actions（增删改查）
│   └── markdown.ts         简易 Markdown 渲染
├── prisma/
│   ├── schema.prisma       数据库结构定义
│   ├── seed.ts             种子脚本（批量导入初始知识）
│   ├── seed/               种子数据（签证 + 院校）
│   │   ├── types.ts
│   │   ├── visas.ts        35 条签证知识
│   │   └── universities.ts 34 条院校信息
│   └── dev.db              本地 SQLite 数据库（运行后生成）
├── .env                    环境变量（不要提交到 git）
├── .env.example            环境变量模板
└── package.json
```

---

## Phase 1 + Phase 2 已实现的功能

### Phase 1 — 知识库
- ✅ 首页：统计 + 最近更新
- ✅ 知识库列表：全文搜索、分类筛选
- ✅ 新增 / 编辑 / 删除知识条目
- ✅ Markdown 正文编辑和渲染
- ✅ 标签系统（自由输入，自动去重）
- ✅ 可见性字段（PRIVATE / STUDENT_VISIBLE）

### Phase 2 — AI 问答（RAG）
- ✅ 知识条目保存时自动生成向量
- ✅ 聊天界面：新建会话 / 历史对话 / 删除
- ✅ RAG 检索：向量相似度 top-K
- ✅ 引用展示：答案下方列出参考条目 + 相似度分数
- ✅ LLM 抽象层（未来换模型只改一个文件）
- ✅ 对话历史（上下文连续）

## 接下来会做什么

- **Phase 3**：学生端账号系统 + 申请进度看板
- **Phase 4**：PWA 支持 + AWS Lightsail 部署上线

完整规划见 `C:\Users\29019\.claude\plans\crispy-tumbling-bubble.md`

---

## 常见问题

**Q: 启动失败提示 "port 3000 is in use"？**  
A: 先关掉之前的 `npm run dev` 窗口，或者改用其他端口：`npm run dev -- -p 3001`

**Q: 我想在另一台电脑上用这些数据怎么办？**  
A: 直接复制整个项目文件夹即可（特别是 `prisma/dev.db` 文件）。Phase 4 会迁到云端，那时候就不需要复制了。

**Q: 数据会丢吗？**  
A: 数据全部存在 `prisma/dev.db` 这一个文件里。**强烈建议每周把这个文件复制一份到 U 盘或网盘**做备份。

**Q: 我不小心删错了知识条目怎么办？**  
A: 目前是硬删除。如果有备份可以恢复；Phase 2 会加"回收站"软删除功能。
