// let icon = document.querySelector('.icon-wrapper')
// icon.addEventListener('click',()=>{
//     icon.classList.toggle('show-animate');
// })

window.addEventListener('load', function () {
    let icon = document.querySelector('.icon-wrapper');
    // ボタンを無効に設定
    icon.setAttribute('disabled', 'disabled');
    // ページの読み込みが完了したらボタンを有効にする
    icon.removeAttribute('disabled');
    // クリックイベントリスナーを登録
    icon.addEventListener('click', () => {
        icon.classList.toggle('show-animate');
    });
});
