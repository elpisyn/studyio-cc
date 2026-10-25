/* {{EXAM_LABEL}} 学習サイト - 共通JS: 訪問済みタイルの進捗管理のみ(ナビのactiveは各ページのHTMLで固定済み) */
(function () {
  const STORAGE_KEY = "{{STORAGE_KEY_PREFIX}}-progress-v1"; // 例: "azure-ai-901-progress-v1"(資格ごとに変える。サイトを配布フォルダ名で判定しない)

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
  }

  // 各ページの <body data-page="concepts/xxx.html"> にルート相対パスを書いておく方式。
  // 配布フォルダ名(location.pathnameの一部)を正規表現で推測しないので、
  // フォルダをリネーム・移動しても壊れない。index.html は data-page 不要(省略可)。
  function currentPath() {
    return document.body.dataset.page || "";
  }

  function markVisited() {
    const path = currentPath();
    if (!path || path === "index.html") return;
    const progress = loadProgress();
    if (!progress.visited) progress.visited = {};
    progress.visited[path] = Date.now();
    saveProgress(progress);
  }

  function applyVisitedTiles() {
    const progress = loadProgress();
    const visited = progress.visited || {};
    document.querySelectorAll("a.tile[data-href]").forEach((tile) => {
      const href = tile.getAttribute("data-href");
      if (visited[href]) tile.classList.add("visited");
    });
    const total = document.querySelectorAll("a.tile[data-href]").length;
    const done = document.querySelectorAll("a.tile[data-href].visited").length;
    const bar = document.querySelector(".progress-bar-fill");
    const label = document.querySelector(".progress-label");
    if (bar && total > 0) {
      const pct = Math.round((done / total) * 100);
      bar.style.width = pct + "%";
      if (label) label.textContent = `${done} / ${total} 学習済み (${pct}%)`;
    }
  }

  function attachResetButton() {
    const btn = document.getElementById("reset-progress");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (confirm("すべての学習進捗をリセットしますか？")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    markVisited();
    applyVisitedTiles();
    attachResetButton();
  });
})();
