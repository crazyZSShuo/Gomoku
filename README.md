# 五子棋游戏 🎯

一个基于 Next.js 开发的现代化五子棋游戏，支持人机对战和双人对战模式。

## ✨ 功能特色

### 🎮 游戏模式
- **人机对战**：与智能AI对手对战，AI具备强大的攻防策略
- **双人对战**：支持两个玩家在同一设备上对战

### 🤖 智能AI系统
- **多层次思考**：优先获胜 → 阻止对手获胜 → 位置价值评估
- **战术理解**：识别活四、冲四、活三等重要棋型
- **防守策略**：及时阻挡玩家的获胜威胁
- **进攻策略**：主动寻找获胜机会

### 🎨 用户体验
- **美观界面**：现代化设计，渐变色彩搭配
- **响应式布局**：适配不同屏幕尺寸
- **流畅动画**：棋子放置和状态切换动画
- **获胜弹窗**：精美的游戏结束提示
- **落子无悔**：符合传统五子棋规则

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装步骤

1. **克隆项目**
   \`\`\`bash
   git clone <项目地址>
   cd gomoku-game
   \`\`\`

2. **安装依赖**
   \`\`\`bash
   npm install
   # 或者使用 yarn
   yarn install
   \`\`\`

3. **启动开发服务器**
   \`\`\`bash
   npm run dev
   # 或者使用 yarn
   yarn dev
   \`\`\`

4. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

\`\`\`bash
# 构建项目
npm run build

# 启动生产服务器
npm run start
\`\`\`

## 🎯 游戏规则

### 基本规则
- 使用15×15的棋盘
- 黑子先行，双方轮流下棋
- 率先在横、竖、斜任意方向连成五子者获胜
- **落子无悔**：棋子一旦放下不可撤销

### 操作方式
- 点击棋盘空位放置棋子
- 点击"重新开始"按钮开始新游戏
- 切换游戏模式会自动重置棋盘

## 🛠️ 技术栈

### 前端框架
- **Next.js 15** - React全栈框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的JavaScript

### UI组件
- **Tailwind CSS** - 原子化CSS框架
- **Radix UI** - 无障碍UI组件库
- **Lucide React** - 现代图标库
- **class-variance-authority** - 样式变体管理

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS处理工具
- **Autoprefixer** - CSS前缀自动添加

## 📁 项目结构

\`\`\`
gomoku-game/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx           # 主页面组件（游戏主体）
├── components/            # 可复用组件
│   └── ui/               # UI基础组件
│       ├── badge.tsx     # 徽章组件
│       ├── button.tsx    # 按钮组件
│       ├── card.tsx      # 卡片组件
│       └── dialog.tsx    # 对话框组件
├── hooks/                # 自定义React Hooks
│   ├── use-mobile.tsx    # 移动端检测
│   └── use-toast.ts      # 消息提示
├── lib/                  # 工具函数
│   └── utils.ts          # 通用工具函数
├── public/               # 静态资源
├── package.json          # 项目配置
├── tailwind.config.ts    # Tailwind配置
├── tsconfig.json         # TypeScript配置
└── README.md            # 项目说明
\`\`\`

## 🎮 游戏截图

### 人机对战模式
- 与智能AI对手对战
- AI会根据棋局形势做出最优决策

### 双人对战模式
- 支持两个玩家轮流下棋
- 适合朋友间的对战娱乐

### 获胜界面
- 精美的获胜弹窗提示
- 支持快速开始新游戏

## 🔧 自定义配置

### 修改棋盘大小
在 `app/page.tsx` 中修改 `BOARD_SIZE` 常量：
\`\`\`typescript
const BOARD_SIZE = 15 // 可修改为其他尺寸
\`\`\`

### 调整获胜条件
修改 `WINNING_LENGTH` 常量：
\`\`\`typescript
const WINNING_LENGTH = 5 // 可修改为其他连子数
\`\`\`

### 自定义样式
- 修改 `tailwind.config.ts` 调整主题色彩
- 编辑 `app/globals.css` 添加全局样式

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 开发流程
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### v1.0.0
- ✅ 基础五子棋游戏功能
- ✅ 人机对战和双人对战模式
- ✅ 智能AI对手
- ✅ 美观的用户界面
- ✅ 响应式设计
- ✅ 获胜弹窗提示

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢 Next.js 团队提供优秀的React框架
- 感谢 Tailwind CSS 提供强大的样式工具
- 感谢 Radix UI 提供无障碍的UI组件

---

**享受游戏，祝你好运！** 🎉
