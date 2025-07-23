# 🎯 五子棋游戏（Gomoku Game）

一个基于 **Next.js** 开发的现代化五子棋游戏，支持 **人机对战** 与 **双人对战** 模式。

---

## ✨ 功能特色

### 🎮 游戏模式

* **人机对战**：与智能 AI 对手较量，具备攻防兼备策略
* **双人对战**：两个玩家可在同一设备上对战

### 🤖 智能 AI 系统

* 多层次思考逻辑：优先胜利 → 阻止对手 → 棋盘价值评估
* 战术识别能力：识别活四、冲四、活三等关键棋型
* 防守机制：防范玩家即将获胜的威胁
* 主动进攻：发现并把握胜机

### 🎨 用户体验设计

* 现代化 UI：渐变配色 + 动画交互
* 响应式布局：支持手机、平板与桌面设备
* 状态反馈：落子动画、获胜弹窗提示
* 原汁原味：支持“落子无悔”传统规则

---

## 🚀 快速开始

### 📦 环境要求

* Node.js ≥ **18.0.0**
* npm ≥ **8.0.0** 或 yarn ≥ **1.22.0**

### 🛠️ 安装步骤

1. 克隆项目

   ```bash
   git clone <项目地址>
   cd gomoku-game
   ```

2. 安装依赖

   ```bash
   npm install
   # 或使用 yarn
   yarn install
   ```

3. 启动开发服务器

   ```bash
   npm run dev
   # 或使用 yarn
   yarn dev
   ```

4. 打开浏览器访问

   [http://localhost:3000](http://localhost:3000)

---

### 🔧 构建生产版本

```bash
# 构建项目
npm run build

# 启动生产服务器
npm run start
```

---

## 🧩 游戏规则

### 📘 基本规则

* 棋盘大小：15×15
* 黑子先行，轮流下子
* 横、竖、斜方向连成 5 子即胜
* **落子无悔**：一旦落子不可撤销

### 🎯 操作方式

* 点击棋盘空位即可下子
* 点击「重新开始」按钮重开一局
* 切换模式自动重置棋盘

---

## ⚙️ 技术栈

### 🧱 前端框架

* **Next.js 15** - React 全栈开发框架
* **React 18** - 声明式 UI 库
* **TypeScript** - 静态类型增强开发体验

### 💅 UI 设计与组件

* **Tailwind CSS** - 原子化 CSS 框架
* **Radix UI** - 无障碍组件库
* **Lucide React** - 现代图标库
* **class-variance-authority** - 样式变体管理工具

### 🧰 开发工具链

* **ESLint** - 代码风格检查
* **PostCSS + Autoprefixer** - CSS 自动处理

---

## 📁 项目结构

```
gomoku-game/
├── app/                    # Next.js App Router
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局组件
│   └── page.tsx            # 主页面组件（游戏主体）
├── components/             # 可复用组件
│   └── ui/                 # UI 基础组件
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── dialog.tsx
├── hooks/                  # 自定义 Hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                    # 工具函数
│   └── utils.ts
├── public/                 # 静态资源目录
├── package.json            # 项目依赖配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明文档
```

---

## 🖼️ 游戏截图

### 🤖 人机对战

* AI 将根据当前局势动态决策
* 攻守兼备，模拟真实对战体验

### 🧑‍🤝‍🧑 双人对战

* 支持本地双人轮流下棋
* 适合朋友对弈、家庭娱乐

### 🏆 获胜提示

* 精美弹窗提示胜者
* 一键开启新局

---

## ⚙️ 自定义配置

### 棋盘大小

修改 `app/page.tsx` 中的 `BOARD_SIZE`：

```ts
const BOARD_SIZE = 15 // 可改为 19、13 等尺寸
```

### 获胜连子数

修改 `WINNING_LENGTH`：

```ts
const WINNING_LENGTH = 5 // 改为 4 或 6 等自定义规则
```

### 样式主题调整

* 编辑 `tailwind.config.ts` 自定义颜色和字体
* 修改 `app/globals.css` 进行全局样式覆盖

---

## 🤝 贡献指南

欢迎任何形式的贡献！

### 提交流程

1. Fork 本仓库
2. 创建分支：`git checkout -b feature/YourFeature`
3. 提交更改：`git commit -m 'Add YourFeature'`
4. 推送分支：`git push origin feature/YourFeature`
5. 创建 Pull Request

---

## 📌 更新日志

### v1.0.0

* ✅ 支持五子棋核心玩法
* ✅ 人机对战 + 双人对战
* ✅ 智能 AI 对手
* ✅ 响应式 UI 与美观动画
* ✅ 获胜提示与状态切换

---

## 📄 许可证

本项目使用 **MIT License**。详情请见 [LICENSE](./LICENSE)。

---

## 🙏 特别致谢

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Radix UI](https://www.radix-ui.com/)
* [Lucide Icons](https://lucide.dev/)

---

🎉 **享受游戏，祝你连胜五子！**

---

