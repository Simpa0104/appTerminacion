// src/services/pdfShiftService.ts
import axios from 'axios';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

interface PDFShiftConfig {
  apiKey: string;
  endpoint: string;
}

const PDFSHIFT_CONFIG: PDFShiftConfig = {
  apiKey: 'sk_98e2a128f8296b11c835c7492d2fc4b03f182d4a',
  endpoint: 'https://api.pdfshift.io/v3/convert/pdf',
};

export default class PDFShiftService {
  static validateConfig(): boolean {
    if (!PDFSHIFT_CONFIG.apiKey || PDFSHIFT_CONFIG.apiKey === 'TU_API_KEY_AQUI') {
      console.error('API Key de PDFShift no configurada');
      alert('Por favor configura tu API Key de PDFShift');
      return false;
    }
    return true;
  }

  static generateInvoiceHTML(lote: any): string {
    const subtotalProcesos = lote.procesos?.reduce(
      (sum: number, p: any) => sum + (Number(p.costo) || 0),
      0
    ) || 0;

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Factura - ${lote.referenciaLote}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #333; padding: 40px; }
    .container { max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #007AFF; }
    .company-info h1 { color: #007AFF; font-size: 28px; margin-bottom: 5px; }
    .company-info p { color: #666; font-size: 14px; }
    .invoice-info { text-align: right; }
    .invoice-info h2 { font-size: 24px; color: #333; }
    .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 10px; }
    .status-completado { background: #4CAF50; color: white; }
    .status-proceso { background: #FF9800; color: white; }
    .status-recibido { background: #2196F3; color: white; }
    .client-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .client-section h3 { color: #007AFF; font-size: 16px; margin-bottom: 10px; }
    .lote-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
    .info-box { background: #fff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; }
    .info-box label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 5px; }
    .info-box .value { font-size: 16px; color: #333; font-weight: 500; }
    .color-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .color-table th { background: #007AFF; color: white; padding: 12px; text-align: left; }
    .color-table td { padding: 10px 12px; border-bottom: 1px solid #e0e0e0; }
    .cost-summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .cost-row { display: flex; justify-content: space-between; padding: 10px 0; }
    .cost-total { background: #007AFF; color: white; padding: 15px; border-radius: 6px; margin-top: 10px; }
    .cost-total .cost-label, .cost-total .cost-value { color: white; font-size: 18px; font-weight: bold; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="company-info">
        <h1>Tu Empresa</h1>
        <p>NIT: 123456789-0</p>
        <p>Dirección: Calle 123 #45-67</p>
      </div>
      <div class="invoice-info">
        <h2>FACTURA</h2>
        <p><strong>No. ${lote.referenciaLote || 'N/A'}</strong></p>
        <p>Fecha: ${new Date().toLocaleDateString('es-CO')}</p>
        <span class="status-badge status-${lote.estado?.toLowerCase().replace(' ', '-') || 'recibido'}">
          ${lote.estado || 'Recibido'}
        </span>
      </div>
    </div>

    <div class="client-section">
      <h3>Cliente</h3>
      <p><strong>${lote.cliente || 'N/A'}</strong></p>
    </div>

    <div class="lote-info">
      <div class="info-box"><label>Tipo de Prenda</label><div class="value">${lote.tipoPrenda || 'N/A'}</div></div>
      <div class="info-box"><label>Referencia</label><div class="value">${lote.referenciaPrenda || 'N/A'}</div></div>
      <div class="info-box"><label>Fecha Entrada</label><div class="value">${lote.fechaEntrada || 'N/A'}</div></div>
      <div class="info-box"><label>Fecha Salida</label><div class="value">${lote.fechaSalida || 'N/A'}</div></div>
      <div class="info-box"><label>Colores</label><div class="value">${lote.colores || 0}</div></div>
      <div class="info-box"><label>Total Prendas</label><div class="value">${lote.totalPrendas || 0}</div></div>
    </div>

    ${lote.cantidadesPorColor && lote.cantidadesPorColor.length > 0 ? `
      <table class="color-table">
        <thead><tr><th>Color</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>Total</th></tr></thead>
        <tbody>
          ${lote.cantidadesPorColor.map((c: any) => {
            const total = (c.xs||0) + (c.s||0) + (c.m||0) + (c.l||0) + (c.xl||0);
            return `<tr><td>${c.nombreColor}</td><td>${c.xs||0}</td><td>${c.s||0}</td><td>${c.m||0}</td><td>${c.l||0}</td><td>${c.xl||0}</td><td><strong>${total}</strong></td></tr>`;
          }).join('')}
        </tbody>
      </table>
    ` : ''}

    <div class="cost-summary">
      <div class="cost-row">
        <span>Cantidad de Prendas</span>
        <span><strong>${lote.totalPrendas || 0} unidades</strong></span>
      </div>
      ${subtotalProcesos > 0 ? `<div class="cost-row"><span>Subtotal Procesos</span><span>$${subtotalProcesos.toLocaleString('es-CO')}</span></div>` : ''}
      <div class="cost-total">
        <div class="cost-row">
          <span class="cost-label">TOTAL</span>
          <span class="cost-value">$${(lote.totalLote || 0).toLocaleString('es-CO')}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Gracias por su preferencia</p>
      <p>${new Date().toLocaleString('es-CO')}</p>
    </div>
  </div>
</body>
</html>`;
  }

  static async generatePDF(lote: any): Promise<string | null> {
    if (!this.validateConfig()) return null;

    try {
      const html = this.generateInvoiceHTML(lote);
      console.log('Generando PDF...');

      const response = await axios.post(
        PDFSHIFT_CONFIG.endpoint,
        { source: html, landscape: false, format: 'Letter', margin: '0' },
        {
          auth: { username: 'api', password: PDFSHIFT_CONFIG.apiKey },
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('PDF recibido de PDFShift');

      // Verificar si estamos en web o móvil
      if (Platform.OS === 'web') {
        // En WEB: Descargar directamente usando blob
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Factura_${lote.referenciaLote}_${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        console.log('PDF descargado en navegador');
        return url; // Retornar la URL temporal
      } else {
        // En MÓVIL: Guardar en el sistema de archivos
        const fileName = `Factura_${lote.referenciaLote}_${Date.now()}.pdf`;
        const fileUri = (FileSystem.cacheDirectory || FileSystem.documentDirectory) + fileName;

        // Convertir ArrayBuffer a base64
        const uint8Array = new Uint8Array(response.data);
        let binaryString = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binaryString += String.fromCharCode(uint8Array[i]);
        }
        const base64 = btoa(binaryString);

        // Escribir el archivo
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log('PDF guardado:', fileUri);
        return fileUri;
      }
    } catch (error: any) {
      console.error('Error completo:', error);
      
      if (error.response?.status === 401) {
        alert('API Key inválida. Verifica tu configuración en PDFShift.io');
      } else if (error.response?.status === 402) {
        alert('Límite de uso excedido en PDFShift. Actualiza tu plan.');
      } else {
        alert('Error generando PDF: ' + (error.message || 'Desconocido'));
      }
      
      return null;
    }
  }

  static async generateAndSharePDF(lote: any): Promise<void> {
    const fileUri = await this.generatePDF(lote);
    if (!fileUri) return;

    // En web, ya se descargó automáticamente
    if (Platform.OS === 'web') {
      alert('PDF descargado exitosamente');
      return;
    }

    // En móvil, compartir
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: `Factura ${lote.referenciaLote}`,
        });
      } else {
        alert('Compartir no disponible en este dispositivo');
      }
    } catch (error) {
      console.error('Error compartiendo:', error);
      alert('Error al compartir PDF');
    }
  }

  static async printPDF(lote: any): Promise<void> {
    const fileUri = await this.generatePDF(lote);
    if (fileUri) {
      if (Platform.OS === 'web') {
        alert('PDF descargado exitosamente en tu navegador');
      } else {
        alert(`PDF generado exitosamente\n\nGuardado en: ${fileUri}`);
      }
    }
  }
}