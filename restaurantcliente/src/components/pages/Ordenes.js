import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../ui/Orden';

const Ordenes = () => {

    // Context con las operariones de firebase
    const { firebase } = useContext(FirebaseContext);

    // state con las ordenes
    const [ordenes, guardarOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = () => {
            firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot(manejarSnapshot);
        };
        obtenerOrdenes();
    }, [firebase.db]);

    function manejarSnapshot(snapshot) {
        const ordenes = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guardarOrdenes(ordenes);
    };

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Ordenes</h1>
            <div className="sm:flex sm:flex-wrap -mx-3">
                {ordenes.map(orden => (
                    <Orden
                        key={orden.id}
                        orden={orden}
                    />
                ))}
            </div>
        </>
    )
}

export default Ordenes;