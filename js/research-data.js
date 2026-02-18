// ページ読み込み時にデータを読み込む
loadResearchData();
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

	// // 詳細テキストを段落に分割
	// const paragraphs = project.details.split('\n\n').map(p =>
	// 	`<p>${p.replace(/\n/g, '<br>')}</p>`
	// ).join('');

	// modalBody.innerHTML = `
	// 	<h3>${project.title}</h3>
	// 	${paragraphs}
	// `;
	let content = `<h3>${project.title}</h3><div class="research-modal-content">`;

	// 研究概要
	if (project.details) {
		content += `
				<div class="research-section">
						<div class="research-section-title">研究概要</div>
						<div class="research-description">${project.details}</div>
				</div>
		`;
	}

	// 査読付き論文
	if (project.publications && project.publications.length > 0) {
		content += `<div class="research-section">
				<div class="research-section-title">原著論文</div>`;
		project.publications.forEach(pub => {
				content += `
						<div class="publication-item">
								<div class="publication-authors">${pub.authors}</div>
								<div class="publication-title">${pub.title}</div>
								<div class="publication-venue">${pub.journal}, Vol.${pub.volume}, No.${pub.number}, pp.${pub.pages}, ${pub.year}</div>
								${pub.doi ? `<a href="https://doi.org/${pub.doi}" class="publication-doi" target="_blank">DOI: ${pub.doi}</a>` : ''}
						</div>
				`;
		});
		content += `</div>`;
	}

	// MISC（査読なし論文）
	if (project.misc && project.misc.length > 0) {
		content += `<div class="research-section">
				<div class="research-section-title">その他の論文（査読なし）</div>`;
		project.misc.forEach(misc => {
				content += `
						<div class="misc-item">
								<div class="misc-authors">${misc.authors}</div>
								<div class="misc-title">${misc.title}</div>
								<div class="misc-source">${misc.source}, ${misc.identifier}, ${misc.year}</div>
						</div>
				`;
		});
		content += `</div>`;
	}

	// 講演情報
	if (project.presentations && project.presentations.length > 0) {
		content += `<div class="research-section">
				<div class="research-section-title">学会発表・講演（ポスター含む）</div>`;
		project.presentations.forEach(pres => {
				const typeLabel = pres.type === 'oral' ? '口頭発表' : 'ポスター発表';
				content += `
						<div class="presentation-item">
								<div class="presentation-authors">${pres.authors}</div>
								<div class="presentation-title">
										${pres.title}
										<span class="presentation-type ${pres.type}">${typeLabel}</span>
								</div>
								<div class="presentation-venue">${pres.conference}, ${pres.location}, ${pres.date}</div>
						</div>
				`;
		});
		content += `</div>`;
	}

	content += `</div>`;
	modalBody.innerHTML = content;

	// // MathJaxで数式を再レンダリング
	// if (window.MathJax) {
	// 	MathJax.typesetPromise([container]).catch((err) => console.log('MathJax error:', err));
	// }

	modal.classList.add('active');
	document.body.style.overflow = 'hidden';
}

// 動的モーダルを閉じる
function closeDynamicModal() {
	const modal = document.getElementById('dynamicModal');
	modal.classList.remove('active');
	document.body.style.overflow = 'auto';
}

