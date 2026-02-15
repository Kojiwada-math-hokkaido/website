// Articles データを読み込む
loadArticlesData();
let articlesData = [];

async function loadArticlesData() {
	try {
			const response = await fetch('articles-data.json');
			articlesData = await response.json();
			renderArticles();
	} catch (error) {
			console.error('Articlesデータの読み込みに失敗しました:', error);
			articlesData = getDefaultArticlesData();
			renderArticles();
	}
}

function getDefaultArticlesData() {
	return [
		{
			"title": "数学参考書まとめ",
			"summary": "数学の参考書などを各分野ごとにまとめました．",
			"image": "./images/articles.jpg",
			"date": "2026.2.16",
			"category": "チュートリアル",
			"url": "https://example.com/article1"
		}
	];
}

function renderArticles() {
	const container = document.getElementById('articlesContainer');
	const dotsContainer = document.getElementById('articlesDots');
	container.innerHTML = '';
	dotsContainer.innerHTML = '';

	articlesData.forEach((article, index) => {
			const card = document.createElement('a');
			card.className = 'article-card';
			card.href = article.url;
			card.target = '_blank';
			card.rel = 'noopener noreferrer';
			card.dataset.index = index;

			card.innerHTML = `
					<img src="${article.image}" alt="${article.title}" class="article-card-image" loading="lazy">
					<div class="article-card-content">
							<div class="article-card-category">${article.category}</div>
							<h3 class="article-card-title">${article.title}</h3>
							<p class="article-card-summary">${article.summary}</p>
							<div class="article-card-date">${article.date}</div>
					</div>
			`;

			container.appendChild(card);

			// ドットインジケーターを作成
			const dot = document.createElement('div');
			dot.className = 'articles-dot';
			if (index === 0) dot.classList.add('active');
			dot.dataset.index = index;
			dot.onclick = () => scrollToArticle(index);
			dotsContainer.appendChild(dot);
	});

	// スクロールイベントでドットを更新
	container.addEventListener('scroll', updateArticleDots);

	// ナビゲーションボタンのイベント
	document.getElementById('articlesPrev').onclick = () => scrollArticle(-1);
	document.getElementById('articlesNext').onclick = () => scrollArticle(1);

	// MathJaxで数式を再レンダリング
	if (window.MathJax) {
			MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error:', err));
	}
}

let currentArticleIndex = 0;
let isManualScroll = false; // ボタン/ドット操作かどうかのフラグ

function scrollToArticle(index) {
	const container = document.getElementById('articlesContainer');
	const cards = container.querySelectorAll('.article-card');
	if (cards[index]) {
			isManualScroll = true;
			cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
			currentArticleIndex = index;
			updateArticleDotsManual(index);

			// スクロール完了後にフラグをリセット
			setTimeout(() => {
					isManualScroll = false;
			}, 600);
	}
}

function scrollArticle(direction) {
	const totalArticles = articlesData.length;

	// 無限ループ処理
	currentArticleIndex += direction;

	if (currentArticleIndex < 0) {
			// 最初から最後へ
			currentArticleIndex = totalArticles - 1;
	} else if (currentArticleIndex >= totalArticles) {
			// 最後から最初へ
			currentArticleIndex = 0;
	}

	scrollToArticle(currentArticleIndex);
}

function updateArticleDotsManual(index) {
	const dots = document.querySelectorAll('.articles-dot');
	dots.forEach((dot, i) => {
			if (i === index) {
					dot.classList.add('active');
			} else {
					dot.classList.remove('active');
			}
	});
}

function updateArticleDots() {
	// 手動スクロール中は自動更新をスキップ
	if (isManualScroll) return;

	const container = document.getElementById('articlesContainer');
	const cards = container.querySelectorAll('.article-card');
	const dots = document.querySelectorAll('.articles-dot');

	// 現在表示されているカードを判定（中央に最も近いカード）
	const containerRect = container.getBoundingClientRect();
	const containerCenter = containerRect.left + containerRect.width / 2;
	let closestIndex = 0;
	let closestDistance = Infinity;

	cards.forEach((card, index) => {
			const cardRect = card.getBoundingClientRect();
			const cardCenter = cardRect.left + cardRect.width / 2;
			const distance = Math.abs(cardCenter - containerCenter);
			if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
			}
	});

	// ドットの更新
	dots.forEach((dot, index) => {
			if (index === closestIndex) {
					dot.classList.add('active');
			} else {
					dot.classList.remove('active');
			}
	});

	currentArticleIndex = closestIndex;
}

// タッチ/スワイプでのループ処理
let articleTouchStartX = 0;
let articleScrollLeft = 0;

function initArticleSwipe() {
	const container = document.getElementById('articlesContainer');

	container.addEventListener('touchstart', (e) => {
			articleTouchStartX = e.touches[0].clientX;
			articleScrollLeft = container.scrollLeft;
	});

	container.addEventListener('touchend', (e) => {
			const touchEndX = e.changedTouches[0].clientX;
			const diff = articleTouchStartX - touchEndX;

			// スワイプ距離が50px以上の場合のみ判定
			if (Math.abs(diff) > 50) {
					if (diff > 0) {
							// 左にスワイプ（次へ）
							scrollArticle(1);
					} else {
							// 右にスワイプ（前へ）
							scrollArticle(-1);
					}
			}
	});

	// スクロール終了時にインデックスを更新
	let scrollTimeout;
	container.addEventListener('scroll', () => {
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
					updateArticleDots();
			}, 150);
	});
}

// Articles読み込み後にスワイプ初期化
async function loadArticlesData() {
	try {
			const response = await fetch('articles-data.json');
			articlesData = await response.json();
			renderArticles();
			initArticleSwipe();
	} catch (error) {
			console.error('Articlesデータの読み込みに失敗しました:', error);
			articlesData = getDefaultArticlesData();
			renderArticles();
			initArticleSwipe();
	}
}
