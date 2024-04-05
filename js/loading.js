document.addEventListener("DOMContentLoaded", function() {
  // 2 秒後に Loading... を非表示にしてコンテンツを表示する
  setTimeout(function() {
      document.getElementById("loading").style.display = "none"; // Loading... を非表示に
      document.getElementById("content").style.display = "block"; // コンテンツを表示
  }, 1500); // 2 秒待つ
});
