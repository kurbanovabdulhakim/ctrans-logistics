/**
 * Freight Cost & Transit Time Calculator for FortisWay Logistics
 */

const ROUTE_DATA = {
  // Import to Uzbekistan (Tashkent)
  'china_yiwu_tashkent': { ftlPrice: 4200, ltlPricePerKg: 1.85, ltlPricePerM3: 160, transitDays: 14, name: 'Китай (Иу) ➔ Ташкент' },
  'china_guangzhou_tashkent': { ftlPrice: 4500, ltlPricePerKg: 1.95, ltlPricePerM3: 175, transitDays: 16, name: 'Китай (Гуанчжоу) ➔ Ташкент' },
  'china_urumqi_tashkent': { ftlPrice: 3200, ltlPricePerKg: 1.45, ltlPricePerM3: 130, transitDays: 8, name: 'Китай (Урумчи) ➔ Ташкент' },
  'russia_moscow_tashkent': { ftlPrice: 3600, ltlPricePerKg: 0.95, ltlPricePerM3: 95, transitDays: 7, name: 'Россия (Москва) ➔ Ташкент' },
  'russia_spb_tashkent': { ftlPrice: 3900, ltlPricePerKg: 1.05, ltlPricePerM3: 105, transitDays: 8, name: 'Россия (СПб) ➔ Ташкент' },
  'russia_ivanovo_tashkent': { ftlPrice: 3700, ltlPricePerKg: 0.98, ltlPricePerM3: 98, transitDays: 7, name: 'Россия (Иваново) ➔ Ташкент' },
  'russia_ekb_tashkent': { ftlPrice: 2900, ltlPricePerKg: 0.85, ltlPricePerM3: 85, transitDays: 5, name: 'Россия (Екатеринбург) ➔ Ташкент' },
  'turkey_istanbul_tashkent': { ftlPrice: 4800, ltlPricePerKg: 2.10, ltlPricePerM3: 190, transitDays: 12, name: 'Турция (Стамбул) ➔ Ташкент' },
  'kazakhstan_almaty_tashkent': { ftlPrice: 1200, ltlPricePerKg: 0.45, ltlPricePerM3: 45, transitDays: 3, name: 'Казахстан (Алматы) ➔ Ташкент' },
  
  // Export from Tashkent
  'tashkent_russia_moscow': { ftlPrice: 3200, ltlPricePerKg: 0.85, ltlPricePerM3: 85, transitDays: 7, name: 'Ташкент ➔ Россия (Москва)' },
  'tashkent_russia_ivanovo': { ftlPrice: 3300, ltlPricePerKg: 0.88, ltlPricePerM3: 88, transitDays: 7, name: 'Ташкент ➔ Россия (Иваново)' },
  'tashkent_kazakhstan_almaty': { ftlPrice: 1100, ltlPricePerKg: 0.40, ltlPricePerM3: 40, transitDays: 3, name: 'Ташкент ➔ Казахстан (Алматы)' }
};

function calculateFreight(params) {
  const { origin = 'china_yiwu', destination = 'tashkent', mode = 'FTL', weight = 20, volume = 92 } = params;
  
  const key = `${origin}_${destination}`.toLowerCase();
  const route = ROUTE_DATA[key] || {
    ftlPrice: 3800,
    ltlPricePerKg: 1.5,
    ltlPricePerM3: 130,
    transitDays: 10,
    name: `${origin} ➔ ${destination}`
  };

  let priceUSD = 0;
  if (mode === 'FTL') {
    priceUSD = route.ftlPrice;
  } else {
    // LTL uses maximum of weight charge vs volume charge
    const weightCharge = (weight || 100) * route.ltlPricePerKg;
    const volumeCharge = (volume || 1) * route.ltlPricePerM3;
    priceUSD = Math.round(Math.max(weightCharge, volumeCharge));
  }

  const transitDays = route.transitDays;
  const priceUZS = Math.round(priceUSD * 12850);

  const summary = `Здравствуйте, FortisWay! Прошу рассчитать рейс:
Маршрут: ${route.name}
Формат: ${mode === 'FTL' ? 'Целая еврофура FTL (до 22 т)' : 'Сборный груз LTL'}
Вес: ${weight} ${mode === 'FTL' ? 'т' : 'кг'}, Объём: ${volume} м³
Ориентировочная ставка на сайте: $${priceUSD.toLocaleString()}`;

  const telegramUrl = `https://t.me/LogisticsFortisway?text=${encodeURIComponent(summary)}`;
  const whatsappUrl = `https://wa.me/998935552262?text=${encodeURIComponent(summary)}`;

  return {
    priceUSD,
    priceUZS,
    transitDays,
    routeName: route.name,
    mode,
    telegramUrl,
    whatsappUrl,
    summaryText: summary
  };
}

function updateCalculatorUI() {
  if (typeof document === 'undefined') return;

  const originEl = document.getElementById('calcOrigin');
  const destEl = document.getElementById('calcDest');
  const modeActive = document.querySelector('.radio-btn.active');
  const weightEl = document.getElementById('calcWeight');
  const volumeEl = document.getElementById('calcVolume');

  if (!originEl || !destEl) return;

  const origin = originEl.value;
  const destination = destEl.value;
  const mode = modeActive ? modeActive.getAttribute('data-mode') : 'FTL';
  const weight = parseFloat(weightEl.value) || (mode === 'FTL' ? 20 : 500);
  const volume = parseFloat(volumeEl.value) || (mode === 'FTL' ? 92 : 2.5);

  const result = calculateFreight({ origin, destination, mode, weight, volume });

  const priceEl = document.getElementById('calcPriceResult');
  const daysEl = document.getElementById('calcDaysResult');
  const routeEl = document.getElementById('calcRouteResult');
  const tgBtn = document.getElementById('calcTgBtn');
  const waBtn = document.getElementById('calcWaBtn');

  if (priceEl) priceEl.innerText = `$${result.priceUSD.toLocaleString()}`;
  if (daysEl) daysEl.innerText = `${result.transitDays} дн.`;
  if (routeEl) routeEl.innerText = result.routeName;
  if (tgBtn) tgBtn.href = result.telegramUrl;
  if (waBtn) waBtn.href = result.whatsappUrl;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROUTE_DATA, calculateFreight, updateCalculatorUI };
}
