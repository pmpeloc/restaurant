import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';

const Menu = () => {

    // Context de Firebase
    const { obtenerProductos } = useContext(FirebaseContext);

    useEffect(() => {
        obtenerProductos()
    }, []);

    return (
        <Text>Menu</Text>
    );
};
 
export default Menu;