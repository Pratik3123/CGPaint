export function freehandDraw() {
  const mainCanvas = document.querySelector("#main-canvas");
  const ctx = mainCanvas.getContext("2d");
  console.log(ctx);

  const brushSize = document.getElementById("brush-size");
  const colorPicker = document.getElementById("color-picker");
  const clearCanvas = document.getElementById("clear-canvas");
  let isDrawing = false;

  mainCanvas.width = window.innerWidth - 40;
  mainCanvas.height = window.innerHeight * 0.85;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  //start drawing
  function startPosition(e) {
    isDrawing = true;
    draw(e);
  }

  //end drawing
  function endPosition() {
    isDrawing = true;
    ctx.beginPath();
  }

  //Function to draw on the Canvas
  function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = colorPicker.value;
    //pick the color
    ctx.lineWidth = brushSize.value;
    //Select the brush size
    ctx.lineTo(e.clientX - mainCanvas.offsetLeft, e.clientY - mainCanvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - mainCanvas.offsetLeft, e.clientY - mainCanvas.offsetTop);
  }

  //event listener for differnt mouse actions
  mainCanvas.addEventListener("mousedown", startPosition);
  mainCanvas.addEventListener("mouseup", endPosition);
  mainCanvas.addEventListener("mousemove", draw);
  clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  });

  brushSize.addEventListener("input", () => {
    ctx.lineWidth = brushSize.value;
    updateBrushSizeLabel(brushSize.value);
  });

  function updateBrushSizeLabel(size) {
    const brushSizeLabel = document.getElementById("brush-size-label");
    if (brushSizeLabel) {
      brushSizeLabel.textContent = `Brush Size: ${size}`;
    }
  }

  //Get references to the pen and eraser button
  const penButton = document.querySelector(".freehandDraw");
  const eraserButton = document.getElementById("eraser");

  //switing to pen mode
  function activatePen() {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorPicker.value;
  }

  //switching to eraser mode
  function activateEraser() {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
  }

  penButton.addEventListener("click", () => {
    activatePen();
  });

  eraserButton.addEventListener("click", () => {
    activateEraser();
  });
}
