// hook/useDocument.js
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function useDocument(coll, uid) {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const ref = collection(db, coll);
    const q = query(ref, where("uid", "==", uid));

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Берём первый документ (uid уникальный)
        setDocument({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      } else {
        setDocument(null);
      }
    });

    return () => unsub();
  }, [coll, uid]);

  return { document };
}
