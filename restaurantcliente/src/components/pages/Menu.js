import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';

const Menu = () => {

    // Definir el state para los platillos
    const [platillos, setPlatillos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // Consultar la bd al cargar
    useEffect(() => {
        const obtenerPlatillos = () => {
            // onSnapshot realiza consultas en tiempo real
            firebase.db.collection('productos').onSnapshot(handleSnapshot);        
        }
        obtenerPlatillos();
    }, [firebase.db]);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function handleSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        // Almacenar los resultados en el state
        setPlatillos(platillos);
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menú</h1>
            <Link to="/nuevo-platillo" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Platillo
            </Link>
            {platillos.map(platillo => (
                <Platillo
                    key={platillo.id}
                    platillo={platillo}
                />
            ))}
        </>
    )
}

export default Menu;