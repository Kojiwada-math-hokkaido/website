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

function scrollToArticle(index) {
	const container = document.getElementById('articlesContainer');
	const cards = container.querySelectorAll('.article-card');
	if (cards[index]) {
			cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
			currentArticleIndex = index;
	}
}

function scrollArticle(direction) {
	const container = document.getElementById('articlesContainer');
	const cards = container.querySelectorAll('.article-card');
	currentArticleIndex = Math.max(0, Math.min(currentArticleIndex + direction, cards.length - 1));
	scrollToArticle(currentArticleIndex);
}

function updateArticleDots() {
	const container = document.getElementById('articlesContainer');
	const cards = container.querySelectorAll('.article-card');
	const dots = document.querySelectorAll('.articles-dot');

	// 現在表示されているカードを判定
	const containerRect = container.getBoundingClientRect();
	let closestIndex = 0;
	let closestDistance = Infinity;

	cards.forEach((card, index) => {
			const cardRect = card.getBoundingClientRect();
			const distance = Math.abs(cardRect.left - containerRect.left);
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
