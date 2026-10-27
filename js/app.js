/**
 * Main Application Script for FortisWay Logistics (CTRANS 1-to-1 clone)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Tracking Form Handler
  const trackerForm = document.getElementById('trackerForm');
  const trackerInput = document.getElementById('trackerInput');

  if (trackerForm && trackerInput) {
    trackerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = trackerInput.value;
      if (typeof openTrackerModal === 'function') {
        openTrackerModal(code);
      }
    });
  }

  // 3. Modal close on backdrop click or Escape key
  const trackerModal = document.getElementById('trackerModal');
  if (trackerModal) {
    trackerModal.addEventListener('click', (e) => {
      if (e.target === trackerModal && typeof closeTrackerModal === 'function') {
        closeTrackerModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && typeof closeTrackerModal === 'function') {
      closeTrackerModal();
    }
  });

  // 4. Initial calculation
  if (typeof updateCalculatorUI === 'function') {
    updateCalculatorUI();
  }
});

// Mode switcher for Calculator (FTL vs LTL)
function setCalcMode(mode) {
  const buttons = document.querySelectorAll('.radio-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const weightInput = document.getElementById('calcWeight');
  const volumeInput = document.getElementById('calcVolume');
  const weightLabel = document.getElementById('calcWeightLabel');

  if (mode === 'FTL') {
    if (weightLabel) weightLabel.innerText = 'Вес груза (тонн)';
    if (weightInput) {
      weightInput.value = 20;
      weightInput.min = 0.5;
      weightInput.step = 0.5;
    }
    if (volumeInput) {
      volumeInput.value = 92;
      volumeInput.min = 10;
      volumeInput.step = 1;
    }
  } else {
    if (weightLabel) weightLabel.innerText = 'Вес груза (кг)';
    if (weightInput) {
      weightInput.value = 500;
      weightInput.min = 50;
      weightInput.step = 50;
    }
    if (volumeInput) {
      volumeInput.value = 2.5;
      volumeInput.min = 0.2;
      volumeInput.step = 0.5;
    }
  }

  if (typeof updateCalculatorUI === 'function') {
    updateCalculatorUI();
  }
}
