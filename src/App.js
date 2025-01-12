import React, { useState, useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const canvasRef = useRef(null); // Reference for QRCodeCanvas

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGenerateQRCode = () => {
    if (!url) {
      alert("Please enter a URL!");
      return;
    }
    setGeneratedUrl(url);
  };

  const handleDownloadQRCodeSVG = () => {
    const svg = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = svgUrl;
    a.download = "qrcode.svg";
    a.click();
  };

  const handleDownloadQRCodePNG = () => {
    if (canvasRef.current) {
      const pngUrl = canvasRef.current.toDataURL("image/png"); // Generate PNG from canvas
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      a.click();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={url}
        onChange={handleChange}
        placeholder="Enter your URL"
        style={{ padding: "10px", width: "300px" }}
      />
      <br />
      <button
        onClick={handleGenerateQRCode}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        Generate QR Code
      </button>

      {generatedUrl && (
        <div style={{ marginTop: "20px" }}>
          {/* SVG QR code */}
          <QRCodeSVG value={generatedUrl} />

          <div style={{ marginTop: "20px" }}>
            {/* PNG QR code (Canvas component) */}
            <QRCodeCanvas
              value={generatedUrl}
              ref={canvasRef}
              style={{ display: "none" }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleDownloadQRCodeSVG}
              style={{ padding: "10px 20px", margin: "5px" }}
            >
              Download SVG
            </button>
            <button
              onClick={handleDownloadQRCodePNG}
              style={{ padding: "10px 20px", margin: "5px" }}
            >
              Download PNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
