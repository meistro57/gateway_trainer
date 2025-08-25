// File: js/effectsEngine.js

let currentEffect = 'none';
let effectSpeed = 1.0;
let sweepRange = 20;
let hoverRange = 3;
let wobbleRange = 2;

export function applyEffect(effect, leftFreq, rightFreq, time) {
  switch (effect) {
    case 'sweep':
      const sweep = Math.sin(time * effectSpeed * 0.001) * sweepRange;
      return [leftFreq + sweep, rightFreq + sweep];
    case 'hover':
      const hover = Math.sin(time * effectSpeed * 0.003) * hoverRange;
      return [leftFreq + hover, rightFreq - hover];
    case 'wobble':
      const wobble = Math.sin(time * effectSpeed * 0.002) * wobbleRange;
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

export function setSweepRange(range) {
  sweepRange = range;
}

export function setHoverRange(range) {
  hoverRange = range;
}

export function setWobbleRange(range) {
  wobbleRange = range;
}
