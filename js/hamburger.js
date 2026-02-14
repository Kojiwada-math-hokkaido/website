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
