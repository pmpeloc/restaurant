import React, { useReducer } from 'react';
import _ from 'lodash';
import firebase from '../../firebase';
import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';
import { OBTENER_PRODUCTOS_EXITO } from '../../types';

const FirebaseState = props => {

    // Crear state inicial
    const initialState = {
        menu: []
    };

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    // Función que se ejecuta para traer los productos
    const obtenerProductos = () => {        
        // consultar firebase  
        firebase.db.settings({ experimentalForceLongPolling: true });      
        firebase.db            
            .collection('productos')
            .where('existencia', '==', true) // trae solo con existencia en true
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            // Ordenar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria');            
            // Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos
            });
        }
    };

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )

};

export default FirebaseState;