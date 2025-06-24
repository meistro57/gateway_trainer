// File: js/audioEngine.js

let audioCtx;
let oscillatorL;
let oscillatorR;
let gainNodeL;
let gainNodeR;
let analyserL;
let analyserR;
let volume = 0.5;

export function startAudio(leftFreq, rightFreq, vol = 0.5) {
  stopAudio(); // Clean previous

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  oscillatorL = audioCtx.createOscillator();
  oscillatorR = audioCtx.createOscillator();
  gainNodeL = audioCtx.createGain();
  gainNodeR = audioCtx.createGain();
  analyserL = audioCtx.createAnalyser();
  analyserR = audioCtx.createAnalyser();

  oscillatorL.type = 'sine';
  oscillatorR.type = 'sine';

  oscillatorL.frequency.setValueAtTime(leftFreq, audioCtx.currentTime);
  oscillatorR.frequency.setValueAtTime(rightFreq, audioCtx.currentTime);

  volume = vol;
  gainNodeL.gain.value = volume;
  gainNodeR.gain.value = volume;

  oscillatorL.connect(gainNodeL).connect(analyserL).connect(audioCtx.destination);
  oscillatorR.connect(gainNodeR).connect(analyserR).connect(audioCtx.destination);

  oscillatorL.start();
  oscillatorR.start();
}

export function setVolume(vol) {
  volume = vol;
  if (gainNodeL) gainNodeL.gain.value = volume;
  if (gainNodeR) gainNodeR.gain.value = volume;
}

export function getVolume() {
  return volume;
}

export function stopAudio() {
  if (oscillatorL) oscillatorL.stop();
  if (oscillatorR) oscillatorR.stop();
  oscillatorL = null;
  oscillatorR = null;
  gainNodeL = null;
  gainNodeR = null;
  analyserL = null;
  analyserR = null;
  if (audioCtx) audioCtx.close();
  audioCtx = null;
}

export function setFrequencies(leftFreq, rightFreq) {
  if (oscillatorL && oscillatorR && audioCtx) {
    oscillatorL.frequency.setValueAtTime(leftFreq, audioCtx.currentTime);
    oscillatorR.frequency.setValueAtTime(rightFreq, audioCtx.currentTime);
  }
}

export function getAnalyserNodes() {
  return { leftAnalyser: analyserL, rightAnalyser: analyserR };
}
