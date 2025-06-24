// File: js/visualizer.js

let leftAnalyser, rightAnalyser;
let leftCanvas, rightCanvas;
let leftCtx, rightCtx;

export function initVisualizer(leftNode, rightNode) {
  leftAnalyser = leftNode;
  rightAnalyser = rightNode;

  leftCanvas = document.getElementById('left-visualizer');
  rightCanvas = document.getElementById('right-visualizer');
  leftCtx = leftCanvas.getContext('2d');
  rightCtx = rightCanvas.getContext('2d');

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  draw(leftAnalyser, leftCtx, leftCanvas, 'blue');
  draw(rightAnalyser, rightCtx, rightCanvas, 'red');
}

function draw(analyser, ctx, canvas, color) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];
    ctx.fillStyle = color;
    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    x += barWidth + 1;
  }
}
