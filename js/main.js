// File: js/main.js

import { startAudio, stopAudio, setFrequencies, getAnalyserNodes, setVolume } from './audioEngine.js';
import { applyEffect, setEffect, getEffect, setEffectSpeed, setSweepRange, setHoverRange, setWobbleRange } from './effectsEngine.js';
import { saveBookmark } from './bookmarkManager.js';
import { initVisualizer } from './visualizer.js';

const leftFreqSlider = document.getElementById('leftFreq');
const offsetSlider = document.getElementById('offsetFreq');
const effectModeSelect = document.getElementById('effectMode');
const effectSpeedSlider = document.getElementById('effectSpeed');
const sweepRangeSlider = document.getElementById('sweepRange');
const hoverRangeSlider = document.getElementById('hoverRange');
const wobbleRangeSlider = document.getElementById('wobbleRange');
const monroeLevelSelect = document.getElementById('monroeLevel');
const preset528Checkbox = document.getElementById('preset528');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const bookmarkBtn = document.getElementById('bookmarkBtn');
const volumeSlider = document.getElementById('volume');
const leftFreqDisplay = document.getElementById('leftFreqDisplay');
const rightFreqDisplay = document.getElementById('rightFreqDisplay');

const monroeLevels = {
  focus3: { base: 200, offset: 3 },
  focus10: { base: 200, offset: 10 },
  focus12: { base: 200, offset: 12 },
  focus15: { base: 200, offset: 15 },
  focus21: { base: 200, offset: 21 },
  focus27: { base: 200, offset: 27 },
};

let baseFreq = parseFloat(leftFreqSlider.value);
let offset = parseFloat(offsetSlider.value);
setSweepRange(parseFloat(sweepRangeSlider.value));
setHoverRange(parseFloat(hoverRangeSlider.value));
setWobbleRange(parseFloat(wobbleRangeSlider.value));
leftFreqDisplay.textContent = `${baseFreq.toFixed(2)} Hz`;
rightFreqDisplay.textContent = `${(baseFreq + offset).toFixed(2)} Hz`;

leftFreqSlider.oninput = () => {
  preset528Checkbox.checked = false;
  updateFrequencies();
};
offsetSlider.oninput = () => {
  preset528Checkbox.checked = false;
  updateFrequencies();
};
effectModeSelect.onchange = () => setEffect(effectModeSelect.value);
effectSpeedSlider.oninput = () => setEffectSpeed(parseFloat(effectSpeedSlider.value));
sweepRangeSlider.oninput = () => setSweepRange(parseFloat(sweepRangeSlider.value));
hoverRangeSlider.oninput = () => setHoverRange(parseFloat(hoverRangeSlider.value));
wobbleRangeSlider.oninput = () => setWobbleRange(parseFloat(wobbleRangeSlider.value));
volumeSlider.oninput = () => setVolume(parseFloat(volumeSlider.value));
monroeLevelSelect.onchange = () => {
  preset528Checkbox.checked = false;
  if (monroeLevelSelect.value === 'none') return;
  const preset = monroeLevels[monroeLevelSelect.value];
  leftFreqSlider.value = preset.base;
  offsetSlider.value = preset.offset;
  updateFrequencies();
};

preset528Checkbox.onchange = () => {
  if (preset528Checkbox.checked) {
    monroeLevelSelect.value = 'none';
    leftFreqSlider.value = 520;
    offsetSlider.value = 8;
    updateFrequencies();
  }
};

function enableManualInput(displayEl, getter, setter) {
  displayEl.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'freq-input';
    input.value = getter().toFixed(2);
    input.step = '0.01';
    input.inputMode = 'decimal';
    displayEl.replaceWith(input);
    input.focus();

    const commit = () => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) {
        setter(val);
        updateFrequencies();
      }
      input.replaceWith(displayEl);
    };

    input.addEventListener('blur', commit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit();
      if (e.key === 'Escape') input.replaceWith(displayEl);
    });
  });
}

enableManualInput(
  leftFreqDisplay,
  () => baseFreq,
  (val) => {
    const min = parseFloat(leftFreqSlider.min);
    const max = parseFloat(leftFreqSlider.max);
    const clamped = Math.min(Math.max(val, min), max);
    leftFreqSlider.value = clamped;
  }
);

enableManualInput(
  rightFreqDisplay,
  () => baseFreq + offset,
  (val) => {
    const min = parseFloat(offsetSlider.min);
    const max = parseFloat(offsetSlider.max);
    let newOffset = val - baseFreq;
    newOffset = Math.min(Math.max(newOffset, min), max);
    offsetSlider.value = newOffset;
  }
);

let isPlaying = false;

startBtn.onclick = () => {
  isPlaying = true;
  startAudio(baseFreq, baseFreq + offset, parseFloat(volumeSlider.value));
  const { leftAnalyser, rightAnalyser } = getAnalyserNodes();
  initVisualizer(leftAnalyser, rightAnalyser);
  requestAnimationFrame(updateLoop);
};

stopBtn.onclick = () => {
  stopAudio();
  isPlaying = false;
};

bookmarkBtn.onclick = () => {
  const bookmark = {
    timestamp: Date.now(),
    leftFreq: parseFloat(leftFreqSlider.value),
    offset: parseFloat(offsetSlider.value),
    effect: effectModeSelect.value,
    speed: parseFloat(effectSpeedSlider.value),
    sweepRange: parseFloat(sweepRangeSlider.value),
    hoverRange: parseFloat(hoverRangeSlider.value),
    wobbleRange: parseFloat(wobbleRangeSlider.value),
  };
  saveBookmark(bookmark);
};

function updateFrequencies() {
  baseFreq = parseFloat(leftFreqSlider.value);
  offset = parseFloat(offsetSlider.value);
  setFrequencies(baseFreq, baseFreq + offset);
  leftFreqDisplay.textContent = `${baseFreq.toFixed(2)} Hz`;
  rightFreqDisplay.textContent = `${(baseFreq + offset).toFixed(2)} Hz`;
}

function updateLoop(time) {
  if (!isPlaying) return;
  const [l, r] = applyEffect(getEffect(), baseFreq, baseFreq + offset, time);
  setFrequencies(l, r);
  leftFreqDisplay.textContent = `${l.toFixed(2)} Hz`;
  rightFreqDisplay.textContent = `${r.toFixed(2)} Hz`;
  requestAnimationFrame(updateLoop);
}
