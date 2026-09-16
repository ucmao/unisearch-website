/**
 * UniSearch 官网全局配置文件
 * 用于集中管理 GitHub 仓库地址、镜像下载链接及快速启动指令，避免 HTML 硬编码
 */
window.SITE_CONFIG = {
  // GitHub 仓库配置
  githubRepo: 'https://github.com/ucmao/unisearch',
  githubReleases: 'https://github.com/ucmao/unisearch/releases',

  // 开发者源码一键启动指令
  cloneCommand: 'git clone https://github.com/ucmao/unisearch.git && cd unisearch && npm install && npm --prefix webui install && npm run webui:build && npm run electron:dev'
};
