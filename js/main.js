// File: js/main.js

import { startAudio, stopAudio, setFrequencies, getAnalyserNodes } from './audioEngine.js';
import { applyEffect, setEffectSpeed } from './effectsEngine.js';
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
effectModeSelect.onchange = () => applyEffect(effectModeSelect.value);
effectSpeedSlider.oninput = () => setEffectSpeed(parseFloat(effectSpeedSlider.value));

startBtn.onclick = () => {
  startAudio();
  const { leftAnalyser, rightAnalyser } = getAnalyserNodes();
  initVisualizer(leftAnalyser, rightAnalyser);
};

stopBtn.onclick = stopAudio;

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
  setFrequencies(baseFreq, offset);
}
