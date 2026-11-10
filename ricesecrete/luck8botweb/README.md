# Luck8 Bot 游戏平台

基于 Vue 3 + TypeScript + Vite + Element Plus 构建的游戏平台前端项目。

## 技术栈

- **框架**: Vue 3.5 + TypeScript
- **构建工具**: Vite 6
- **UI 框架**: Element Plus 2.9
- **路由**: Vue Router 4.5
- **状态管理**: Pinia 2.3
- **图表**: ECharts 5.5 + vue-echarts
- **HTTP 客户端**: Axios
- **实时通信**: Socket.io-client
- **日期处理**: dayjs

## 项目结构

```
fangGame/
├── src/
│   ├── components/       # 公共组件
│   │   ├── Header.vue   # 顶部导航栏
│   │   └── GameCard.vue # 游戏卡片
│   ├── views/           # 页面视图
│   │   ├── Home.vue     # 首页
│   │   └── GameDetail.vue # 游戏详情页
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态管理
│   ├── types/           # TypeScript 类型定义
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── index.html
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json

```

## 功能特性

### 已实现
- ✅ 响应式顶部导航栏
- ✅ 首页游戏卡片展示
- ✅ 游戏详情页面
- ✅ 左侧游戏分类菜单
- ✅ 历史开奖记录表格
- ✅ 数字走势统计图表
- ✅ 实时倒计时功能
- ✅ 路由配置（支持 5 种游戏类型）

### 待实现
- ⏳ ECharts 图表集成（冷热号统计）
- ⏳ WebSocket 实时数据推送
- ⏳ 用户登录/注册功能
- ⏳ 下注功能实现
- ⏳ 更多游戏玩法页面
- ⏳ 移动端适配优化

## 开发命令

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`
项目将在 http://localhost:3000 启动

### 构建生产版本
\`\`\`bash
npm run build
\`\`\`

### 预览生产构建
\`\`\`bash
npm run preview
\`\`\`

## 页面路由

- `/` - 首页
- `/luckywin` - Luckywin 游戏详情
- `/mien-bac` - Miền Bắc 游戏详情
- `/mien-nam` - Miền Nam 游戏详情
- `/keno` - Keno 游戏详情
- `/sicbo` - Sicbo 游戏详情

## 组件说明

### Header.vue
顶部导航栏组件，包含：
- Logo 展示
- 主导航菜单
- 登录按钮

### GameCard.vue
游戏卡片组件，显示：
- 游戏图标和名称
- 当前期号
- 奖金信息
- 倒计时
- 快捷操作按钮

### GameDetail.vue
游戏详情页，包含：
- 左侧游戏分类菜单
- 游戏信息展示
- 开奖号码显示
- 历史记录表格
- 数字走势图表

## 开发注意事项

1. **自动导入**: 项目使用 `unplugin-auto-import` 和 `unplugin-vue-components`，Vue API 和 Element Plus 组件会自动导入
2. **路径别名**: 使用 `@` 作为 `src` 目录的别名
3. **类型安全**: 项目全面使用 TypeScript，确保类型安全
4. **响应式设计**: 使用 CSS Grid 和 Flexbox 实现响应式布局

## 下一步开发建议

1. 集成 ECharts 完善统计图表功能
2. 实现 WebSocket 连接，获取实时开奖数据
3. 开发用户认证系统
4. 实现下注功能和玩法规则
5. 添加更多交互动画效果
6. 优化移动端体验

## License

MIT
