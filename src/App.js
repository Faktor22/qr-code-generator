import React, { useState, useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const canvasRef = useRef(null);

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
      const pngUrl = canvasRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      a.click();
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <img
        src={`/img/logo-qr.svg`}
        alt={`QR Code Generator`}
        style={{
          width: "150px",
          height: "auto",
          marginBottom: "20px"
        }}
      />
      <input
        type="text"
        value={url}
        onChange={handleChange}
        placeholder="Enter your URL"
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "15px"
        }}
      />
      <br />
      <button
        onClick={handleGenerateQRCode}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          backgroundColor: "rgb(90, 255, 208);",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        Generate QR Code
      </button>

      {generatedUrl && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "center"
          }}
        >
          {/* SVG QR code */}
          <div style={{ marginBottom: "20px" }}>
            <QRCodeSVG value={generatedUrl} size={256} />
          </div>

          {/* PNG QR code (Canvas component) */}
          <QRCodeCanvas
            value={generatedUrl}
            ref={canvasRef}
            style={{ display: "none" }}
            size={256}
          />

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleDownloadQRCodeSVG}
              style={{
                padding: "10px 20px",
                margin: "5px",
                backgroundColor: "rgb(255, 107, 190);",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }}
            >
              Download SVG
            </button>
            <button
              onClick={handleDownloadQRCodePNG}
              style={{
                padding: "10px 20px",
                margin: "5px",
                backgroundColor: "unset",
                border: "1px solid #fff",
                color: "white",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }}
            >
              Download PNG
            </button>
          </div>
          <p style={{ color: "#575757", fontSize: "12px", marginTop: "20px" }}>
            © by Faktor 22
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
