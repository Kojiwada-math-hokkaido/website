// ページ読み込み時にActivitiesデータを読み込む
loadActivitiesData();

// Activities データを読み込む
let activitiesData = {};
let currentActivityTab = 'teaching';

async function loadActivitiesData() {
	try {
			const response = await fetch('activities-data.json');
			activitiesData = await response.json();

			// イントロを設定
			const introEl = document.getElementById('activitiesIntro');
			if (introEl && activitiesData.intro) {
					introEl.textContent = activitiesData.intro;
			}


			renderActivities(currentActivityTab);
	} catch (error) {
			console.error('Activitiesデータの読み込みに失敗しました:', error);
			activitiesData = getDefaultActivitiesData();
			renderActivities(currentActivityTab);
	}
}

function getDefaultActivitiesData() {
	return {
			"intro": "教育・研究活動など",
			"teaching": [{
					"position": "ティーチングアシスタント",
					"course": "機械学習基礎",
					"institution": "○○大学",
					"period": "2023.4 - 2024.3",
					"description": "講義補助、課題添削"
			}],
			"research_assistant": [],
			"academic_service": []
	};
}

function switchActivityTab(tab) {
	currentActivityTab = tab;
	document.querySelectorAll('.activity-tab').forEach(btn => {
			btn.classList.remove('active');
	});
	event.target.classList.add('active');
	renderActivities(tab);
}

function renderActivities(tab) {
	const container = document.getElementById('activitiesContainer');
	const items = activitiesData[tab] || [];

	container.innerHTML = '';

	if (items.length === 0) {
			container.innerHTML = '<p style="text-align:center;color:#999;padding:3rem 0;">データがありません</p>';
			return;
	}

	const timeline = document.createElement('div');
	timeline.className = 'activity-timeline';

	items.forEach(item => {
			const activityItem = document.createElement('div');
			activityItem.className = 'activity-item';

			activityItem.innerHTML = `
					<div class="position">${item.position || item.role}</div>
					<h3>${item.course || item.project || item.organization}</h3>
					<div class="period">${item.period}${item.institution ? ' | ' + item.institution : ''}</div>
					<div class="description">${item.description}</div>
			`;

			timeline.appendChild(activityItem);
	});

	container.appendChild(timeline);
}
