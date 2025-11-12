import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default class PDFService {
  static generateInvoiceHTML(lote: any): string {
    return `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
            h1 { text-align: center; color: #4a4a4a; }
            .section { margin-bottom: 20px; }
            .header { background: #f2f2f2; padding: 10px; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #eaeaea; }
            .total { font-weight: bold; text-align: right; }
          </style>
        </head>
        <body>
          <h1>Reporte de Lote</h1>
          <div class="section header">
            <p><strong>ID del Lote:</strong> ${lote.id || '—'}</p>
            <p><strong>Estado:</strong> ${lote.estado || 'Pendiente'}</p>
            <p><strong>Fecha de creación:</strong> ${lote.fecha || new Date().toLocaleDateString()}</p>
          </div>
          <div class="section">
            <h3>Prendas</h3>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${
                  lote.prendas?.length
                    ? lote.prendas
                        .map(
                          (p: any) => `
                    <tr>
                      <td>${p.nombre}</td>
                      <td>${p.cantidad}</td>
                      <td>$${p.precioUnitario}</td>
                      <td>$${p.cantidad * p.precioUnitario}</td>
                    </tr>
                  `
                        )
                        .join('')
                    : `<tr><td colspan="4">No hay prendas registradas</td></tr>`
                }
              </tbody>
            </table>
            <p class="total">Total general: <strong>$${lote.total || 0}</strong></p>
          </div>
        </body>
      </html>
    `;
  }

  static async generateAndSharePDF(lote: any) {
    try {
      const html = this.generateInvoiceHTML(lote);
      const { uri } = await Print.printToFileAsync({ html });

      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        alert('La función de compartir no está disponible en este dispositivo.');
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error al generar o compartir el PDF:', error);
      alert('Ocurrió un error al generar el PDF.');
    }
  }

  static async printPDF(lote: any) {
    try {
      const html = this.generateInvoiceHTML(lote);
      await Print.printAsync({ html });
    } catch (error) {
      console.error('Error al imprimir PDF:', error);
      alert('No se pudo imprimir el documento.');
    }
  }
}
