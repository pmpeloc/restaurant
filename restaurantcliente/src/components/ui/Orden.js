import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Orden = ({orden}) => {

    const [tiempoEntrega, guardarTiempoEntrega] = useState(0);

    // Context de Firebase
    const { firebase } = useContext(FirebaseContext);

    // Define el tiempo de entrega en tiempo real
    const definirTiempo = (id) => {
        try {
            firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    tiempoEntrega
                });
        } catch (error) {
            console.log(error);
        }
    };

    // Completa el estado de una orden
    const completarOrden = id => {
        try {
            firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    completado: true
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold">{orden.id}</h1>
                {orden.orden.map(platillos => (
                    <p key={platillos.id} className="text-gray-600">{platillos.cantidad} {platillos.nombre}</p>
                ))}
                <p className="text-gray-700 font-bold">Total a Pagar: $ {orden.total}</p>
                {orden.tiempoEntrega === 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo de Entrega
                        </label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                            max="20"
                            value={tiempoEntrega}
                            onChange={e => guardarTiempoEntrega(parseInt(e.target.value))}
                            placeholder="Ingrese el tiempo de espera (min: 8, max: 20)"
                        />
                        <button
                            onClick={() => definirTiempo(orden.id)}
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        >
                            Definir Tiempo
                        </button>
                    </div>
                )}
                {orden.tiempoEntrega > 0 && (
                    <p className="text-gray-700">Tiempo de Entrega:
                        <span className="font-bold"> {orden.tiempoEntrega} minutos</span>
                    </p>
                )}
                {!orden.completado && orden.tiempoEntrega > 0 && (
                    <button
                        type="button"
                        className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
                        onClick={() => completarOrden(orden.id)}
                    >
                        Marcar como lista
                    </button>
                )}
            </div>
        </div>
    );
};
 
export default Orden;