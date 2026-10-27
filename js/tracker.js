/**
 * Cargo Tracking Module for FortisWay Logistics
 * Simulates real-time 5-stage shipment progression with modal display
 */

const TRACKING_STAGES = [
  { id: 1, title: 'Принят на складе отправления', desc: 'Груз взвешен, проверен, промаркирован и готов к опломбированию.' },
  { id: 2, title: 'Экспортная таможенная очистка', desc: 'Декларация подана, документы CMR и TIR оформлены.' },
  { id: 3, title: 'В пути: международный транзит', desc: 'Автопоезд следует по маршруту. GPS-мониторинг активен 24/7.' },
  { id: 4, title: 'Прибытие на СВХ в Узбекистане', desc: 'Груз доставлен на таможенный терминал в Ташкенте.' },
  { id: 5, title: 'Таможенная очистка завершена', desc: 'Груз растаможен и готов к передаче грузополучателю.' }
];

function trackCargo(trackNumber) {
  if (!trackNumber || typeof trackNumber !== 'string') {
    return { valid: false, message: 'Пожалуйста, введите корректный номер накладной или трек-номер.' };
  }

  const cleanTrack = trackNumber.trim().toUpperCase();
  if (cleanTrack.length < 3) {
    return { valid: false, message: 'Номер накладной слишком короткий.' };
  }

  // Determine realistic simulated stage based on hash or default to 3 (in transit)
  let sum = 0;
  for (let i = 0; i < cleanTrack.length; i++) sum += cleanTrack.charCodeAt(i);
  const currentStage = (sum % 3) + 2; // Stages 2, 3 or 4

  return {
    valid: true,
    trackNumber: cleanTrack,
    currentStage: currentStage,
    stages: TRACKING_STAGES,
    vehicleInfo: 'MAN TGX 50 Z 825 WA / KRONE SD 50 5002 BA',
    lastUpdate: '27.10.2026, 17:40'
  };
}

function openTrackerModal(trackNumber) {
  const result = trackCargo(trackNumber);
  const modal = document.getElementById('trackerModal');
  const modalBody = document.getElementById('trackerModalBody');
  if (!modal || !modalBody) return;

  if (!result.valid) {
    modalBody.innerHTML = `<div style="color: #ef4444; padding: 20px; text-align: center; font-weight: 600;">
      ${result.message}
    </div>`;
  } else {
    let timelineHtml = '<div class="timeline">';
    result.stages.forEach(stage => {
      let statusClass = '';
      let statusIcon = stage.id;
      if (stage.id < result.currentStage) {
        statusClass = 'completed';
        statusIcon = '✓';
      } else if (stage.id === result.currentStage) {
        statusClass = 'current';
        statusIcon = '●';
      }

      timelineHtml += `
        <div class="timeline-step ${statusClass}">
          <div class="timeline-dot">${statusIcon}</div>
          <div class="timeline-title">${stage.title}</div>
          <div class="timeline-desc">${stage.desc}</div>
        </div>
      `;
    });
    timelineHtml += '</div>';

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
        <div style="font-size: 0.85rem; color: #94a3b8; text-transform: uppercase;">Накладная / Трек-номер:</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #38bdf8;">${result.trackNumber}</div>
        <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px;">Транспорт: <strong>${result.vehicleInfo}</strong> | Обновлено: ${result.lastUpdate}</div>
      </div>
      ${timelineHtml}
    `;
  }

  modal.classList.add('active');
}

function closeTrackerModal() {
  const modal = document.getElementById('trackerModal');
  if (modal) modal.classList.remove('active');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRACKING_STAGES, trackCargo, openTrackerModal, closeTrackerModal };
}
