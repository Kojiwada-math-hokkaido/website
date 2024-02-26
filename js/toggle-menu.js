// window.addEventListener('load', function () {
//   var $button = document.querySelector('.toggle-menu-button');
//   var $menu = document.querySelector('.header-site-menu');
//   $button.addEventListener('click', function () {
//     if ($menu.classList.contains('is-show')) {
//       $menu.classList.remove('is-show');
//     }
//     else {
//       $menu.classList.add('is-show');
//     }
//   });
// });

window.addEventListener('load', function () {
  var $button = document.querySelector('.toggle-menu-button');
  var $menu = document.querySelector('.header-site-menu');
  // ボタンを無効に設定
  $button.setAttribute('disabled', 'disabled');
  // ボタンをクリック可能にする関数
  function enableButton() {
    $button.removeAttribute('disabled');
  }
  // ページの読み込みが完了したらボタンを有効にする
  enableButton();

  $button.addEventListener('click', function () {
    if ($menu.classList.contains('is-show')) {
      $menu.classList.remove('is-show');
    }
    else {
      $menu.classList.add('is-show');
    }
  });
});

