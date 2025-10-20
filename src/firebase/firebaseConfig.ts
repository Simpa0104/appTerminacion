import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAblWAPG0LtMrb6YozsMdoTcRVlfow6rDQ",
  authDomain: "appterminacion-9d761.firebaseapp.com",
  projectId: "appterminacion-9d761",
  storageBucket: "appterminacion-9d761.firebasestorage.app",
  messagingSenderId: "789351915597",
  appId: "1:789351915597:web:b068f43f89f3f09b39bc04"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la base de datos
export const db = getFirestore(app);
