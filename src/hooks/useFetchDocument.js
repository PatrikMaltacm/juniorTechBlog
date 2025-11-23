import { useState, useEffect } from "react";

import { db } from "../firebase/config";

import { doc, getDoc, onSnapshot } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument() {
            if (cancelled) return

            setLoading(true)

            try {
                const docRef = doc(db, docCollection, id);
                const unsubscribe = onSnapshot(docRef, (docSnap) => {
                    setDocument({
                        id: docSnap.id,
                        ...docSnap.data(),
                    });
                    setLoading(false);
                });

                return () => unsubscribe(); // Cleanup listener on unmount or id change
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }

        loadDocument();

    }, [docCollection, id, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { document, loading, error };
}