// File: js/main.js

import { startAudio, stopAudio, setFrequencies, getAnalyserNodes } from './audioEngine.js';
import { applyEffect, setEffect, getEffect, setEffectSpeed } from './effectsEngine.js';
import { saveBookmark } from './bookmarkManager.js';
import { initVisualizer } from './visualizer.js';

const leftFreqSlider = document.getElementById('leftFreq');
const offsetSlider = document.getElementById('offsetFreq');
const effectModeSelect = document.getElementById('effectMode');
const effectSpeedSlider = document.getElementById('effectSpeed');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const bookmarkBtn = document.getElementById('bookmarkBtn');

let baseFreq = parseFloat(leftFreqSlider.value);
let offset = parseFloat(offsetSlider.value);

leftFreqSlider.oninput = updateFrequencies;
offsetSlider.oninput = updateFrequencies;
effectModeSelect.onchange = () => setEffect(effectModeSelect.value);
effectSpeedSlider.oninput = () => setEffectSpeed(parseFloat(effectSpeedSlider.value));

let isPlaying = false;

startBtn.onclick = () => {
  isPlaying = true;
  startAudio(baseFreq, baseFreq + offset);
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
  };
  saveBookmark(bookmark);
};

function updateFrequencies() {
  baseFreq = parseFloat(leftFreqSlider.value);
  offset = parseFloat(offsetSlider.value);
  setFrequencies(baseFreq, baseFreq + offset);
}

function updateLoop(time) {
  if (!isPlaying) return;
  const [l, r] = applyEffect(getEffect(), baseFreq, baseFreq + offset, time);
  setFrequencies(l, r);
  requestAnimationFrame(updateLoop);
}
