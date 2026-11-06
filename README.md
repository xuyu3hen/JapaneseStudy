# 🎌 日语学习小程序

一个从零开始学日语的微信小程序，基于 Taro 4.x 跨端框架开发。

## ✨ 功能特性

### 🎌 五十音图
- 完整的 46 个清音 + 20 个浊音 + 5 个半浊音
- 平假名 / 片假名 / 对比三种显示模式
- 点击即可播放 TTS 发音
- 内置练习模式（看假名选罗马音 / 看罗马音选假名）

### 📖 单词学习
- N5 / N4 / N3 分级词库
- 三轮渐进式学习机制
- 假名 + 汉字 + 罗马音 + 例句完整展示
- 智能 TTS 发音

### 🔄 艾宾浩斯复习
- 基于遗忘曲线的间隔复习调度
- 1 → 2 → 4 → 7 → 15 → 30 天递增间隔
- 忘记自动重学，标记已掌握

### 📊 学习统计
- 打卡日历，记录每一天的坚持
- 连续学习天数追踪
- 总体进度可视化

## 🛠️ 技术栈

- **框架**: Taro 4.x + React 18 + TypeScript
- **状态管理**: Zustand
- **样式**: SCSS
- **存储**: Taro Storage（本地持久化）
- **发音**: Google TTS API

## 📂 项目结构

```
src/
├── app.config.ts          # 全局配置
├── app.tsx                # 入口组件
├── app.scss               # 全局样式
├── assets/                # 静态资源
│   └── tabbar/            # TabBar 图标
├── components/            # 公共组件
│   ├── BookCard/          # 词书卡片
│   ├── ProgressRing/      # 进度环
│   └── WordCard/          # 单词卡片
├── data/                  # Mock 数据
│   ├── books.ts           # 词书数据
│   ├── gojuon.ts          # 五十音图数据
│   └── words.ts           # 单词数据
├── pages/                 # 页面
│   ├── learn/             # 学习首页（TabBar）
│   ├── gojuon/            # 五十音图学习
│   ├── books/             # 词书列表（TabBar）
│   ├── stats/             # 学习统计（TabBar）
│   ├── mine/              # 我的设置（TabBar）
│   ├── study/             # 单词学习页
│   └── review/            # 复习页
├── store/                 # 状态管理
│   └── useStudyStore.ts
├── styles/                # 全局样式
│   ├── theme.scss         # 主题配色
│   └── variables.scss     # SCSS 变量
├── types/                 # TypeScript 类型
└── utils/                 # 工具函数
    ├── scheduler.ts       # 复习调度算法
    ├── storage.ts         # 本地存储
    └── tts.ts             # TTS 发音
```

## 🚀 快速开始

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 本地开发（H5）

```bash
npm run dev:h5
```

浏览器访问 http://localhost:10086

### 构建微信小程序

```bash
npm run build:weapp
```

然后用微信开发者工具打开 `dist` 目录即可运行。

### 其他平台

```bash
npm run dev:weapp      # 微信小程序开发
npm run build:weapp    # 微信小程序构建
npm run dev:tt         # 抖音小程序开发
npm run build:tt       # 抖音小程序构建
npm run dev:alipay     # 支付宝小程序开发
npm run build:alipay   # 支付宝小程序构建
```

## 📱 小程序上线

1. 访问 [微信公众平台](https://mp.weixin.qq.com/) 注册小程序
2. 获取 AppID
3. 修改 `project.config.json` 中的 appid 字段
4. 执行 `npm run build:weapp` 构建
5. 用微信开发者工具导入 `dist` 目录
6. 点击「上传」→ 在公众平台提交审核 → 发布

## 📚 学习路径

```
五十音图（背熟每个假名）
    ↓
假名练习（反复测试，直到全部正确）
    ↓
N5 基础单词
    ↓
N4 进阶单词
    ↓
N3 高级单词
    ↓
坚持每日复习，形成长期记忆
```

## 📄 License

MIT License

---

🌸 がんばって！加油学日语！
