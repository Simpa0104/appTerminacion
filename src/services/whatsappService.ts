// src/services/whatsappService.ts
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface WhatsAppConfig {
    phoneNumberId: string;
    accessToken: string;
}

// Configura estas credenciales (idealmente desde variables de entorno)
const WHATSAPP_CONFIG: WhatsAppConfig = {
    phoneNumberId: "931432210045970", // Obtenerlo de Meta Business
    accessToken: "EAAcMdQ357QYBP3z39S4JfeZAHj0gQ54ZAaeBUrNVQerOi3sARjZBH9EpmV0ZAFug3F8FFLX4TDoNOzQQ3hNg1CnKfSsQC2Cpj5tTZAaMLSbwl35l07AQYxmYPlZCzkn0ZBz93J1VR8a0vR59LT5jgfehUMb9ktVOTpWt4V2TtaJZCbVYrGzZCZCtlCT7EMlDODSvFyCvpCRDGD337jAeZBCELED3WW5YSthV7kyNCGVeQqKJ2Wa5oFDlmGMWqiu0GI2ZC7yLjono1D5zphtvhWxzrdUQ3iro", // Token de acceso permanente
};

export default class WhatsAppService {
    /**
     * Envía un mensaje de WhatsApp usando la API de Meta
     */
    static async sendMessage(phoneNumber: string, lote: any): Promise<boolean> {
        try {
          const formattedPhone = this.formatPhoneNumber(phoneNumber);
          const url = `https://graph.facebook.com/v22.0/${WHATSAPP_CONFIG.phoneNumberId}/messages`;
      
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${WHATSAPP_CONFIG.accessToken}`,
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: formattedPhone,
              type: "template",
              template: {
                name: "lote_completado",
                language: { code: "es_CO" },
                components: [
                  {
                    type: "body",
                    parameters: [
                      { type: "text", text: lote.cliente },
                      { type: "text", text: lote.referenciaLote || "Sin referencia" },
                      { type: "text", text: lote.tipoPrenda || "N/A" },
                      { type: "text", text: String(lote.totalPrendas || 0) },
                      { type: "text", text: String(lote.totalLote || 0) },
                    ],
                  },
                ],
              },
            }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            console.error("Error enviando WhatsApp:", data);
            return false;
          }
      
          console.log("Mensaje enviado exitosamente:", data);
          return true;
        } catch (error) {
          console.error("Error en sendMessage:", error);
          return false;
        }
      }      

    /**
     * Formatea el número de teléfono al formato internacional
     */
    static formatPhoneNumber(phone: string): string {
        let cleaned = phone.replace(/[\s\-\(\)]/g, "");

        if (cleaned.startsWith("+")) {
            cleaned = cleaned.substring(1);
        }

        if (cleaned.length === 10 && cleaned.startsWith("3")) {
            return `57${cleaned}`;
        }

        if (cleaned.length > 10) {
            return cleaned;
        }

        return `57${cleaned}`;
    }

    /**
     * Obtiene el número de teléfono del cliente desde Firestore
     */
    static async getClientPhone(clientName: string): Promise<string | null> {
        try {
            const clientesRef = collection(db, "clientes");
            const q = query(clientesRef, where("nombreCliente", "==", clientName));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log("Cliente no encontrado:", clientName);
                return null;
            }

            const clientData = snapshot.docs[0].data();
            return clientData.celular || null;
        } catch (error) {
            console.error("Error obteniendo teléfono del cliente:", error);
            return null;
        }
    }

    /**
     * Envía notificación de lote completado al cliente
     */
    static async notifyLoteCompletado(lote: any): Promise<boolean> {
        try {
            const clientPhone = await this.getClientPhone(lote.cliente);

            if (!clientPhone) {
                console.error("No se encontró el teléfono del cliente");
                return false;
            }

            const message = this.generateCompletionMessage(lote);
            return await this.sendMessage(clientPhone, message);
        } catch (error) {
            console.error("Error en notifyLoteCompletado:", error);
            return false;
        }
    }

    /**
     * Genera el mensaje de notificación
     */
    static generateCompletionMessage(lote: any): string {
        return `
🎉 *Lote Completado*

Estimado cliente,

Su lote ha sido completado exitosamente:

📦 *Referencia:* ${lote.referenciaLote || "Sin referencia"}
👕 *Tipo de prenda:* ${lote.tipoPrenda || "N/A"}
📊 *Cantidad:* ${lote.totalPrendas || 0} unidades
💰 *Total:* $${(lote.totalLote || 0).toLocaleString("es-CO")}

Por favor, pase a recoger su pedido.

¡Gracias por confiar en nosotros!
    `.trim();
    }
}