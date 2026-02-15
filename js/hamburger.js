// ハンバーガーメニュー制御
function toggleMenu() {
	const hamburger = document.getElementById('hamburger');
	const navMenu = document.getElementById('navMenu');
	const overlay = document.getElementById('menuOverlay');

	hamburger.classList.toggle('active');
	navMenu.classList.toggle('active');
	overlay.classList.toggle('active');
}

function closeMenu() {
	const hamburger = document.getElementById('hamburger');
	const navMenu = document.getElementById('navMenu');
	const overlay = document.getElementById('menuOverlay');

	hamburger.classList.remove('active');
	navMenu.classList.remove('active');
	overlay.classList.remove('active');
}

// ナビゲーションタイトルの表示/非表示制御
const navTitle = document.getElementById('navTitle');
const heroTitle = document.querySelector('.hero h1');

window.addEventListener('scroll', () => {
	if (window.innerWidth <= 768) {  // モバイルのみ
		const heroRect = heroTitle.getBoundingClientRect();
		const navHeight = 60;  // ナビゲーションバーの高さ

		// h1が画面外（上に隠れた）場合にタイトルを表示
		if (heroRect.bottom < navHeight) {
			navTitle.classList.add('visible');
		} else {
			navTitle.classList.remove('visible');
		}
} else {
		// デスクトップでは常に非表示
		navTitle.classList.remove('visible');
	}
});

// リサイズ時にもチェック
window.addEventListener('resize', () => {
	if (window.innerWidth > 768) {
		navTitle.classList.remove('visible');
	}
});
