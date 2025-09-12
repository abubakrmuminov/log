import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, _query, _where) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const queryData = useRef(_query);
  const whereData = useRef(_where);

  useEffect(() => {
    let q = collection(db, collectionName);

    if (queryData.current) {
      q = query(q, orderBy("timestamp", queryData.current));
    }
    if (whereData.current) {
      q = query(q, where(...whereData.current));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ uid: doc.id, ...doc.data() });
        });
        setData(docs);
        setIsPending(false);
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { data, isPending, error };
};

//     setIsPending(true);
//     const ref = collection(db, collectionName)

//     const unsubscribe = onSnapshot(
//       ref,
//       (snapshot) => {
//         let results = [];
//         snapshot.docs.forEach((doc) => {
//           results.push({ ...doc.data(), uid: doc.id });
//         });
//         setData(results);
//         setIsPending(false);
//       },
//       (err) => {
//         setError(err.message);
//         setIsPending(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [collectionName]);

//   return { data, isPending, error };
// };