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
					"title": "深層学習における最適化手法の比較",
					"summary": "Adam、SGD、RMSpropなど主要な最適化手法を実験的に比較。",
					"image": "https://via.placeholder.com/400x250/667eea/ffffff?text=Deep+Learning",
					"date": "2024.12.15",
					"category": "研究ノート",
					"url": "https://example.com/article1"
			}
	];
}

function renderArticles() {
	const container = document.getElementById('articlesContainer');
	container.innerHTML = '';

	articlesData.forEach(article => {
			const card = document.createElement('a');
			card.className = 'article-card';
			card.href = article.url;
			card.target = '_blank';
			card.rel = 'noopener noreferrer';

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
	});

	// MathJaxで数式を再レンダリング
	if (window.MathJax) {
			MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error:', err));
	}
}
