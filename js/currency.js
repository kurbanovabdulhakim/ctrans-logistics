/**
 * Currency Ticker Module for FortisWay Logistics
 * Displays realistic Central Bank currency exchange rates to Uzbek Sum (UZS)
 */

const CURRENCY_RATES = {
  USD: { rate: 12850, change: '+15.2' },
  CNY: { rate: 1810, change: '+2.4' },
  EUR: { rate: 13950, change: '-10.5' },
  RUB: { rate: 134, change: '+0.8' }
};

function initCurrencyTicker(containerId = 'currencyTicker') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = Object.entries(CURRENCY_RATES).map(([code, data]) => {
    return `<div class="currency-item">
      <strong>${code}/UZS:</strong> <span>${data.rate.toLocaleString()}</span>
    </div>`;
  }).join('');

  container.innerHTML = html;
}

// Auto-run if in browser
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initCurrencyTicker());
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRENCY_RATES, initCurrencyTicker };
}
