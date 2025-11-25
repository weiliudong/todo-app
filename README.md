## 📋 全能待办清单（All-in-One Todo List）

一个基于 Vue 3 + Vite + Tailwind CSS 开发的轻量级、响应式待办事项管理应用，支持分类管理、优先级标记、筛选搜索、数据统计、暗黑模式等核心功能，数据本地持久化存储。

### ✨ 功能亮点

#### 核心功能

- ✅ 待办增删改查（支持编辑、删除、状态切换）
- 📂 分类管理（预设工作 / 生活 / 学习，支持自定义分类）
- ⚡ 优先级标记（高 / 中 / 低三级，视觉区分）
- 📅 截止日期设置（自动识别过期待办）
- 🔍 多维度筛选（关键词搜索、状态 / 分类 / 优先级 / 日期范围）
- 📊 数据统计（总待办 / 已完成 / 未完成 / 过期待办 + 分类分布可视化）
- 🗑️ 批量操作（批量标记完成、批量删除）
- 🌙 暗黑模式（自动适配系统主题 + 手动切换）
- 💾 本地存储持久化（刷新 / 重启页面数据不丢失）

#### 交互体验

- 🎨 响应式布局（适配 PC 端 / 移动端）
- ✨ 平滑动画（添加 / 删除 / 切换状态时的过渡效果）
- 📱 移动端优化（触控友好的表单和按钮）
- 🚫 空状态提示（无待办 / 无筛选结果时友好提示）
- ⚠️ 操作确认（批量删除时二次确认）

### 🛠️ 技术栈

| 技术           | 版本   | 说明               |
|--------------|------|------------------|
| Vue          | 3.x  | 前端框架（组合式 API）    |
| Vite         | 5.x+ | 构建工具（快速开发 + 打包）  |
| Tailwind CSS | 3.x  | 原子化 CSS 框架（样式开发） |
| date-fns     | 2.x  | 日期处理工具（格式化 / 比较） |

### 🚀 快速开始

#### 前提条件

- Node.js：v20.19.0 或 v22.12.0+（推荐使用 n/nvm 管理版本）
- npm：v10.0+

#### 安装步骤

##### 1. 克隆仓库

```bash
git clone https://github.com/weiliudong/todo-app.git
cd todo-app
```

##### 2. 安装依赖

```bash
npm install
```

##### 3. 启动开发服务器

```bash
npm run dev
```

##### 4. 访问应用

自动打开浏览器访问 http://127.0.0.1:5173，即可使用应用。

#### 打包部署

```bash

# 构建生产版本（输出到 dist 目录）

npm run build

# 本地预览打包结果

npm run preview
```

打包后的 dist 目录可直接部署到 Nginx、Netlify、Vercel 等平台（静态网站部署）。

### 📁 项目结构

```plaintext
todo-app/
├── src/
│ ├── components/ # 功能组件（按职责拆分）
│ │ ├── TodoAdd.vue # 添加待办（表单 + 自定义分类）
│ │ ├── TodoFilter.vue # 筛选搜索（多维度筛选 + 批量操作）
│ │ ├── TodoItem.vue # 待办项（查看/编辑模式切换）
│ │ ├── TodoList.vue # 待办列表（空状态 + 滚动优化）
│ │ ├── TodoStats.vue # 数据统计（基础指标 + 分类分布）
│ │ └── ThemeToggle.vue # 暗黑模式切换（系统适配 + 本地存储）
│ ├── composables/ # 组合式函数（核心逻辑复用）
│ │ └── useTodo.js # 待办数据管理（CRUD + 筛选 + 持久化）
│ ├── styles/ # 样式文件
│ │ └── main.css # 全局样式 + 动画 + Tailwind 引入
│ ├── App.vue # 根组件（组件组合 + 事件分发）
│ ├── main.js # 入口文件（Vue 实例创建 + 挂载）
│ └── index.html # HTML 入口（挂载点 + 基础结构）
├── tailwind.config.js # Tailwind 配置（暗黑模式 + 内容扫描）
├── vite.config.js # Vite 配置（插件 + 开发服务器）
├── package.json # 依赖配置 + 脚本命令
└── README.md # 项目说明（当前文件）
```

