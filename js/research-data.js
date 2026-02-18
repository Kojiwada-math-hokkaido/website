// Research データを読み込む
let researchData = {};

async function loadResearchData() {
	try {
		const response = await fetch('research-data.json');
		researchData = await response.json();
		renderResearch();
	} catch (error) {
		console.error('研究データの読み込みに失敗しました:', error);
		// フォールバック
		researchData = getDefaultResearchData();
		renderResearch();
	}
}

// デフォルトの研究データ
function getDefaultResearchData() {
	return {
		"intro": "研究内容やプロジェクトなど",
		"projects": [
			{
				"id": "modal1",
				"title": "大域結合写像におけるカオス的遍歴の特徴づけ",
				"date": "2023.12 -",
				"summary": "カオス素子の結合系である大域結合写像において現れる非線形現象を数値シミュレーションによって解析している．",
				"image": "./images/78251.jpg",
				"details": "工事中\n\n"
			}
		]
	};
}

// Researchを描画
function renderResearch() {
    // イントロを設定
    const introEl = document.getElementById('researchIntro');
    if (introEl && researchData.intro) {
			introEl.textContent = researchData.intro;
    }

	// プロジェクトを描画
	const container = document.getElementById('researchContainer');
	container.innerHTML = '';

	researchData.projects.forEach(project => {
		const item = document.createElement('div');
		item.className = 'research-item';
		item.onclick = () => openDynamicModal(project);

		// 画像HTMLの生成
		let imageHTML = '';
		if (project.image && project.image !== '') {
			imageHTML = `<img src="${project.image}" alt="研究イメージ">`;
		} else {
			// デフォルト画像（グラデーション背景）
			imageHTML = `<div style="width:200px;height:200px;background:linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);border-radius:10px;"></div>`;
		}

		item.innerHTML = `
			${imageHTML}
			<div class="research-content">
				<h3>${project.title}</h3>
				<div class="date">${project.date}</div>
				<p>${project.summary}</p>
			</div>
		`;

		container.appendChild(item);
	});
}

// 動的モーダルを開く
function openDynamicModal(project) {
	const modal = document.getElementById('dynamicModal');
	const modalBody = document.getElementById('modalBody');

	// 詳細テキストを段落に分割
	const paragraphs = project.details.split('\n\n').map(p =>
		`<p>${p.replace(/\n/g, '<br>')}</p>`
	).join('');

	modalBody.innerHTML = `
		<h3>${project.title}</h3>
		${paragraphs}
	`;

	modal.classList.add('active');
	document.body.style.overflow = 'hidden';
}

// 動的モーダルを閉じる
function closeDynamicModal() {
	const modal = document.getElementById('dynamicModal');
	modal.classList.remove('active');
	document.body.style.overflow = 'auto';
}

// ページ読み込み時にデータを読み込む
loadResearchData();
