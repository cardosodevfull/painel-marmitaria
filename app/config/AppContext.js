"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { app } from "../config/firebase";
import firebase from 'firebase/compat/app';
import { getFirestore, getDocs, getDoc, query, collection, onSnapshot, where, doc } from "firebase/firestore";

const audioUrl = '../mp3/notification-6175.mp3'

const db = getFirestore(app);

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const dtafim = today.toLocaleDateString()

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState('Francisco');
    const [entregas, setEntregas] = useState([]);
    const [entrega, setEntrega] = useState({});


    useEffect(() => {
        app.firestore().collection('pedidos').where('postedBy', '==', dtafim)//.orderBy('created', 'desc')
            .onSnapshot((snap) => {
                const docs = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()

                }));
                setEntregas(docs);
                if(docs.length){
                    sound();
                }
            })
    }, []);

    const sound = () => {
        var audio = new Audio('./d2.mp3');
        audio.play();
    }

    const getEntrega = async (Id) => {       
        const docRef = doc(db, "pedidos", Id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setEntrega(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    return (
        <AppContext.Provider value={{
            user,
            entregas,
            getEntrega,
            entrega,
            sound
        }}>
            {children}
        </AppContext.Provider>
    )
}