### 🎯 使用指南

#### 1. 添加待办

- 在「添加新待办」区域输入待办内容（必填）
- 选择分类（支持自定义分类：点击「+」输入名称并添加）
- 设置优先级和截止日期（可选）
- 点击「添加待办」或按回车键提交

#### 2. 筛选与搜索

- 关键词搜索：输入待办内容关键词快速匹配
- 状态筛选：切换「全部 / 已完成 / 未完成」
- 分类 / 优先级筛选：精准筛选指定类型的待办
- 日期范围筛选：按截止日期区间筛选
- 点击「重置筛选」恢复默认筛选条件

#### 3. 待办操作

- 状态切换：勾选复选框标记为已完成 / 未完成
- 编辑待办：点击「编辑」修改内容，按回车键或点击「确认」保存
- 删除待办：点击「删除」单个删除
- 批量操作：筛选后点击「批量标记完成」或「批量删除」

#### 4. 数据统计

- 基础指标：总待办、已完成、未完成、过期待办数量
- 分类分布：可视化展示各分类待办占比

#### 5. 暗黑模式

- 点击页面右上角的「太阳 / 月亮」图标切换主题
- 自动适配系统主题（首次打开时）
- 主题偏好持久化存储（刷新后保留设置）

### 🔧 配置说明

#### Tailwind 配置（tailwind.config.js）

```js
export default {
    darkMode: 'class', // 基于 class 切换暗黑模式
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}", // 扫描所有 Vue/JS/TS 文件中的 Tailwind 工具类
    ],
    theme: {
        extend: {}, // 可扩展自定义颜色、字体等
    },
    plugins: [],
}
```

#### Vite 配置（vite.config.js）

```js
export default defineConfig({
    plugins: [vue()], // 启用 Vue 插件
    server: {
        port: 5173, // 开发服务器端口
        open: true, // 启动后自动打开浏览器
    },
})
```

### 🚀 扩展方向

1. **后端集成**：接入接口替换本地存储，支持多设备同步
2. **标签功能**：添加多标签管理，支持标签筛选
3. **数据导出 / 导入**：支持 JSON/CSV 格式导出待办数据
4. **提醒功能**：截止日期前推送浏览器通知
5. **拖拽排序**：支持拖拽调整待办顺序
6. **待办置顶**：重要待办置顶显示
7. **图表增强**：集成 ECharts/Chart.js 实现更丰富的统计图表

### 🐛 常见问题

#### 1. 启动项目时提示 Node 版本不兼容？

- 确保 Node.js 版本为 v20.19.0 或 v22.12.0+
- 使用 n/nvm 管理版本：
  ```bash
  # 用 n 安装指定版本
  
  n 22.12.0
  
  # 切换版本
  
  n use 22.12.0
  ```

#### 2. Tailwind 样式不生效？

- 检查 `tailwind.config.js` 中的 `content` 配置是否包含所有文件
- 确保 `src/styles/main.css` 中引入了 `Tailwind` 基础样式：
  ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  ```
- 重启开发服务器（npm run dev）

#### 3. 本地存储数据丢失？

- 数据存储在浏览器 localStorage 中，清除浏览器缓存会导致数据丢失
- 如需备份数据，可通过浏览器开发者工具（Application → Local Storage）导出 todos_v2 字段

### 📄 许可证

本项目基于 MIT 许可证开源，详见 [LICENSE](https://github.com/weiliudong/todo-app/LICENSE) 文件。

---

### 🌟 致谢

- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vite.dev/) - 快速构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [date-fns](https://date-fns.org/) - 现代 JavaScript 日期工具库

如果觉得这个项目有用，欢迎给个 Star ⭐ 支持一下！
