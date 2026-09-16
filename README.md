# UniSearch Website

这是 **UniSearch**（现代化跨平台 AI 自主内容调研与数据采集工作台）的官方静态展示与下载网站。

👉 **UniSearch 核心项目主仓库**：[https://github.com/ucmao/unisearch](https://github.com/ucmao/unisearch)  
*欢迎前往主仓库点亮 **Star ⭐**、提交 Issue 反馈或参与社区共建！*

---

## ✨ 核心特性

- **设计美学与实机展示**：
  - **原生比例实机自动轮播**：原生 1600×1140 尺寸平滑自动轮播实机截图（采集大盘、研报正文、知识图谱、透视表等），支持鼠标悬停暂停与全屏 Lightbox 高清无损放大。
  - **32+ 生态信源 Logo 跑马灯**：无缝滚动的平台 Logo Wall，直观展现全网信源覆盖。
  - **双主题支持**：温暖浅色工坊模式（Warm Ivory Craft）与黑曜石深色模式（Obsidian Dark）。
- **图文一体 Bento Grid**：将 AI 自主规划、纯本地 ONNX 向量引擎、实体拓扑图谱、桌面伴侣、@ 场景技能与多维数据透视六大系统与真实产品切片深度结合。
- **32 平台独立连接器与 13 大内置技能矩阵**：
  - **32 平台独立连接器**：覆盖社交自媒体 (7)、AI 网页问答 (7)、全网搜索引擎 (7)、科技与商业资讯 (4)、垂直招聘与维权 (5)、实用解析工具 (2)。
  - **13 大内置技能**：涵盖新媒体内容调研、品牌 GEO 监测、招聘薪酬调研等场景化预设技能。
  - **交互体验**：默认精选高频平台，支持展开/收起完整矩阵及实时关键词组合过滤。
- **纯粹聚焦的 GitHub Releases 下载专区**：
  - **智能系统识别**：自动检测 macOS / Windows 访客环境并高亮推荐安装包。
  - **macOS**：Apple Silicon (M系列) 与 Intel 架构 `.dmg` 安装包及权限修复指引。
  - **Windows**：64 位安装包 `.exe` 与免安装绿色版 `.zip`。
  - **单一可信发版源**：全面收敛至 GitHub Releases 官方通道，助力开源 Star 与下载增长。
- **集中化全局配置**：通过 `config.js` 统一管理 GitHub 仓库链接、发版地址及开发者一键克隆启动指令。

---

## 🚀 本地预览

本项目采用原生轻量纯静态架构（零复杂构建步骤，开箱即用）：

```bash
# 方式 1: 使用 npx serve
npx serve .

# 方式 2: 使用 Python HTTP Server
python3 -m http.server 8080
```

浏览器打开 `http://localhost:8080` 即可预览。

---

## 📦 部署与托管

支持一键自动化托管至：
- **GitHub Pages**
- **Cloudflare Pages**
- **Vercel**

---

## 📄 开源协议

本项目遵循 [MIT License](LICENSE) 协议开源。

