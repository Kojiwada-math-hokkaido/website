// ローディング画面
window.addEventListener('load', function() {
		setTimeout(function() {
				document.getElementById('loading').classList.add('hidden');
		}, 1500);
});

// ローディングドットアニメーション
const loadingDots = document.querySelector('.loading-dots');
let dotCount = 0;
setInterval(() => {
		dotCount = (dotCount + 1) % 4;
		loadingDots.textContent = '.'.repeat(dotCount);
}, 400);

// モーダル操作
function openModal(modalId) {
		document.getElementById(modalId).classList.add('active');
		document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
		document.getElementById(modalId).classList.remove('active');
		document.body.style.overflow = 'auto';
}

// 年度切り替え機能
let currentYear = 2025;
let scheduleData = {};

// スケジュールデータを読み込む
async function loadScheduleData() {
		try {
				const response = await fetch('schedule-data.json');
				scheduleData = await response.json();
				initializeSchedule();
		} catch (error) {
				console.error('スケジュールデータの読み込みに失敗しました:', error);
				// フォールバック: デフォルトデータを使用
				scheduleData = getDefaultScheduleData();
				initializeSchedule();
		}
}

// デフォルトのスケジュールデータ（JSONが読み込めない場合）
function getDefaultScheduleData() {
		return {
			"2026": [
				{
					"month": "3月",
					"day": "3",
					"title": "第22回数学総合若手研究集会～数学の交叉点～",
					"location": "📍 北海道大学",
					"status": "upcoming",
					"presentationType": "oral"
				}
			]
		};
}

// スケジュールを初期化
function initializeSchedule() {
		const years = Object.keys(scheduleData).sort((a, b) => b - a);
		currentYear = years[0];

		// 年度タブを生成
		const yearTabsContainer = document.getElementById('yearTabs');
		yearTabsContainer.innerHTML = '';
		years.forEach((year, index) => {
				const button = document.createElement('button');
				button.className = 'year-tab' + (index === 0 ? ' active' : '');
				button.textContent = year;
				button.onclick = () => switchYear(year);
				yearTabsContainer.appendChild(button);
		});

		// 最初の年度のスケジュールを表示
		renderSchedule(currentYear);
}

// スケジュールを描画
function renderSchedule(year) {
		const container = document.getElementById('scheduleContainer');
		const events = scheduleData[year] || [];

		container.innerHTML = '';
		const scheduleContent = document.createElement('div');
		scheduleContent.className = 'schedule-content';

		events.forEach(event => {
				const item = document.createElement('div');
				item.className = `schedule-item ${event.status}`;


				// URLがある場合はクリック可能にする
				if (event.url && event.url !== '') {
						item.classList.add('clickable');
						item.style.cursor = 'pointer';
						item.onclick = () => {
								window.open(event.url, '_blank');
						};
				}

				// プレゼンテーション形式のラベルを取得
				const presentationLabel = getPresentationLabel(event.presentationType);
				const presentationBadge = event.presentationType && event.presentationType !== ''
						? `<span class="presentation-badge ${event.presentationType}-badge">${presentationLabel}</span>`
						: '';

				item.innerHTML = `
						<div class="schedule-date">
								<div class="month">${event.month}</div>
								<div class="day">${event.day}</div>
						</div>
						<div class="schedule-details">
								<h3>${event.title}</h3>
								<p class="location">${event.location}</p>
						</div>
						<div class="schedule-badges">
								${presentationBadge}
								<span class="status-badge ${event.status}-badge">
										${event.status === 'upcoming' ? '参加予定' : '参加済み'}
								</span>
						</div>
				`;

				scheduleContent.appendChild(item);
		});

		container.appendChild(scheduleContent);

	// MathJaxで数式を再レンダリング
	if (window.MathJax) {
			MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error:', err));
	}
	}

// プレゼンテーション形式のラベルを取得
function getPresentationLabel(type) {
		const labels = {
				'oral': '口頭発表',
				'poster': 'ポスター',
				'attendance': '参加',
				'': ''
		};
		return labels[type] || '参加';
}

function switchYear(year) {
		currentYear = year;

		// すべてのタブを非アクティブに
		document.querySelectorAll('.year-tab').forEach(tab => {
				tab.classList.remove('active');
		});

		// 選択された年度をアクティブに
		event.target.classList.add('active');

		// スケジュールを再描画
		renderSchedule(year);
}

// ページ読み込み時にスケジュールデータを読み込む
loadScheduleData();
loadLinksData();

// リンクデータを読み込む
let linksData = [];

async function loadLinksData() {
		try {
				const response = await fetch('links-data.json');
				linksData = await response.json();
				renderLinks();
		} catch (error) {
				console.error('リンクデータの読み込みに失敗しました:', error);
				// フォールバック: デフォルトデータを使用
				linksData = getDefaultLinksData();
				renderLinks();
		}
}

// デフォルトのリンクデータ
function getDefaultLinksData() {
		return [
				{
						"title": "Email",
						"description": "メールでのお問い合わせ",
						"url": "mailto:your.email@example.com",
						"iconType": "fontawesome",
						"icon": "fa-solid fa-envelope"
				},
				{
						"title": "Twitter",
						"description": "日々の活動など",
						"url": "https://twitter.com",
						"iconType": "fontawesome",
						"icon": "fa-brands fa-twitter"
				},
				{
						"title": "GitHub",
						"description": "コードや研究資料",
						"url": "https://github.com",
						"iconType": "fontawesome",
						"icon": "fa-brands fa-github"
				}
		];
}

// リンクを描画
function renderLinks() {
	const container = document.getElementById('linksContainer');
	container.innerHTML = '';

	linksData.forEach(link => {
		const linkItem = document.createElement('a');
		linkItem.className = 'link-item';
		linkItem.href = link.url;
		linkItem.target = '_blank';
		linkItem.rel = 'noopener noreferrer';

		// アイコンの生成
		const iconHTML = generateIcon(link.iconType, link.icon);

		linkItem.innerHTML = `
			${iconHTML}
			<h4>${link.title}</h4>
			<p>${link.description}</p>
		`;

		container.appendChild(linkItem);
	});

	// // MathJaxで数式を再レンダリング
	// if (window.MathJax) {
	// 	MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error:', err));
	// }
}

// アイコンを生成
function generateIcon(iconType, icon) {
	switch (iconType) {
		case 'fontawesome':
			return `<i class="link-icon ${icon}"></i>`;
		case 'emoji':
			return `<div class="link-icon emoji">${icon}</div>`;
		case 'image':
			return `<div class="link-icon"><img src="${icon}" alt="icon" style="width: 100%"></div>`;
		default:
			return `<div class="link-icon emoji">🔗</div>`;
	}
}


// スクロールアニメーション
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

document.querySelectorAll('.research-item, .timeline-item, .link-item, .schedule-item').forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(20px)';
	el.style.transition = 'opacity 0.6s, transform 0.6s';
	observer.observe(el);
});
