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
    const [idtemp, setIdtemp] = useState("");
    const [aberto, setAberto] = useState("");
    const [venda, setVenda] = useState(0)
    const [despesa, setDespesa] = useState(0)


    useEffect(() => {
        app.firestore().collection('pedidos').where('postedBy', '==', dtafim)//.orderBy('created', 'desc')
            .onSnapshot((snap) => {
                const docs = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setEntregas(docs);
                if (docs.length) {
                    sound();
                }
            })
    }, []);

    useEffect(() => {
        app.firestore().collection('pedidos')
            .onSnapshot((snap) => {
                const docs = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setVenda(docs.reduce((a, b) => a + b.priceTotal, 0))
            })
    }, []);


    useEffect(() => {
        app.firestore().collection('loja')
            .onSnapshot((snap) => {
                const docs = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAberto(docs[0].status);
            })
    }, []);

    useEffect(() => {
        app.firestore().collection('loja')
            .onSnapshot((snap) => {
                const docs = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDespesa(docs[1].despesa);
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
            setIdtemp(Id)
        } else {
            console.log("No such document!");
        }
    }

    const trocarStatus = async (param) => {
        app.firestore().collection('pedidos').doc(idtemp).set({
            status: param
        }, { merge: true });
    }

    const addDespesa = async (param) => {
        app.firestore().collection('loja').doc("02").set({
            despesa: despesa + param
        }, { merge: true });
    }

    const statusLoja = async (param) => {
        if (param == true) {
            app.firestore().collection('loja').doc("01").set({
                status: false
            }, { merge: true });

        } else {
            app.firestore().collection('loja').doc("01").set({
                status: true
            }, { merge: true });
        }
    }

    return (
        <AppContext.Provider value={{
            aberto, setAberto,
            user,
            entregas,
            getEntrega,
            entrega,
            sound,
            trocarStatus,
            statusLoja,
            venda,despesa,addDespesa
        }}>
            {children}
        </AppContext.Provider>
    )
}
