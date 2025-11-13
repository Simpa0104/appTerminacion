import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface WhatsAppConfig {
    phoneNumberId: string;
    accessToken: string;
}

const WHATSAPP_CONFIG: WhatsAppConfig = {
    phoneNumberId: "931432210045970",
    accessToken: "EAAcMdQ357QYBP0ffhrqxzsEMsshILAP0KhQygTbirLIlydzSfhWQjmDxgKPTwN6jSfNNVBpZAJEZAdJNxJEOHdvh2NCWDaZATiNy26ojEeGmxDtYDskUQapR7N9nN8Eehijz9vzNrLhmnwOZBBzhaYDVtwYFmXBWTcR4VXj5KtjST8JNFBPatFmDmtq4zNbJZCfYcHyjQzubHt7mMqPZA315qVxYy0tZAx0ORhZAnhlmCOGG2AZDZD",
};

export default class WhatsAppService {
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

    static async sendMessageHelloWorld(phoneNumber: string): Promise<boolean> {
        try {
            const formattedPhone = this.formatPhoneNumber(phoneNumber);
            const url = `https://graph.facebook.com/v22.0/${WHATSAPP_CONFIG.phoneNumberId}/messages`;

            console.log('Enviando WhatsApp (hello_world) a:', formattedPhone);

            const payload = {
                messaging_product: "whatsapp",
                to: formattedPhone,
                type: "template",
                template: {
                    name: "hello_world",
                    language: { 
                        code: "en_US"
                    },
                },
            };

            console.log('Payload:', JSON.stringify(payload, null, 2));

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${WHATSAPP_CONFIG.accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("❌ Error enviando WhatsApp:", data);
                alert(`❌ Error: ${data.error?.message || 'Error desconocido'}`);
                return false;
            }

            console.log("¡Mensaje enviado exitosamente!", data);
            return true;

        } catch (error) {
            console.error("Error en sendMessage:", error);
            alert("Error de red al enviar mensaje");
            return false;
        }
    }

    static async sendMessage(phoneNumber: string, lote: any): Promise<boolean> {
        try {
            const formattedPhone = this.formatPhoneNumber(phoneNumber);
            const url = `https://graph.facebook.com/v22.0/${WHATSAPP_CONFIG.phoneNumberId}/messages`;

            console.log('Enviando WhatsApp a:', formattedPhone);

            const totalFormateado = Number(lote.totalLote || 0).toLocaleString('es-CO');

            const payload = {
                messaging_product: "whatsapp",
                to: formattedPhone,
                type: "template",
                template: {
                    name: "lote_completado",
                    language: { 
                        code: "es_CO"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: lote.cliente || "Cliente" },
                                { type: "text", text: lote.referenciaLote || "Sin referencia" },
                                { type: "text", text: lote.tipoPrenda || "N/A" },
                                { type: "text", text: String(lote.totalPrendas || 0) },
                                { type: "text", text: totalFormateado },
                            ],
                        },
                    ],
                },
            };

            console.log('Payload enviado:', JSON.stringify(payload, null, 2));

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${WHATSAPP_CONFIG.accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error enviando WhatsApp:", data);
                
                if (data.error?.code === 132001) {
                    console.log('Plantilla no aprobada, intentando con hello_world...');

                    return await this.sendMessageHelloWorld(phoneNumber);
                } else if (data.error?.code === 131030) {
                    alert(`El número ${formattedPhone} no está en la lista de números autorizados.`);
                } else {
                    alert(`Error: ${data.error?.message || 'Error desconocido'}`);
                }
                
                return false;
            }

            console.log("¡Mensaje enviado exitosamente!", data);
            return true;

        } catch (error) {
            console.error("Error en sendMessage:", error);
            alert("Error de red al enviar mensaje");
            return false;
        }
    }

    static async notifyLoteCompletado(lote: any): Promise<boolean> {
        try {
            console.log('Enviando notificación de WhatsApp...');
            console.log('Buscando teléfono del cliente:', lote.cliente);
            
            const clientPhone = await this.getClientPhone(lote.cliente);

            if (!clientPhone) {
                console.error("No se encontró el teléfono del cliente");
                alert(`Cliente sin teléfono: ${lote.cliente}`);
                return false;
            }

            console.log('Teléfono encontrado:', clientPhone);

            console.log('Intentando con plantilla lote_completado...');
            const success = await this.sendMessage(clientPhone, lote);
            
            if (success) {
                alert('¡Notificación de WhatsApp enviada correctamente!');
            }

            return success;
        } catch (error) {
            console.error("Error en notifyLoteCompletado:", error);
            alert("Error al enviar notificación");
            return false;
        }
    }
}