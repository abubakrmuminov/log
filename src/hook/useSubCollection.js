// hook/useSubCollection.js
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export function useSubCollection(path) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!path) return;

    const ref = collection(db, path);
    const q = query(ref, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [path]);

  return { documents };
}
