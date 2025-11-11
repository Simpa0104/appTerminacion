// src/services/pdfService.ts
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import { Alert, Platform } from "react-native";

interface LoteData {
  referenciaLote: string;
  cliente: string;
  tipoPrenda: string;
  referenciaPrenda: string;
  fechaEntrada: string;
  fechaSalida: string;
  estado: string;
  totalPrendas: number;
  totalLote: number;
  colores?: number;
  cantidadesPorColor?: Array<{
    nombreColor: string;
    xs?: number;
    s?: number;
    m?: number;
    l?: number;
    xl?: number;
  }>;
  procesos?: Array<{
    nombre: string;
    proveedor?: string;
    costo: number;
  }>;
  insumos?: string;
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
}

/**
 * Servicio para generar PDFs de facturas de lotes
 */
export class PDFService {
  /**
   * Genera el HTML de la factura
   */
  private static generateInvoiceHTML(lote: LoteData): string {
    const currentDate = new Date().toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Calcular subtotal de procesos
    const subtotalProcesos = lote.procesos
      ? lote.procesos.reduce((sum, p) => sum + (Number(p.costo) || 0), 0)
      : 0;

    // Generar filas de tallas por color
    const renderColorRows = () => {
      if (!lote.cantidadesPorColor || lote.cantidadesPorColor.length === 0) {
        return "";
      }

      return lote.cantidadesPorColor
        .map((color) => {
          const totalColor =
            (Number(color.xs) || 0) +
            (Number(color.s) || 0) +
            (Number(color.m) || 0) +
            (Number(color.l) || 0) +
            (Number(color.xl) || 0);

          return `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${color.nombreColor}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${color.xs || 0}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${color.s || 0}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${color.m || 0}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${color.l || 0}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${color.xl || 0}</td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center; font-weight: bold;">${totalColor}</td>
            </tr>
          `;
        })
        .join("");
    };

    // Generar filas de tallas totales (si no hay colores)
    const renderSizeRows = () => {
      if (lote.cantidadesPorColor && lote.cantidadesPorColor.length > 0) {
        return "";
      }

      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">Total por talla</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${lote.xs || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${lote.s || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${lote.m || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${lote.l || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${lote.xl || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center; font-weight: bold;">${lote.totalPrendas || 0}</td>
        </tr>
      `;
    };

    // Generar filas de procesos
    const renderProcesosRows = () => {
      if (!lote.procesos || lote.procesos.length === 0) {
        return `
          <tr>
            <td colspan="3" style="padding: 20px; text-align: center; color: #666;">
              No se registraron procesos
            </td>
          </tr>
        `;
      }

      return lote.procesos
        .map(
          (proceso) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${proceso.nombre}</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #666;">
              ${proceso.proveedor || "N/A"}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: 600;">
              $${proceso.costo.toLocaleString("es-CO")}
            </td>
          </tr>
        `
        )
        .join("");
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            padding: 40px;
            background: #fff;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #007AFF;
          }
          
          .company-info h1 {
            color: #007AFF;
            font-size: 28px;
            margin-bottom: 8px;
          }
          
          .company-info p {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
          }
          
          .invoice-info {
            text-align: right;
          }
          
