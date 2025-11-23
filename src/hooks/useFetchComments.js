import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

export const useFetchComments = (postId) => {
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;

        setLoading(true);

        const collectionRef = collection(db, "comments");

        try {
            const q = query(
                collectionRef,
                where("postId", "==", postId),
                orderBy("createdAt", "desc")
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                setComments(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    }, [postId]);

    return { comments, loading, error };
};
