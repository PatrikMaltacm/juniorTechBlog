import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollection,
  search = null,
  uid = null,
  pageLimit = null
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);

    const collectionRef = collection(db, docCollection);

    try {
      let q;

      if (search) {
        q = query(collectionRef, orderBy("createdAt", "desc"));
      } else if (uid) {
        q = query(
          collectionRef,
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(collectionRef, orderBy("createdAt", "desc"));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (search) {
          docs = docs.filter((doc) =>
            doc.title.toLowerCase().includes(search.toLowerCase()) ||
            doc.tagsArray.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
          );
        }

        setDocuments(docs);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  }, [docCollection, search, uid, pageLimit]);

  return { documents, loading, error };
};