          .invoice-info h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
          }
          
          .invoice-info p {
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
          }
          
          .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
          }
          
          .status-completado {
            background-color: #E8F5E9;
            color: #2E7D32;
          }
          
          .status-proceso {
            background-color: #FFF3E0;
            color: #F57C00;
          }
          
          .status-recibido {
            background-color: #E3F2FD;
            color: #1976D2;
          }
          
          .client-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          
          .client-section h3 {
            color: #007AFF;
            font-size: 16px;
            margin-bottom: 15px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .info-item {
            display: flex;
            flex-direction: column;
          }
          
          .info-label {
            font-size: 12px;
            color: #666;
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .info-value {
            font-size: 15px;
            color: #333;
            font-weight: 500;
          }
          
          .section-title {
            color: #333;
            font-size: 18px;
            font-weight: bold;
            margin: 30px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e0e0;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
          }
          
          thead {
            background: #007AFF;
            color: white;
          }
          
          th {
            padding: 12px 10px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          th.center {
            text-align: center;
          }
          
          .summary {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 15px;
          }
          
          .summary-row.subtotal {
            border-top: 1px solid #e0e0e0;
            margin-top: 10px;
            padding-top: 15px;
            font-weight: 600;
            color: #4F46E5;
          }
          
          .summary-row.total {
            border-top: 2px solid #007AFF;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 20px;
            font-weight: bold;
            color: #007AFF;
          }
          
          .insumos-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007AFF;
            margin-bottom: 30px;
          }
          
          .insumos-box p {
            color: #333;
            line-height: 1.6;
            font-size: 14px;
          }
          
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div class="company-info">
            <h1>TERMINACIÓN DE PRENDAS</h1>
            <p>Sistema de Gestión de Lotes</p>
            <p>Medellín, Colombia</p>
          </div>
          <div class="invoice-info">
            <h2>FACTURA</h2>
            <p><strong>Lote:</strong> ${lote.referenciaLote || "N/A"}</p>
            <p><strong>Fecha:</strong> ${currentDate}</p>
            <span class="status-badge status-${lote.estado?.toLowerCase().replace(" ", "-") || "recibido"}">
              ${lote.estado || "Recibido"}
            </span>
          </div>
        </div>

        <!-- Client Info -->
        <div class="client-section">
          <h3>INFORMACIÓN DEL CLIENTE</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Cliente</span>
              <span class="info-value">${lote.cliente || "N/A"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Tipo de Prenda</span>
              <span class="info-value">${lote.tipoPrenda || "N/A"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Referencia</span>
              <span class="info-value">${lote.referenciaPrenda || "N/A"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Total Colores</span>
              <span class="info-value">${lote.colores || 0}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Fecha Entrada</span>
              <span class="info-value">${lote.fechaEntrada || "N/A"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Fecha Salida</span>
              <span class="info-value">${lote.fechaSalida || "N/A"}</span>
            </div>
          </div>
        </div>

        <!-- Distribution Table -->
        <h3 class="section-title">DISTRIBUCIÓN POR TALLAS</h3>
        <table>
          <thead>
            <tr>
              <th>${lote.cantidadesPorColor && lote.cantidadesPorColor.length > 0 ? "Color" : "Descripción"}</th>
              <th class="center">XS</th>
              <th class="center">S</th>
              <th class="center">M</th>
              <th class="center">L</th>
              <th class="center">XL</th>
              <th class="center">Total</th>
            </tr>
          </thead>
          <tbody>
            ${renderColorRows()}
            ${renderSizeRows()}
            <tr style="background: #f8f9fa; font-weight: bold;">
              <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">TOTAL PRENDAS</td>
              <td colspan="5" style="padding: 12px; border-bottom: 1px solid #e0e0e0;"></td>
              <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center; color: #007AFF; font-size: 16px;">
                ${lote.totalPrendas || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Processes Table -->
        ${
          lote.procesos && lote.procesos.length > 0
            ? `
        <h3 class="section-title">PROCESOS Y COSTOS</h3>
        <table>
          <thead>
            <tr>
              <th>Proceso</th>
              <th>Proveedor</th>
              <th style="text-align: right;">Costo</th>
            </tr>
          </thead>
          <tbody>
            ${renderProcesosRows()}
          </tbody>
        </table>
        `
            : ""
        }

        <!-- Insumos -->
        ${
          lote.insumos
            ? `
        <h3 class="section-title">INSUMOS</h3>
        <div class="insumos-box">
          <p>${lote.insumos}</p>
        </div>
        `
            : ""
        }

        <!-- Summary -->
        <div class="summary">
          <div class="summary-row">
            <span>Total de prendas:</span>
            <span>${lote.totalPrendas || 0} unidades</span>
          </div>
          ${
            lote.procesos && lote.procesos.length > 0
              ? `
          <div class="summary-row subtotal">
            <span>Subtotal procesos:</span>
            <span>$${subtotalProcesos.toLocaleString("es-CO")}</span>
          </div>
          `
              : ""
          }
          <div class="summary-row total">
            <span>TOTAL DEL LOTE:</span>
            <span>$${(lote.totalLote || 0).toLocaleString("es-CO")}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>Documento generado automáticamente por el Sistema de Gestión de Lotes</p>
          <p>Generado el ${currentDate}</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Genera el PDF de la factura
   */
  static async generatePDF(lote: LoteData): Promise<string> {
    try {
      const htmlContent = this.generateInvoiceHTML(lote);

      const options = {
        html: htmlContent,
        fileName: `Factura_Lote_${lote.referenciaLote || "SinRef"}_${Date.now()}`,
        directory: Platform.OS === "ios" ? "Documents" : "Downloads",
        base64: false,
      };

      const file = await RNHTMLtoPDF.convert(options);
      
      if (!file.filePath) {
        throw new Error("No se pudo generar el PDF");
      }

      return file.filePath;
    } catch (error) {
      console.error("Error al generar PDF:", error);
      throw error;
    }
  }

  /**
   * Genera y comparte el PDF
   */
  static async generateAndShare(lote: LoteData): Promise<void> {
    try {
      const filePath = await this.generatePDF(lote);

      const shareOptions = {
        title: `Factura Lote ${lote.referenciaLote || "SinRef"}`,
        message: `Factura del lote ${lote.referenciaLote || "SinRef"} - ${lote.cliente || "Sin cliente"}`,
        url: Platform.OS === "android" ? `file://${filePath}` : filePath,
        type: "application/pdf",
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    } catch (error: any) {
      // Si el usuario cancela, no mostrar error
      if (error.message && error.message.includes("User did not share")) {
        console.log("Usuario canceló compartir");
        return;
      }
      
      console.error("Error al compartir PDF:", error);
      Alert.alert(
        "Error",
        "No se pudo compartir el PDF. Por favor, intenta nuevamente.",
        [{ text: "OK" }]
      );
    }
  }

  /**
   * Solo genera el PDF sin compartir
   */
  static async generateOnly(lote: LoteData): Promise<void> {
    try {
      const filePath = await this.generatePDF(lote);
      
      Alert.alert(
        "PDF Generado",
        Platform.OS === "android"
          ? `PDF guardado en Downloads:\n${filePath.split("/").pop()}`
          : `PDF guardado en Documents:\n${filePath.split("/").pop()}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error al generar PDF:", error);
      Alert.alert(
        "Error",
        "No se pudo generar el PDF. Por favor, intenta nuevamente.",
        [{ text: "OK" }]
      );
    }
  }
}