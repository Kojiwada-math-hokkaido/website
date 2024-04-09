$(function () {
  // ローダー終了
  function end_loader() {
    $('.loader').fadeOut(800);
    document.getElementById("content").style.display = "block"; // コンテンツを表示
  }
  // テキスト表示
  function show_txt() {
    $('.loader .txt').fadeIn(400);
  }
  // テキスト非表示
  function hide_txt() {
    $('.loader .txt').fadeOut(400);
  }

  // タイマー処理
  $(window).on('load', function () {
    // 処理①
    setTimeout(function () {
      show_txt();
    }, 500)
    // 処理②
    setTimeout(function () {
      hide_txt();
    }, 3500)
    // 処理③
    setTimeout(function () {
      end_loader();
    }, 3900)
  })
})
