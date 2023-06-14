import React, { useState, useRef } from "react";

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushType, setBrushType] = useState("round");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineWidth = brushSize;
    context.strokeStyle = brushColor;
    context.lineCap = brushType;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const changeBrushSize = (e) => {
    setBrushSize(parseInt(e.target.value));
  };

  const changeBrushColor = (e) => {
    setBrushColor(e.target.value);
  };

  const changeBrushType = (e) => {
    setBrushType(e.target.value);
  };

  const changeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "drawing.png";
    a.click();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ border: "2px solid #ccc", borderRadius: "5px" }}>
        <h2>Drawing App</h2>
        <div>
          <canvas
            ref={canvasRef}
            width={window.innerWidth * 0.8}
            height={window.innerHeight * 0.8}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ background: backgroundColor }}
          />
        </div>
        <div>
          <label htmlFor="brushSize">Brush Size:</label>
          <input
            type="range"
            id="brushSize"
            min="1"
            max="20"
            value={brushSize}
            onChange={changeBrushSize}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label htmlFor="brushColor">Brush Color:</label>
          <input
            type="color"
            id="brushColor"
            value={brushColor}
            onChange={changeBrushColor}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <div>
          <label htmlFor="brushType">Brush Type:</label>
          <select
            id="brushType"
            value={brushType}
            onChange={changeBrushType}
            style={{ marginBottom: "10px" }}
          >
            <option value="round">Round</option>
            <option value="square">Square</option>
            <option value="butt">Flat</option>
          </select>
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={changeBackgroundColor}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <div>
          <div>
            <button
              onClick={clearCanvas}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
            <button
              onClick={saveDrawing}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingApp;
