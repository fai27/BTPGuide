// Service integrasi scanner barcode menggunakan Html5Qrcode dengan fallback simulasi cerdas
import { Html5Qrcode } from 'html5-qrcode';

let html5QrCodeInstance = null;
let isTorchOn = false;

export const BarcodeScannerService = {
  isScanning: false,

  async startCamera(elementId, onSuccess, onError) {
    if (this.isScanning) {
      await this.stopCamera();
    }

    try {
      html5QrCodeInstance = new Html5Qrcode(elementId);
      
      const config = {
        fps: 10,
        qrbox: { width: 260, height: 160 },
        aspectRatio: 1.0,
        formatsToSupport: [
          0, // QR_CODE
          7, // EAN_13
          8, // EAN_8
          15, // UPC_A
          16, // UPC_E
          3  // CODE_128
        ]
      };

      await html5QrCodeInstance.start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
          this.isScanning = false;
          onSuccess(decodedText, decodedResult);
        },
        (errorMessage) => {
          // Frame biasa tanpa barcode terbaca, tidak perlu panik
        }
      );

      this.isScanning = true;
      return { success: true, isRealCamera: true };
    } catch (err) {
      console.warn("Gagal membuka kamera nyata (mungkin tidak ada webcam / izin ditolak):", err);
      this.isScanning = false;
      if (onError) onError(err);
      return {
        success: false,
        isRealCamera: false,
        error: err.message || 'Kamera tidak dapat diakses'
      };
    }
  },

  async stopCamera() {
    if (html5QrCodeInstance && this.isScanning) {
      try {
        await html5QrCodeInstance.stop();
        await html5QrCodeInstance.clear();
      } catch (e) {
        console.warn("Error saat mematikan scanner:", e);
      }
    }
    this.isScanning = false;
    html5QrCodeInstance = null;
    isTorchOn = false;
  },

  async toggleTorch() {
    if (!html5QrCodeInstance || !this.isScanning) {
      isTorchOn = !isTorchOn;
      return { supported: false, state: isTorchOn };
    }
    try {
      isTorchOn = !isTorchOn;
      await html5QrCodeInstance.applyVideoConstraints({
        advanced: [{ torch: isTorchOn }]
      });
      return { supported: true, state: isTorchOn };
    } catch (e) {
      console.warn("Lampu flash/torch tidak didukung:", e);
      return { supported: false, state: isTorchOn };
    }
  },

  async scanImageFile(file) {
    if (!file) return null;
    const scanner = new Html5Qrcode("temp-barcode-reader");
    try {
      const decoded = await scanner.scanFile(file, true);
      await scanner.clear();
      return decoded;
    } catch (err) {
      try { await scanner.clear(); } catch(e){}
      throw err;
    }
  }
};
