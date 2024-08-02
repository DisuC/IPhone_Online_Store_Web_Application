import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as needed

export const useFirestore = (collectionName) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, collectionName));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setDocuments(docs);
            setLoading(false);
        }, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName]);

    return { documents, loading, error };
};