// src/hooks/useFetchCollection.ts
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface FirebaseDoc {
  id: string;
  [key: string]: any;
}

export default function useFetchCollection(collectionName: string) {
  const [data, setData] = useState<FirebaseDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    const q = query(collection(db, collectionName));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Error cargando colección:", err);
        setError("Error al cargar los datos");
        setLoading(false);
      }
    );

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error };
}
