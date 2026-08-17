/**
 * UniSearch 官网交互逻辑 (video-shotcraft 视觉体系对齐)
 * 包含：浅色/深色主题切换、信源实时检索与分类过滤、系统智能识别、FAQ折叠、一键复制代码、Star获取等
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initOSDetection();
  initDownloadDropdown();
  initConnectorFilters();
  initFAQAccordion();
  initCodeCopy();
  initMobileMenu();
  fetchGitHubStars();
});

/**
 * 0. 浅色 / 深色主题切换 (Light Mode Default)
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const htmlRoot = document.documentElement;

  // 优先读取本地存储，默认浅色模式 (light)
  const savedTheme = localStorage.getItem('unisearch_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('unisearch_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeToggleIcon) {
      themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggleBtn?.setAttribute('title', theme === 'dark' ? '切换为浅色模式' : '切换为深色模式');
    }
  }
}

/**
 * 1. 智能检测用户操作系统并适配 Hero 下载按钮
 */
function initOSDetection() {
  const downloadText = document.getElementById('heroDownloadText');
  const downloadSubText = document.getElementById('heroDownloadSubText');
  const osIcon = document.getElementById('heroOsIcon');
  const primaryBtn = document.getElementById('heroPrimaryDownloadBtn');

  if (!downloadText || !osIcon || !primaryBtn) return;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isWindows = /windows|win32|win64/i.test(userAgent);

  if (isWindows) {
    downloadText.textContent = '下载 Windows 版';
    downloadSubText.textContent = '适用于 Win 10 / 11 (64位)';
    primaryBtn.setAttribute('href', '#download-win');
    // Windows Icon SVG
    osIcon.innerHTML = `
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    `;
  } else {
    // 默认为 Mac
    downloadText.textContent = '下载 macOS 版';
    downloadSubText.textContent = '适用于 Apple Silicon / Intel';
    primaryBtn.setAttribute('href', '#download-mac');
    // Mac Apple Icon SVG
    osIcon.innerHTML = `
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.67-2.81 1.45-.59.68-1.11 1.77-.97 2.83 1.12.09 2.19-.55 2.82-1.33z"/>
    `;
  }
}

/**
 * 2. Hero 区域下载下拉菜单交互
 */
function initDownloadDropdown() {
  const toggleBtn = document.getElementById('heroDropdownToggle');
  const menu = document.getElementById('heroDropdownMenu');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  // 点击空白处关闭下拉菜单
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.remove('active');
    }
  });

  // 点击菜单项后关闭
  menu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

/**
 * 3. 信源平台分类 Tab + 实时搜索组合过滤 (对标 library.html 交互)
 */
function initConnectorFilters() {
  const tabs = document.querySelectorAll('.conn-tab');
  const cards = document.querySelectorAll('.conn-card');
  const searchInput = document.getElementById('connectorSearchInput');
  const clearBtn = document.getElementById('connectorSearchClear');
  const noResults = document.getElementById('noResultsMessage');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-cat') || '';
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCat = (currentCategory === 'all' || cardCat === currentCategory);
      const matchesSearch = !searchQuery || 
        title.includes(searchQuery) || 
        desc.includes(searchQuery) || 
        keywords.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.add('visible');
      } else {
        noResults.classList.remove('visible');
      }
    }
  }

  // Tab 点击事件
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  // 搜索输入过滤
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.classList.toggle('visible', searchQuery.length > 0);
      }
      applyFilters();
    });
  }

  // 清空搜索
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.classList.remove('visible');
      searchInput.focus();
      applyFilters();
    });
  }
}

/**
 * 4. FAQ 手风琴展开与收起
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // 关闭其他展开项
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      // 切换当前项
      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * 5. 一键复制代码并弹出 Toast
 */
function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy-code');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('✓ 已成功复制到剪贴板');
        const origText = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => {
          btn.textContent = origText;
        }, 2000);
      } catch (err) {
        // 兼容降级
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ 已成功复制到剪贴板');
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2400);
  }
}

/**
 * 6. 移动端汉堡菜单切换
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('mobile-active');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-active');
    });
  });
}

/**
 * 7. 动态拉取 GitHub Star 数 (优雅降级)
 */
async function fetchGitHubStars() {
  const starBadge = document.getElementById('headerStarBadge');
  if (!starBadge) return;

  try {
    const response = await fetch('https://api.github.com/repos/ucmao/unisearch', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.stargazers_count !== undefined) {
        starBadge.textContent = `⭐ ${data.stargazers_count}`;
      }
    }
  } catch (e) {
    // 静态降级，保持默认展示
    starBadge.textContent = '⭐ Star';
  }
}
