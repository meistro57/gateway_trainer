// File: js/effectsEngine.js

let currentEffect = 'none';
let effectSpeed = 1.0;

export function applyEffect(effect, leftFreq, rightFreq, time) {
  switch (effect) {
    case 'wobble':
      const wobble = Math.sin(time * effectSpeed * 0.002) * 2;
      return [leftFreq + wobble, rightFreq - wobble];
    case 'mindfuck':
      const mf = Math.sin(time * effectSpeed * 0.005) * 10;
      return [leftFreq + mf, rightFreq + mf];
    default:
      return [leftFreq, rightFreq];
  }
}

export function setEffect(effect) {
  currentEffect = effect;
}

export function getEffect() {
  return currentEffect;
}

export function setEffectSpeed(speed) {
  effectSpeed = speed;
}
