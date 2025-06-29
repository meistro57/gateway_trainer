// File: js/main.js

import { startAudio, stopAudio, setFrequencies, getAnalyserNodes, setVolume } from './audioEngine.js';
import { applyEffect, setEffect, getEffect, setEffectSpeed, setSweepRange, setHoverRange } from './effectsEngine.js';
import { saveBookmark } from './bookmarkManager.js';
import { initVisualizer } from './visualizer.js';

const leftFreqSlider = document.getElementById('leftFreq');
const offsetSlider = document.getElementById('offsetFreq');
const effectModeSelect = document.getElementById('effectMode');
const effectSpeedSlider = document.getElementById('effectSpeed');
const sweepRangeSlider = document.getElementById('sweepRange');
const hoverRangeSlider = document.getElementById('hoverRange');
const monroeLevelSelect = document.getElementById('monroeLevel');
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
leftFreqDisplay.textContent = `${baseFreq} Hz`;
rightFreqDisplay.textContent = `${baseFreq + offset} Hz`;

leftFreqSlider.oninput = updateFrequencies;
offsetSlider.oninput = updateFrequencies;
effectModeSelect.onchange = () => setEffect(effectModeSelect.value);
effectSpeedSlider.oninput = () => setEffectSpeed(parseFloat(effectSpeedSlider.value));
sweepRangeSlider.oninput = () => setSweepRange(parseFloat(sweepRangeSlider.value));
hoverRangeSlider.oninput = () => setHoverRange(parseFloat(hoverRangeSlider.value));
volumeSlider.oninput = () => setVolume(parseFloat(volumeSlider.value));
monroeLevelSelect.onchange = () => {
  if (monroeLevelSelect.value === 'none') return;
  const preset = monroeLevels[monroeLevelSelect.value];
  leftFreqSlider.value = preset.base;
  offsetSlider.value = preset.offset;
  updateFrequencies();
};

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
  };
  saveBookmark(bookmark);
};

function updateFrequencies() {
  baseFreq = parseFloat(leftFreqSlider.value);
  offset = parseFloat(offsetSlider.value);
  setFrequencies(baseFreq, baseFreq + offset);
  leftFreqDisplay.textContent = `${baseFreq} Hz`;
  rightFreqDisplay.textContent = `${baseFreq + offset} Hz`;
}

function updateLoop(time) {
  if (!isPlaying) return;
  const [l, r] = applyEffect(getEffect(), baseFreq, baseFreq + offset, time);
  setFrequencies(l, r);
  leftFreqDisplay.textContent = `${l.toFixed(2)} Hz`;
  rightFreqDisplay.textContent = `${r.toFixed(2)} Hz`;
  requestAnimationFrame(updateLoop);
}
